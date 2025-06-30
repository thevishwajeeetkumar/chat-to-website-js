import bcrypt from "bcryptjs";
import connectDB from "../../../../lib/db";
import { signAccess, signRefresh } from "../../../../lib/jwt";
import { redis } from "../../../../lib/redis";
import User from "../../../../models/User";
import { cookies } from "next/headers";

export async function POST(req) {
  try {
    await connectDB();

    const { email, password } = await req.json();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return new Response("User already exists", { status: 409 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ email, password: hashedPassword });

    const accessToken = signAccess({ userId: user._id });
    const refreshToken = signRefresh({ userId: user._id });

    await redis.set(`refresh:${user._id}`, refreshToken, {
      ex: 7 * 24 * 60 * 60, // 7 days
    });

    const cookieStore = cookies();
    cookieStore.set("accessToken", accessToken, {
      httpOnly: true,
      path: "/",
      maxAge: 15 * 60,
    });
    cookieStore.set("refreshToken", refreshToken, {
      httpOnly: true,
      path: "/",
      maxAge: 7 * 24 * 60 * 60,
    });

    return new Response("Signup successful", { status: 201 });
  } catch (err) {
    console.error("Signup Error:", err);
    return new Response("Internal Server Error", { status: 500 });
  }
}
