"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ChatHomePage() {
  const [url, setUrl] = useState("");
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!url) return;
    const cleanedUrl = encodeURIComponent(url.trim());
    router.push(`/${cleanedUrl}`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0F172A] text-white">
      <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-md p-6 bg-[#1A202C] rounded-xl">
        <h1 className="text-2xl font-semibold mb-4">Enter a Website URL</h1>
        <input
          type="url"
          placeholder="https://example.com"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="w-full px-4 py-2 rounded bg-[#0F172A] text-white border border-white/20 focus:outline-none"
          required
        />
        <button
          type="submit"
          className="cursor-pointer w-full py-2 rounded bg-gradient-to-r from-[#5D5FEF] to-[#00E0FF] text-black font-semibold"
        >
          Start Chat
        </button>
      </form>
    </div>
  );
}
