# SimpleMem Demo Application

A standalone web demo showcasing **SimpleMem** - Efficient Lifelong Memory for LLM Agents.

This demo allows users to experience SimpleMem's three-stage memory pipeline through an interactive web interface with resource-constrained deployment suitable for public demonstration.

---

## Table of Contents

- [Overview](#overview)
- [Quick Start](#quick-start)
- [Architecture](#architecture)
- [Instance Isolation](#instance-isolation)
- [Configuration](#configuration)
- [API Endpoints](#api-endpoints)
- [Troubleshooting](#troubleshooting)
- [Security Notes](#security-notes)

---

## Overview

### What is SimpleMem?

SimpleMem implements a three-stage pipeline for efficient lifelong memory:

1. **Semantic Layered Atomization** - Entropy-based filtering and atomic memory encoding
2. **Recursive Memory Consolidation** - Self-evolving memory topology
3. **Adaptive Orthogonal Retrieval** - Tri-layer context synthesis (semantic, lexical, symbolic)

### Demo Application Features

✅ **Resource Management**: Limited to 8 concurrent sessions globally
✅ **Session Timeout**: Automatic cleanup after 5 minutes
✅ **Dual API Mode**:
- Server Key: 2 conversation turns (uses demo server's API key)
- BYOK (Bring Your Own Key): 8 conversation turns (uses user's API key)

✅ **Three-Step UI Flow**:
- Step 1: Configuration (email, context, API key selection)
- Step 2: Building Memory (visual progress)
- Step 3: Interactive Chat Interface

✅ **Instance Isolation**: Each session completely isolated (storage, memory, API credentials)

---

## Quick Start

### Prerequisites

- Python 3.8+
- Node.js 18+ (20+ recommended)
- OpenAI API Key

### Installation

1. **Install Python dependencies**:
```bash
cd /path/to/simplemem-demo
pip install -r requirements.txt
```

2. **Install frontend dependencies**:
```bash
cd demo_frontend
npm install
cd ..
```

3. **Configure API key**:

Edit `config.py`:
```python
OPENAI_API_KEY = "your-openai-api-key-here"
```

Or use environment variable:
```bash
export OPENAI_API_KEY="your-key-here"
```

### Running the Demo

**Development Mode** (recommended for testing):

Terminal 1 - Backend:
```bash
python demo_backend.py
# Runs on http://localhost:8000
```

Terminal 2 - Frontend:
```bash
cd demo_frontend
npm run dev
# Runs on http://localhost:5173
```

Open browser to `http://localhost:5173`

**Production Mode**:

Build frontend:
```bash
cd demo_frontend
npm run build
cd ..
```

Then configure demo_backend.py to serve static files and run:
```bash
python demo_backend.py
# Access at http://localhost:8000
```

---

## Architecture

### System Overview

```
┌─────────────────────────────────────────────────────────┐
│                  SimpleMem Demo Server                   │
├─────────────────────────────────────────────────────────┤
│                                                           │
│  Frontend (React)                Backend (FastAPI)       │
│  ┌──────────────────┐            ┌──────────────────┐   │
│  │ Step 1: Config   │ ────────▶  │ Resource Manager │   │
│  │ Step 2: Building │            │ - Max 8 sessions │   │
│  │ Step 3: Chat     │ ◀────────  │ - 5 min timeout  │   │
│  └──────────────────┘            └──────────────────┘   │
│                                            │              │
│                                            ▼              │
│                                   ┌──────────────────┐   │
│                                   │ SimpleMem System │   │
│                                   │ - Atomization    │   │
│                                   │ - Consolidation  │   │
│                                   │ - Retrieval      │   │
│                                   └──────────────────┘   │
│                                            │              │
│                                            ▼              │
│                                   ┌──────────────────┐   │
│                                   │   OpenAI API     │   │
│                                   │ - Embeddings     │   │
│                                   │ - LLM            │   │
│                                   └──────────────────┘   │
└─────────────────────────────────────────────────────────┘
```

### Technology Stack

**Backend**:
- FastAPI (web server)
- Pydantic (data validation)
- OpenAI API (embeddings + LLM)
- LanceDB + PyArrow (vector storage)

**Frontend**:
- React 19 + Vite
- axios (API calls)
- lucide-react (icons)

**SimpleMem Core**:
- Semantic indexing (dense vectors)
- Lexical indexing (BM25/sparse)
- Symbolic indexing (metadata)

### Key Design Decisions

**OpenAI API Integration**: Replaced local Qwen embedding model (600MB-8GB) with OpenAI's `text-embedding-3-small` for lightweight deployment.

**Resource Management**:
- Global limit: 8 concurrent sessions
- Per-session timeout: 5 minutes
- Automatic cleanup: Background task runs every 60 seconds

**Turn Limits**:
- Server Key mode: 2 turns (prevents API cost abuse)
- BYOK mode: 8 turns (reasonable for demo evaluation)

---

## Instance Isolation

### How It Works

Each session is **completely isolated** to prevent data leakage and ensure proper billing separation:

**1. Unique Session ID**:
```python
session_id = str(uuid.uuid4())  # e.g., "7a3c4f21-b2d8-4e9f-a1c3-9d7e6f8a2b1c"
```

**2. Isolated Storage**:
```python
db_path = f"./demo_data/session_{session_id}"      # Unique directory
table_name = f"memory_{session_id}"                 # Unique table
```

**3. Session-Specific API Keys**:
```python
system = SimpleMemSystem(
    api_key=api_key,        # User's key (BYOK) or server key
    base_url=base_url,      # User's endpoint or None
    db_path=db_path,        # Session-isolated path
    table_name=table_name,  # Session-isolated table
    ...
)
```

**4. Complete Component Isolation**:
```python
# Each session has its own:
- LLMClient(api_key=user_or_server_key)
- EmbeddingModel(api_key=user_or_server_key)  # Uses session API key!
- VectorStore(db_path=session_path, table_name=session_table)
```

### Verification

**Storage Isolation**:
```
demo_data/
├── session_7a3c4f21-...          # User 1 (BYOK)
│   └── memory_7a3c4f21...lancedb/
├── session_9b5e8d32-...          # User 2 (Server Key)
│   └── memory_9b5e8d32...lancedb/
└── session_2c1f7a44-...          # User 3 (BYOK)
    └── memory_2c1f7a44...lancedb/
```

**API Key Isolation** (BYOK mode):
- User 1's embeddings → billed to User 1's API key
- User 2's embeddings → billed to server API key
- User 3's embeddings → billed to User 3's API key

**No shared state** - Each SimpleMemSystem instance is completely independent.

### Critical Fix Applied

**Issue**: Originally, `EmbeddingModel()` in `main.py` was instantiated without receiving the `api_key` parameter, causing all sessions to share the same embedding API key from `config.py`.

**Fix** (main.py line 75-79):
```python
# CORRECT - passes session-specific API key
self.embedding_model = EmbeddingModel(
    api_key=api_key,      # Session-specific key
    base_url=base_url     # Session-specific endpoint
)
```

This ensures complete billing separation and proper instance isolation.

---

## Configuration

### config.py

The configuration file has been simplified for the demo. Key settings:

**Required**:
```python
OPENAI_API_KEY = "your-key-here"  # Or use environment variable
LLM_MODEL = "gpt-4o-mini"         # Language model
```

**Embedding** (OpenAI API):
```python
EMBEDDING_MODEL = "text-embedding-3-small"
EMBEDDING_DIMENSION = 1536
```

**Instance Isolation Note**:
```python
# These are overridden by demo_backend.py for each session:
LANCEDB_PATH = "./lancedb_data"        # Demo uses: ./demo_data/session_{uuid}/
MEMORY_TABLE_NAME = "memory_entries"   # Demo uses: memory_{uuid}
```

### Environment Variables (Production)

Recommended for production deployment:

```bash
export OPENAI_API_KEY="sk-your-actual-key"
export OPENAI_BASE_URL=""  # Optional: custom endpoint
export SIMPLEMEM_MAX_SESSIONS=8
export SIMPLEMEM_TIMEOUT_MINUTES=5
```

---

## API Endpoints

### Server Status

**GET** `/api/status`

Returns current server status:
```json
{
  "active_sessions": 3,
  "max_sessions": 8,
  "available_slots": 5,
  "queue_length": 0
}
```

### Session Management

**POST** `/api/session/create`

Create new session:
```json
{
  "email": "user@example.com",
  "context_text": "Alice: Let's meet tomorrow\nBob: Sure, at 3pm",
  "use_own_key": true,
  "api_key": "sk-user-key",
  "base_url": null
}
```

Response:
```json
{
  "session_id": "7a3c4f21-...",
  "email": "user@example.com",
  "max_turns": 8,
  "created_at": "2025-12-28T12:00:00"
}
```

**POST** `/api/session/{session_id}/chat`

Send chat message:
```json
{
  "message": "When are they meeting?"
}
```

Response:
```json
{
  "response": "Alice and Bob are meeting tomorrow at 3pm.",
  "turn_count": 1,
  "session_remaining_time": "4m 30s"
}
```

**GET** `/api/session/{session_id}/status`

Get session status:
```json
{
  "session_id": "7a3c4f21-...",
  "email": "user@example.com",
  "turn_count": 1,
  "max_turns": 8,
  "can_chat": true,
  "remaining_time": "4m 30s",
  "is_expired": false
}
```

**DELETE** `/api/session/{session_id}`

Delete session (immediate cleanup).

---

## Troubleshooting

### Backend won't start

**Missing dependencies**:
```bash
pip install -r requirements.txt
```

**API key not configured**:
- Check `config.py` has valid `OPENAI_API_KEY`
- Or set environment variable: `export OPENAI_API_KEY="sk-..."`

### Frontend won't build

**Dependencies not installed**:
```bash
cd demo_frontend
npm install
```

**Node version too old**:
- Requires Node.js 18+ (20+ recommended)
- Check: `node --version`

### Session creation fails

**Server at capacity**:
- Wait for available slots
- Check: `curl http://localhost:8000/api/status`

**Invalid API key (BYOK mode)**:
- Verify OpenAI API key is correct
- Test: `curl https://api.openai.com/v1/models -H "Authorization: Bearer sk-..."`

### Chat not working

**Session expired**:
- Check remaining time in session status
- Create new session if expired

**Max turns reached**:
- Server Key: Limited to 2 turns
- BYOK: Limited to 8 turns
- Create new session to continue

---

## Security Notes

### Critical Security Requirements

🔴 **NEVER commit real API keys to version control**

✅ **Best Practices**:
1. Use environment variables for API keys
2. Add `config.py` to `.gitignore` if it contains secrets
3. Revoke and regenerate any exposed API keys immediately
4. Use HTTPS/TLS for production deployment
5. Implement rate limiting to prevent abuse

### Production Deployment Checklist

- [ ] API keys stored in environment variables
- [ ] HTTPS/TLS certificate configured
- [ ] Reverse proxy (nginx/Apache) set up
- [ ] Process manager (systemd/supervisor) configured
- [ ] Rate limiting enabled
- [ ] Monitoring and logging configured
- [ ] Firewall rules applied
- [ ] Session storage cleanup automated

### Demo Server Limitations

⚠️ This is a **demonstration server** with intentional limitations:
- Max 8 concurrent sessions
- 5-minute timeout per session
- No persistent user accounts
- No authentication required
- Limited conversation turns

**For production use**: Deploy your own instance with appropriate security measures and resource allocation.

---

## Resource Requirements

### Server Requirements

- **CPU**: 2-4 cores minimum
- **RAM**: 2-4 GB (8 sessions × ~200-500MB each)
- **Storage**: 1-2 GB (session data)
- **Bandwidth**: Moderate (API calls to OpenAI)

### Estimated API Costs (Server Key Mode)

Per session (assuming moderate context):
- Embeddings: ~$0.0001 (context encoding)
- LLM calls: ~$0.002 per turn × 2 turns = ~$0.004
- **Total**: ~$0.005 per session

Monthly estimates:
- 100 sessions/day: ~$15/month
- 500 sessions/day: ~$75/month
- 1000 sessions/day: ~$150/month

---

## Usage Example

### Step 1: Configure Session

1. Enter email: `demo@example.com`
2. Paste context:
```
Alice: Let's meet at the coffee shop tomorrow at 3pm
Bob: Sure, I'll bring the marketing materials
Alice: Great! Don't forget the Q4 projections
Bob: Got it, see you then
```
3. Select API mode:
   - **Server Key**: Quick test (2 turns)
   - **BYOK**: Extended evaluation (8 turns, requires your API key)
4. Click "Create Session & Build Memory"

### Step 2: Building Memory

Watch as SimpleMem processes your context:
- ✅ Entropic Atomization: Filtering and decomposing dialogue
- ✅ Orthogonal Indexing: Creating tri-layer index
- ✅ Memory Ready: Prepared for retrieval

### Step 3: Chat with Memory Agent

Ask questions:
- "When are Alice and Bob meeting?" → "Tomorrow at 3pm"
- "Where are they meeting?" → "At the coffee shop"
- "What is Bob bringing?" → "Marketing materials"
- "What did Alice ask Bob not to forget?" → "Q4 projections"

Session status shows:
- Time remaining: 4m 30s
- Turns used: 1/2 (or 1/8 for BYOK)

---

## Project Structure

```
simplemem-demo/
├── demo_backend.py              # FastAPI server (750 lines)
├── demo_frontend/               # React frontend
│   ├── src/
│   │   ├── App.jsx             # Main UI component (494 lines)
│   │   └── App.css             # Styling (520 lines)
│   ├── package.json
│   └── vite.config.js
├── utils/
│   └── embedding.py            # OpenAI embeddings (78 lines)
├── main.py                      # SimpleMem system (267 lines)
├── database/
│   └── vector_store.py         # Tri-layer indexing (328 lines)
├── core/                        # SimpleMem core modules
├── models/                      # Data models
├── config.py                    # Configuration
├── requirements.txt             # Python dependencies
└── README.md                    # This file
```

---

## Original Codebase

The original SimpleMem codebase is preserved at:
```
/home/core/unc/simplemem/
```

This demo is a modified version specifically designed for public demonstration with:
- Refactored embeddings (OpenAI API instead of local Qwen models)
- Resource management for multi-user deployment
- Instance isolation for concurrent sessions
- Web-based UI for easy access

---

## Related Links

- [SimpleMem Paper](https://github.com/aiming-lab/SimpleMem)
- [SimpleMem Repository](https://github.com/aiming-lab/SimpleMem)

---

## Support

For issues or questions:
1. Check this README's troubleshooting section
2. Review backend logs for error messages
3. Open an issue on the SimpleMem repository

---

**Demo Server Notice**: This is a limited-resource demonstration server intended for evaluation purposes only. Maximum 8 concurrent sessions with 5-minute timeout. For production deployments, please set up your own instance with appropriate resource allocation and security measures.
