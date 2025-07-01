// src/app/api/user-history/route.js

import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { redis } from "../../../lib/redis";
import { verifyAccess } from "../../../lib/jwt";

export async function GET() {
  // 1️⃣ Extract token
  const cookie= await cookies();
  const token = cookie.get("accessToken")?.value;
  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // 2️⃣ Verify token
  let user;
  try {
    user = await verifyAccess(token);
  } catch {
    return NextResponse.json({ error: "Invalid token" }, { status: 403 });
  }

  // 3️⃣ Fetch up to 5 recent items
  const rawHistory = await redis.lrange(`history:${user.userId}`, 0, 4);
  let history = rawHistory.map((entry) => {
    try {
      return JSON.parse(entry);
    } catch {
      return { url: entry };
    }
  });

  // 4️⃣ If fewer than 5, fill with recommendations
  const RECOMMENDED = [
    "https://vercel.com",
    "https://nextjs.org",
    "https://openai.com",
    "https://github.com",
    "https://tailwindcss.com"
  ];

  if (history.length < 5) {
    // Extract URLs already present
    const seen = new Set(history.map((h) => h.url));
    // Filter recommended to exclude seen, then take as many as needed
    const toAdd = RECOMMENDED
      .filter((url) => !seen.has(url))
      .slice(0, 5 - history.length)
      .map((url) => ({ url }));
    history = history.concat(toAdd);
  }

  // 5️⃣ Return result
  return NextResponse.json({
    email: user.email,
    userId: user.userId,
    history,
  });
}
