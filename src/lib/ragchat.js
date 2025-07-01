// src/lib/ragchat.js
import { RAGChat, upstash } from "@upstash/rag-chat";
import { redis } from "./redis";

export const ragChat = new RAGChat({
  redis,
  // Use the free Upstash-hosted Llama model
  model: upstash("meta-llama/Meta-Llama-3-8B-Instruct"),
});
