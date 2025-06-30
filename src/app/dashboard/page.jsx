import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { verifyAccess } from "../lib/jwt";
import connectDB from "../lib/db";
import { redis } from "../lib/redis";

export default async function DashboardPage() {
  await connectDB();

  const cookieStore = cookies();
  const token = cookieStore.get("accessToken")?.value;
  const user = token ? verifyAccess(token) : null;

  if (!user) redirect("/auth/login");
  const userId = user.userId;

  // Fetch last 5 URLs
  const history = await redis.lrange(`history:${userId}`, 0, 4) || [];

  return (
    <div className="min-h-screen bg-[#0F172A] text-[#F1F5F9]">
      <div className="max-w-2xl mx-auto p-8 space-y-6">
        <h1 className="text-3xl font-bold">Welcome, {user.email}</h1>
        {history.length > 0 ? (
          <>
            <h2 className="text-xl font-semibold">📄 Recent Chats</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {history.map((url, idx) => (
                <div
                  key={idx}
                  onClick={() => (window.location.href = `/${encodeURIComponent(url)}`)}
                  className="p-4 bg-zinc-800 rounded-lg cursor-pointer hover:bg-zinc-700 transition"
                >
                  <p className="truncate">{url}</p>
                </div>
              ))}
            </div>
          </>
        ) : (
          <p>You have no recent chats yet.</p>
        )}
        <button
          onClick={() => (window.location.href = "/start")}
          className="mt-4 w-full py-3 bg-gradient-to-r from-[#5D5FEF] to-[#00E0FF] rounded-full text-black font-medium hover:opacity-90 transition"
        >
          + Start a New Chat
        </button>
      </div>
    </div>
  );
}
