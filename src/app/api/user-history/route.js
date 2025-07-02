// src/app/api/user-history/route.js

import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { redis } from "../../../lib/redis";
import { verifyAccess } from "../../../lib/jwt";

export async function GET() {
  // 1️⃣ Read the cookie
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;
  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // 2️⃣ Verify the token (throws if invalid)
  let user;
  try {
    user = verifyAccess(token);
  } catch {
    return NextResponse.json({ error: "Invalid token" }, { status: 403 });
  }

  // 3️⃣ Fetch the last 5 URLs
  let history = await redis.lrange(`history:${user.userId}`, 0, 4);

  // 4️⃣ If fewer than 5, pad with recommendations
  const RECOMMENDED = [
    "https://vercel.com",
    "https://nextjs.org",
    "https://openai.com",
    "https://github.com",
    "https://tailwindcss.com",
  ];
  if (history.length < 5) {
    const seen = new Set(history);
    const extras = RECOMMENDED.filter((u) => !seen.has(u)).slice(0, 5 - history.length);
    history = history.concat(extras);
  }

  // 5️⃣ Return as JSON
  return NextResponse.json({
    email: user.email,
    userId: user.userId,
    history: history.map((u) => ({ url: u })),
  });
}
