"""
Embedding utilities - Generate vector embeddings using OpenAI API
Simplified for demo deployment - uses OpenAI's text-embedding-3-small model
"""
from typing import List, Optional
import numpy as np
from openai import OpenAI
import config


class EmbeddingModel:
    """
    Embedding model using OpenAI API
    Uses text-embedding-3-small for efficient and reliable embeddings
    """
    def __init__(self, api_key: str = None, model_name: str = None, base_url: str = None):
        self.model_name = model_name or "text-embedding-3-small"
        self.dimension = 1536  # text-embedding-3-small dimension
        self.model_type = "openai_api"

        # Initialize OpenAI client
        api_key = api_key or getattr(config, 'OPENAI_API_KEY', None)
        base_url = base_url or getattr(config, 'OPENAI_BASE_URL', None)

        if not api_key:
            raise ValueError("OpenAI API key is required. Please set OPENAI_API_KEY in config.py or pass it to the constructor.")

        self.client = OpenAI(api_key=api_key, base_url=base_url)
        print(f"Initialized OpenAI embedding model: {self.model_name}")
        print(f"Embedding dimension: {self.dimension}")

    def encode(self, texts: List[str], is_query: bool = False) -> np.ndarray:
        """
        Encode list of texts to vectors using OpenAI API

        Args:
        - texts: List of texts to encode
        - is_query: Whether these are query texts (not used for OpenAI, kept for API compatibility)
        """
        if isinstance(texts, str):
            texts = [texts]

        try:
            # Call OpenAI embeddings API
            response = self.client.embeddings.create(
                model=self.model_name,
                input=texts
            )

            # Extract embeddings
            embeddings = [item.embedding for item in response.data]
            return np.array(embeddings, dtype=np.float32)

        except Exception as e:
            print(f"Error generating embeddings: {e}")
            raise

    def encode_single(self, text: str, is_query: bool = False) -> np.ndarray:
        """
        Encode single text

        Args:
        - text: Text to encode
        - is_query: Whether this is a query text
        """
        return self.encode([text], is_query=is_query)[0]

    def encode_query(self, queries: List[str]) -> np.ndarray:
        """
        Encode queries (for API compatibility)
        """
        return self.encode(queries, is_query=True)

    def encode_documents(self, documents: List[str]) -> np.ndarray:
        """
        Encode documents (for API compatibility)
        """
        return self.encode(documents, is_query=False)
