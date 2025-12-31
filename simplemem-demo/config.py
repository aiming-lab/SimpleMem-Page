"""
SimpleMem Demo Server Configuration

IMPORTANT SECURITY NOTES:
1. This file contains API key placeholders - replace with your actual keys
2. NEVER commit real API keys to version control
3. For production, use environment variables instead

NOTE ON INSTANCE ISOLATION:
The demo server overrides db_path and table_name for each session.
Default values below are only used if you run SimpleMem directly (not through demo server).
"""

import os

# ============================================================================
# OpenAI API Configuration (REQUIRED)
# ============================================================================

# OpenAI API Key - Get from: https://platform.openai.com/api-keys
# REPLACE THIS with your actual key, or use environment variable
OPENAI_API_KEY = os.getenv('OPENAI_API_KEY', 'your-openai-api-key-here')

# Custom OpenAI Base URL (optional)
# Set to None for default OpenAI endpoint
# Examples:
#   - Qwen/Alibaba: "https://dashscope.aliyuncs.com/compatible-mode/v1"
#   - Azure OpenAI: "https://YOUR-RESOURCE.openai.azure.com/openai/deployments/YOUR-DEPLOYMENT"
#   - Local server: "http://localhost:8000/v1"
OPENAI_BASE_URL = os.getenv('OPENAI_BASE_URL', None)

# ============================================================================
# LLM Model Configuration
# ============================================================================

# Language Model
# Examples: "gpt-4o-mini" (recommended for demo), "gpt-4o", "gpt-4-turbo"
LLM_MODEL = "gpt-4o-mini"

# Embedding Model (OpenAI API)
# Note: The demo uses OpenAI embeddings exclusively
EMBEDDING_MODEL = "text-embedding-3-small"
EMBEDDING_DIMENSION = 1536

# ============================================================================
# LLM Features
# ============================================================================

# Enable streaming responses (outputs content as it's generated)
USE_STREAMING = True

# Deep thinking mode (for Qwen models only - set False for OpenAI)
ENABLE_THINKING = False

# ============================================================================
# Memory Building Parameters
# ============================================================================

# Number of dialogues per processing window
WINDOW_SIZE = 40

# Window overlap size (for context continuity)
OVERLAP_SIZE = 2

# ============================================================================
# Retrieval Parameters
# ============================================================================

# Max entries returned by each search layer
SEMANTIC_TOP_K = 25    # Vector similarity search
KEYWORD_TOP_K = 5      # BM25/keyword matching
STRUCTURED_TOP_K = 5   # Metadata filtering

# Advanced retrieval features
ENABLE_PLANNING = True       # Multi-query planning
ENABLE_REFLECTION = True     # Reflection-based retrieval
MAX_REFLECTION_ROUNDS = 2    # Maximum reflection iterations

# ============================================================================
# Database Configuration (Default - Overridden in Demo)
# ============================================================================

# NOTE: The demo server creates unique paths per session:
#   - Session path: ./demo_data/session_{uuid}/
#   - Table name: memory_{uuid}
# These defaults are only used when running SimpleMem directly (not via demo server)

LANCEDB_PATH = "./lancedb_data"
MEMORY_TABLE_NAME = "memory_entries"

# ============================================================================
# Parallel Processing (Demo Uses Explicit Settings)
# ============================================================================

# Note: demo_backend.py disables parallel processing for lighter server load
# These are defaults for direct SimpleMem usage
ENABLE_PARALLEL_PROCESSING = False
MAX_PARALLEL_WORKERS = 4
ENABLE_PARALLEL_RETRIEVAL = False
MAX_RETRIEVAL_WORKERS = 2
