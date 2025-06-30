import { verifyRefresh, signAccess } from "../../../../lib/jwt";
import { redis } from "../../../../lib/redis";
import { cookies } from "next/headers";

export async function POST() {
  try {
    const cookieStore = cookies();
    const refreshToken = cookieStore.get("refreshToken")?.value;

    if (!refreshToken) {
      return new Response("Missing refresh token", { status: 401 });
    }

    const payload = verifyRefresh(refreshToken);
    const storedToken = await redis.get(`refresh:${payload.userId}`);

    if (refreshToken !== storedToken) {
      return new Response("Invalid refresh token", { status: 403 });
    }

    const newAccessToken = signAccess({ userId: payload.userId });

    cookieStore.set("accessToken", newAccessToken, {
      httpOnly: true,
      path: "/",
      maxAge: 15 * 60,
    });

    return new Response(null, { status: 200 });
  } catch (err) {
    console.error("Refresh error:", err);
    return new Response("Invalid or expired token", { status: 401 });
  }
}
