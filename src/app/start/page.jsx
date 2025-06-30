"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function StartPage() {
  const [url, setUrl] = useState("");
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!url.trim()) return;
    const encodedUrl = encodeURIComponent(url.trim());
    router.push(`/${encodedUrl}`);
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-[#e5e5f7] to-[#fdfbff] flex items-center justify-center px-4">
      <div className="max-w-xl w-full bg-white shadow-xl rounded-2xl p-8 space-y-6 border border-gray-200">
        <h1 className="text-4xl font-extrabold text-gray-900 text-center leading-tight">
          🔍 Explore Any Website with AI
        </h1>
        <p className="text-center text-gray-600">
          Paste a website URL below and our AI chatbot will load its context and start chatting with you.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="e.g. https://example.com"
            className="flex-1 px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            type="submit"
            className="px-6 py-3 bg-black text-white rounded-xl hover:bg-gray-900 transition"
          >
            🚀 Start Chat
          </button>
        </form>

        <div className="text-sm text-center text-gray-500 pt-2">
          Built with 🧠 RAG + Embeddings · Powered by Next.js
        </div>
      </div>
    </section>
  );
}
