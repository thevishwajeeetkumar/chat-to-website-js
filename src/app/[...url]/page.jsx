// src/app/[...url]/page.jsx

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyAccess } from "../../lib/jwt";
import { ragChat } from "../../lib/ragchat";
import { redis } from "../../lib/redis";
import ChatWrapper from "../components/ChatWrapper";

// Helper to rebuild and decode the URL
function reconstructUrl(urlParam) {
  const segments = Array.isArray(urlParam) ? urlParam : [urlParam];
  return segments.map(decodeURIComponent).join("/");
}

export default async function Page({ params }) {
  // 1️⃣ Await params before using
  const { url: rawParam } = await params;
  const decodedUrl = reconstructUrl(rawParam);

  // 2️⃣ Await cookies() before using
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;
  const user = token ? await verifyAccess(token) : null;
  if (!user) {
    redirect("/auth/login");
  }

  // 3️⃣ Build a session ID unique per user + URL
  const userId = user.userId;
  const sessionId = `${userId}--${decodedUrl}`.replace(/\W/g, "");

  // 4️⃣ Index the URL in RAG context if not already done
  const alreadyIndexed = await redis.sismember("indexed-urls", decodedUrl);
  if (!alreadyIndexed) {
    try {
      await ragChat.context.add({
        type: "html",
        source: decodedUrl,
        config: {
          chunkSize: 800,      // fewer, larger chunks
          chunkOverlap: 200,   // increased overlap
        },
      });
      await redis.sadd("indexed-urls", decodedUrl);
    } catch (err) {
      console.error("Indexing error (skipped):", err);
    }
  }

  // 5️⃣ Save to user history (keep only last 5)
  await redis.lpush(`history:${userId}`, decodedUrl);
  await redis.ltrim(`history:${userId}`, 0, 4);

  // 6️⃣ Load any existing messages for this session
  const rawMessages = await redis.lrange(`messages:${sessionId}`, 0, 9);
  const initialMessages = rawMessages
    .map((msgStr) => {
      try {
        return JSON.parse(msgStr);
      } catch {
        return null;
      }
    })
    .filter(Boolean)
    .reverse();

  // 7️⃣ Render the client-side ChatWrapper with props
  return (
    <ChatWrapper
      sessionId={sessionId}
      initialMessages={initialMessages}
      url={decodedUrl}
    />
  );
}
