// src/app/[...url]/page.jsx
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyAccess } from "../../lib/jwt";
import { ragChat } from "../../lib/ragchat";
import { redis } from "../../lib/redis";
import ChatWrapper from "../components/ChatWrapper";

// Helper to convert segments into full URL
function reconstructUrl(urlParam) {
  const segments = Array.isArray(urlParam) ? urlParam : [urlParam];
  return segments.map(decodeURIComponent).join("/");
}

export default async function Page({ params }) {
  const { url } = await Promise.resolve(params);

  // 1. Get user from cookie
  const cookieStore =await cookies();
  const token = await cookieStore.get("accessToken")?.value;
  const user = token ? verifyAccess(token) : null;

  if (!user) redirect("/auth/login");

  const userId = user.userId;
  const reconstructedUrl = reconstructUrl(url);
  const sessionId = `${userId}--${reconstructedUrl}`.replace(/\W/g, "");

  // 2. Add page to context if not already indexed
  const isIndexed = await redis.sismember("indexed-urls", reconstructedUrl);
  if (!isIndexed) {
    await ragChat.context.add({
      type: "html",
      source: reconstructedUrl,
      config: { chunkSize: 200, chunkOverlap: 50 },
    });
    await redis.sadd("indexed-urls", reconstructedUrl);
  }

  // 3. Save to Redis user history
  await redis.lpush(`history:${userId}`, reconstructedUrl);
  await redis.ltrim(`history:${userId}`, 0, 4); // keep only last 5

  // 4. Load chat history
  const rawMessages = await redis.lrange(`messages:${sessionId}`, 0, 9); // newest to oldest
  const initialMessages = rawMessages
    .map((msgStr) => {
      try {
        return JSON.parse(msgStr);
      } catch {
        return null;
      }
    })
    .filter((msg) => msg !== null)
    .reverse(); // oldest to newest for UI

  // 4. Render chat
  return (
    <ChatWrapper
      sessionId={sessionId}
      initialMessages={initialMessages}
      url={reconstructedUrl}
    />
  );
}