import { redis } from "../../../lib/redis";

export async function GET() {
  try {
    await redis.set("testkey", "hello");
    const value = await redis.get("testkey");

    return new Response(JSON.stringify({ success: true, value }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
