// src/app/api/test-rag/route.js
import { ragChat } from "../../../lib/ragchat";

export async function POST() {
  try {
    const stream = await ragChat.stream({
      sessionId: "test-session",
      question: "What is the capital of France?",
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/event-stream",
      },
    });
  } catch (err) {
    console.error("Test API error:", err);
    return new Response("Error", { status: 500 });
  }
}
