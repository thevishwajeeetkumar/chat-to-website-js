// src/app/api/chat-stream/route.js

import { ragChat } from "../../../lib/ragchat";

export async function POST(req) {
  try {
    const { sessionId, prompt } = await req.json();

    const sid = String(sessionId || "").trim();
    const question = String(prompt || "").trim();

    if (!sid || !question) {
      return new Response("Missing sessionId or prompt", { status: 400 });
    }

    // ▶ Use positional args: sessionId, question
    const res = await ragChat.chat(sid, question);

    return new Response(
      JSON.stringify({
        answer: res.answer,
        sources: res.sources || [],
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (err) {
    console.error("❌ chat-stream error:", err);
    return new Response("Internal Server Error", { status: 500 });
  }
}
