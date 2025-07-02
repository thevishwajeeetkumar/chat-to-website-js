// src/app/[...url]/page.jsx

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyAccess } from "../../lib/jwt";
import { ragChat } from "../../lib/ragchat";
import { redis } from "../../lib/redis";
import ChatWrapper from "../components/ChatWrapper";

// Helper to rebuild the decoded URL from catch-all params
function reconstructUrl(param) {
  const segs = Array.isArray(param) ? param : [param];
  return segs.map(decodeURIComponent).join("/");
}

export default async function Page({ params }) {
  // 1️⃣ Await params before destructuring
  const { url: rawParam } = await params;
  const decodedUrl = reconstructUrl(rawParam);

  // 2️⃣ Authenticate user
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;
  let user;
  try {
    user = token ? verifyAccess(token) : null;
  } catch {
    return redirect("/auth/login");
  }
  if (!user) redirect("/auth/login");

  const userId = user.userId;
  const sessionId = `${userId}--${decodedUrl}`.replace(/\W/g, "");

  // 3️⃣ Index the page on first visit
  const already = await redis.sismember("indexed-urls", decodedUrl);
  if (!already) {
    try {
      await ragChat.context.add({
        type: "html",
        source: decodedUrl,
      });
      await redis.sadd("indexed-urls", decodedUrl);
    } catch (e) {
      console.error("Indexing skipped:", e);
    }
  }

  // 4️⃣ Save URL to history (keep last 5)
  await redis.lpush(`history:${userId}`, decodedUrl);
  await redis.ltrim(`history:${userId}`, 0, 4);

  // 5️⃣ Load existing messages
  const rawMsgs = await redis.lrange(`messages:${sessionId}`, 0, 9);
  const initialMessages = rawMsgs
    .map((s) => {
      try { return JSON.parse(s); }
      catch { return null; }
    })
    .filter(Boolean)
    .reverse();

  // 6️⃣ Render the Chat UI
  return (
    <ChatWrapper
      sessionId={sessionId}
      initialMessages={initialMessages}
      url={decodedUrl}
    />
  );
}
