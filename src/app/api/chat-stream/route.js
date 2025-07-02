// src/app/api/chat-stream/route.js

import fetch from "node-fetch";
import { Index } from "@upstash/vector";
import { aiUseChatAdapter } from "@upstash/rag-chat/nextjs";
import { RAGChat, upstash } from "@upstash/rag-chat";
import { Redis } from "@upstash/redis";

const vectorIndex = new Index({
  url: process.env.UPSTASH_VECTOR_REST_URL,
  token: process.env.UPSTASH_VECTOR_REST_TOKEN,
});
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});
const ragChat = new RAGChat({
  redis,
  vector: {
    url: process.env.UPSTASH_VECTOR_REST_URL,
    token: process.env.UPSTASH_VECTOR_REST_TOKEN,
  },
  model: upstash("meta-llama/Meta-Llama-3-8B-Instruct"),
});

export async function POST(req) {
  try {
    const { sessionId, prompt } = await req.json();
    if (!sessionId || !prompt) {
      return new Response("Missing sessionId or prompt", { status: 400 });
    }
    const question = String(prompt).trim();

    // 1️⃣ Embed the user’s question via HF feature-extraction
    const hfRes = await fetch(
      "https://api-inference.huggingface.co/pipeline/feature-extraction/sentence-transformers/all-MiniLM-L6-v2",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.HUGGINGFACE_API_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ inputs: [question] }),
      }
    );
    if (!hfRes.ok) {
      const errTxt = await hfRes.text();
      throw new Error(`HF embedding failed: ${errTxt}`);
    }
    const hfJson = await hfRes.json();
    const qVec = hfJson[0];

    // 2️⃣ Retrieve top-3 chunks from Upstash Vector
    const searchRes = await vectorIndex.search({ vector: qVec, k: 3 });
    const context = searchRes.results.map((r) => r.content).join("\n\n");

    // 3️⃣ Generate via RAGChat
    const systemPrompt = `
You are an assistant. Use ONLY the context below to answer the question.
Context:
${context}

Question:
${question}
`;
    const stream = await ragChat.chat(systemPrompt, {
      sessionId,
      streaming: true,
    });

    // 4️⃣ Stream response back
    return aiUseChatAdapter(stream);
  } catch (err) {
    console.error("❌ chat-stream error:", err);
    return new Response("Internal Server Error", { status: 500 });
  }
}
