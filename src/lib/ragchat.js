// src/lib/ragchat.js
import { RAGChat, upstash } from "@upstash/rag-chat";
import { Redis } from "@upstash/redis";

// 1️⃣ Redis client (chat & context storage)
export const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

// 2️⃣ RAGChat instance with both Redis (storage) and Vector (inference)
export const ragChat = new RAGChat({
  redis,  // stores embeddings & messages

  // tells RAGChat where your Upstash Vector inference endpoint lives
  vector: {
    url: process.env.UPSTASH_VECTOR_REST_URL,
    token: process.env.UPSTASH_VECTOR_REST_TOKEN,
  },

  // which model to run on that endpoint
  model: upstash("meta-llama/Meta-Llama-3-8B-Instruct"),
});
