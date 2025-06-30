import { ragChat } from "@/lib/ragchat"; // ✅ make sure this path is correct

export async function POST(req) {
  try {
    const { sessionId, prompt } = await req.json();

    const question = typeof prompt === "string" ? prompt.trim() : "";

    if (!question || !sessionId) {
      return new Response("Missing prompt or sessionId", { status: 400 });
    }

    const stream = await ragChat.stream({
      sessionId,
      question,
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/event-stream",
      },
    });
  } catch (err) {
    console.error("❌ Server error in chat-stream route:", err);
    return new Response("Internal Server Error", { status: 500 });
  }
}
