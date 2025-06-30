import bcrypt from "bcryptjs";
import { signAccess, signRefresh } from "../../../../lib/jwt";
import { redis } from "../../../../lib/redis";
import connectDB from "../../../../lib/db";
import User from "../../../../models/User";
import { cookies } from "next/headers";

export async function POST(req) {
  try {
    await connectDB();
    const { email, password } = await req.json();

    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return new Response("Invalid credentials", { status: 401 });
    }

    const accessToken = signAccess({ userId: user._id });
    const refreshToken = signRefresh({ userId: user._id });

    await redis.set(`refresh:${user._id}`, refreshToken, { ex: 7 * 24 * 3600 });

    const cookieStore = await cookies();
    cookieStore.set("accessToken", accessToken, {
      httpOnly: true,
      path: "/",
      maxAge: 15 * 60,
    });
    cookieStore.set("refreshToken", refreshToken, {
      httpOnly: true,
      path: "/",
      maxAge: 7 * 24 * 3600,
    });

    return new Response(null, { status: 200 });
  } catch (err) {
    console.error("Login error:", err);
    return new Response("Internal Server Error", { status: 500 });
  }
}
