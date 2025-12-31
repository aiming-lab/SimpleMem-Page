"""
SimpleMem Demo Backend - FastAPI Server
Handles resource management, session management, and SimpleMem integration
"""
from fastapi import FastAPI, HTTPException, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from pydantic import BaseModel, EmailStr
from typing import Optional, List, Dict
import asyncio
import uuid
from datetime import datetime, timedelta
from collections import deque
import os
import sys

# Add parent directory to path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from main import SimpleMemSystem
from models.memory_entry import Dialogue

# Constants
MAX_CONCURRENT_SESSIONS = 8
SESSION_TIMEOUT_MINUTES = 5
MAX_TURNS_SERVER_KEY = 2
MAX_TURNS_BYOK = 8

app = FastAPI(title="SimpleMem Demo API", version="1.0.0")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ============================================================================
# Data Models
# ============================================================================

class SessionConfig(BaseModel):
    email: EmailStr
    context_text: str
    use_own_key: bool
    api_key: Optional[str] = None
    base_url: Optional[str] = None

class ChatMessage(BaseModel):
    message: str

class ChatResponse(BaseModel):
    response: str
    turn_count: int
    max_turns: int
    session_remaining_time: str

# ============================================================================
# Session Management
# ============================================================================

class SessionData:
    def __init__(
        self,
        session_id: str,
        email: str,
        use_own_key: bool,
        max_turns: int,
        system: SimpleMemSystem
    ):
        self.session_id = session_id
        self.email = email
        self.use_own_key = use_own_key
        self.max_turns = max_turns
        self.system = system
        self.turn_count = 0
        self.created_at = datetime.now()
        self.last_activity = datetime.now()
        self.expires_at = self.created_at + timedelta(minutes=SESSION_TIMEOUT_MINUTES)

    def is_expired(self) -> bool:
        return datetime.now() >= self.expires_at

    def update_activity(self):
        self.last_activity = datetime.now()

    def increment_turn(self):
        self.turn_count += 1
        self.update_activity()

    def can_chat(self) -> bool:
        return self.turn_count < self.max_turns and not self.is_expired()

    def remaining_time(self) -> str:
        remaining = self.expires_at - datetime.now()
        minutes = int(remaining.total_seconds() // 60)
        seconds = int(remaining.total_seconds() % 60)
        return f"{minutes}m {seconds}s"

class ResourceManager:
    def __init__(self):
        self.active_sessions: Dict[str, SessionData] = {}
        self.waiting_queue: deque = deque()
        self.server_api_key: Optional[str] = None

        # Load server API key from environment or config
        try:
            import config
            self.server_api_key = getattr(config, 'OPENAI_API_KEY', None)
        except:
            self.server_api_key = os.getenv('OPENAI_API_KEY')

    def can_create_session(self) -> bool:
        """Check if a new session can be created"""
        self.cleanup_expired_sessions()
        return len(self.active_sessions) < MAX_CONCURRENT_SESSIONS

    def cleanup_expired_sessions(self):
        """Remove expired sessions"""
        expired = [sid for sid, session in self.active_sessions.items() if session.is_expired()]
        for sid in expired:
            print(f"[ResourceManager] Removing expired session: {sid} ({self.active_sessions[sid].email})")
            del self.active_sessions[sid]

    def create_session(self, config: SessionConfig) -> tuple[str, SessionData]:
        """Create a new session if resources are available"""
        self.cleanup_expired_sessions()

        if not self.can_create_session():
            raise HTTPException(
                status_code=503,
                detail=f"Server is at maximum capacity ({MAX_CONCURRENT_SESSIONS} active sessions). Please wait."
            )

        # Determine API key and max turns
        if config.use_own_key:
            if not config.api_key:
                raise HTTPException(status_code=400, detail="API key required for BYOK mode")
            api_key = config.api_key
            base_url = config.base_url
            max_turns = MAX_TURNS_BYOK
        else:
            if not self.server_api_key:
                raise HTTPException(status_code=500, detail="Server API key not configured")
            api_key = self.server_api_key
            base_url = None
            max_turns = MAX_TURNS_SERVER_KEY

        # Create SimpleMem system
        try:
            session_id = str(uuid.uuid4())
            db_path = f"./demo_data/session_{session_id}"

            system = SimpleMemSystem(
                api_key=api_key,
                base_url=base_url,
                db_path=db_path,
                table_name=f"memory_{session_id}",
                clear_db=True,
                enable_planning=True,
                enable_reflection=True,
                enable_parallel_processing=False  # Disable for demo to reduce load
            )

            # Build memory from context
            self._build_memory_from_context(system, config.context_text)

            # Create session data
            session_data = SessionData(
                session_id=session_id,
                email=config.email,
                use_own_key=config.use_own_key,
                max_turns=max_turns,
                system=system
            )

            self.active_sessions[session_id] = session_data
            print(f"[ResourceManager] Created session {session_id} for {config.email} (active: {len(self.active_sessions)}/{MAX_CONCURRENT_SESSIONS})")

            return session_id, session_data

        except Exception as e:
            raise HTTPException(status_code=500, detail=f"Failed to create session: {str(e)}")

    def _build_memory_from_context(self, system: SimpleMemSystem, context_text: str):
        """Build memory from context text"""
        # Parse context text into dialogues
        lines = context_text.strip().split('\n')
        dialogues = []

        for i, line in enumerate(lines, 1):
            line = line.strip()
            if not line:
                continue

            # Try to parse format: "Speaker: Content" or just treat as "User: Content"
            if ':' in line:
                parts = line.split(':', 1)
                speaker = parts[0].strip()
                content = parts[1].strip()
            else:
                speaker = "Context"
                content = line

            dialogue = Dialogue(
                dialogue_id=i,
                speaker=speaker,
                content=content,
                timestamp=None
            )
            dialogues.append(dialogue)

        # Add dialogues to system
        system.add_dialogues(dialogues)
        system.finalize()

    def get_session(self, session_id: str) -> SessionData:
        """Get session by ID"""
        if session_id not in self.active_sessions:
            raise HTTPException(status_code=404, detail="Session not found")

        session = self.active_sessions[session_id]
        if session.is_expired():
            del self.active_sessions[session_id]
            raise HTTPException(status_code=410, detail="Session expired")

        return session

    def delete_session(self, session_id: str):
        """Delete a session"""
        if session_id in self.active_sessions:
            session = self.active_sessions[session_id]
            print(f"[ResourceManager] Deleting session {session_id} ({session.email})")
            del self.active_sessions[session_id]

    def get_status(self) -> Dict:
        """Get resource status"""
        self.cleanup_expired_sessions()
        return {
            "active_sessions": len(self.active_sessions),
            "max_sessions": MAX_CONCURRENT_SESSIONS,
            "available_slots": MAX_CONCURRENT_SESSIONS - len(self.active_sessions),
            "queue_length": len(self.waiting_queue)
        }

# Initialize resource manager
resource_manager = ResourceManager()

# ============================================================================
# Background Tasks
# ============================================================================

async def cleanup_expired_sessions_task():
    """Background task to cleanup expired sessions"""
    while True:
        await asyncio.sleep(60)  # Run every minute
        resource_manager.cleanup_expired_sessions()

# ============================================================================
# API Endpoints
# ============================================================================

@app.on_event("startup")
async def startup_event():
    """Start background tasks"""
    asyncio.create_task(cleanup_expired_sessions_task())
    print("[Demo Backend] Started - Listening for requests...")
    print(f"[Demo Backend] Max concurrent sessions: {MAX_CONCURRENT_SESSIONS}")
    print(f"[Demo Backend] Session timeout: {SESSION_TIMEOUT_MINUTES} minutes")

@app.get("/api/status")
async def get_status():
    """Get server status"""
    return resource_manager.get_status()

@app.post("/api/session/create")
async def create_session(config: SessionConfig):
    """Create a new session"""
    try:
        session_id, session_data = resource_manager.create_session(config)
        return {
            "session_id": session_id,
            "max_turns": session_data.max_turns,
            "expires_at": session_data.expires_at.isoformat(),
            "remaining_time": session_data.remaining_time()
        }
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/session/{session_id}/chat")
async def chat(session_id: str, message: ChatMessage):
    """Send a chat message"""
    session = resource_manager.get_session(session_id)

    if not session.can_chat():
        if session.is_expired():
            raise HTTPException(status_code=410, detail="Session expired")
        else:
            raise HTTPException(status_code=403, detail="Maximum turns reached")

    try:
        # Get response from SimpleMem
        response = session.system.ask(message.message)

        # Increment turn count
        session.increment_turn()

        return ChatResponse(
            response=response,
            turn_count=session.turn_count,
            max_turns=session.max_turns,
            session_remaining_time=session.remaining_time()
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Chat error: {str(e)}")

@app.delete("/api/session/{session_id}")
async def delete_session(session_id: str):
    """Delete a session"""
    resource_manager.delete_session(session_id)
    return {"message": "Session deleted successfully"}

@app.get("/api/session/{session_id}/status")
async def get_session_status(session_id: str):
    """Get session status"""
    session = resource_manager.get_session(session_id)
    return {
        "session_id": session_id,
        "turn_count": session.turn_count,
        "max_turns": session.max_turns,
        "expires_at": session.expires_at.isoformat(),
        "remaining_time": session.remaining_time(),
        "can_chat": session.can_chat()
    }

# Serve static files for frontend (when integrated)
# @app.get("/{full_path:path}")
# async def serve_frontend(full_path: str):
#     """Serve frontend files"""
#     static_dir = "./frontend/dist"
#     file_path = os.path.join(static_dir, full_path)
#
#     if os.path.exists(file_path) and os.path.isfile(file_path):
#         return FileResponse(file_path)
#     else:
#         return FileResponse(os.path.join(static_dir, "index.html"))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
