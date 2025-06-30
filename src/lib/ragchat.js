// src/lib/ragchat.js
import { upstash, RAGChat } from "@upstash/rag-chat";
import { redis } from "./redis"; // ✅ import the actual Redis instance

export const ragChat = new RAGChat({
  model: upstash("meta-llama/Meta-Llama-3-8B-Instruct")
});
