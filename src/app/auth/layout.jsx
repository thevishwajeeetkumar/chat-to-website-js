// src/app/auth/layout.jsx  (SERVER COMPONENT: no "use client")
import Link from "next/link";

export const metadata = {
  title: "RagChatAI • Auth",
};

export default function AuthLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#0F172A] text-[#F1F5F9]">
      {/* ─── Left Marketing Panel ────────────────────────────── */}
      <div className="relative md:w-1/2 p-8 flex flex-col justify-center space-y-6 overflow-hidden">
        <h1 className="text-4xl font-extrabold">RagChatAI</h1>
        <h2 className="text-3xl font-semibold">
          Chat instantly with the content of any website
        </h2>
        <p className="text-lg max-w-prose">
          Paste a URL and our AI (RAG + embeddings) pulls context, summarizes,
          and answers in real time.
        </p>
        <Link
          href="/auth/signup"
          className="w-max inline-block px-6 py-3 rounded-full
                     bg-gradient-to-r from-[#5D5FEF] to-[#00E0FF]
                     text-white shadow-[0_0_10px_#00E0FF]
                     hover:opacity-90 transition"
        >
          Try it free
        </Link>
        <div
          className="absolute inset-0
                     bg-[radial-gradient(circle at center,rgba(255,255,255,0.04),transparent)]
                     animate-[pulse_6s_ease-in-out_infinite]
                     pointer-events-none"
        />
      </div>

      {/* ─── Right Auth Panel ─────────────────────────────────┐ */}
      <div className="md:w-1/2 p-8 flex items-center justify-center">
        <div className="w-full max-w-md">{children}</div>
      </div>
      {/* └───────────────────────────────────────────────────────┘ */}
    </div>
  );
}
