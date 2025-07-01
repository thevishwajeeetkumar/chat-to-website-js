"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import LoggedInNavbar from "../components/LoggedInNavbar";

export default function DashboardPage() {
  const router = useRouter();
  const [url, setUrl] = useState("");
  const [history, setHistory] = useState([]);

  useEffect(() => {
    // Fetch last-five (or recommended) from our API
    fetch("/api/user-history", { credentials: "include" })
      .then((res) => res.json())
      .then((data) => setHistory(data.history || []))
      .catch(console.error);
  }, []);

  const handleStart = () => {
    if (!url.trim()) return;
    router.push(`/${encodeURIComponent(url.trim())}`);
  };

  return (
    <div className="min-h-screen bg-[#0F172A] text-[#F1F5F9]">

      {/* 2️⃣ Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-10 space-y-10">
        {/* Hero / Intro */}
        <section className="text-center">
          <h1 className="text-3xl md:text-4xl font-extrabold">
            Let’s start a new chat
          </h1>
          <p className="mt-2 text-gray-400">
            Enter any website URL on the left, or pick one of your recent
            chats on the right.
          </p>
        </section>

        {/* Two-column panel */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* ➡️ Left Panel: URL Input Card */}
          <div className="bg-[#1E293B] rounded-xl p-8 shadow-lg border border-gray-700 space-y-4">
            <h2 className="text-xl font-semibold">Import Website</h2>
            <input
              type="text"
              placeholder="https://example.com"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-[#0F172A] border border-gray-600 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleStart}
              className="w-full py-3 rounded-lg bg-blue-600 hover:bg-blue-700 transition font-medium"
            >
              Start Chat
            </button>
          </div>

          {/* ⬅️ Right Panel: Recent Chats Grid */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Recent Chats</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {history.map((item, idx) => {
                const { url: siteUrl } = item;
                return (
                  <div
                    key={idx}
                    onClick={() =>
                      router.push(`/${encodeURIComponent(siteUrl)}`)
                    }
                    className="p-4 bg-[#1E293B] rounded-lg border border-gray-700 cursor-pointer hover:bg-[#2A3748] transition"
                  >
                    <p className="truncate font-medium">{siteUrl}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
