// src/app/components/ChatWrapper.jsx
"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { User, Cpu, Loader2 } from "lucide-react";
import LoggedInNavbar from "./LoggedInNavbar";

export default function ChatWrapper({ sessionId, initialMessages, url }) {
  const router = useRouter();
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const endRef = useRef(null);

  // Auto‐scroll on new messages
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Send message to API
  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMsg = { role: "user", content: input.trim() };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat-stream", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ sessionId, prompt: input.trim() }),
      });
      const { answer } = await res.json();
      setMessages((m) => [...m, { role: "assistant", content: answer }]);
    } catch {
      setMessages((m) => [
        ...m,
        { role: "assistant", content: "⚠️ Oops, something went wrong." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-[#0F172A] text-white">
      {/* Primary Navbar */}
      <LoggedInNavbar />

      {/* Secondary Header */}
      <div className="flex items-center justify-between px-6 py-3 bg-[#1E293B] border-b border-gray-700">
        <button
          onClick={() => router.back()}
          className="text-gray-400 hover:text-white"
        >
          ← Back
        </button>
        <h2 className="truncate text-lg font-semibold text-white">{url}</h2>
        <div className="w-6" />
      </div>

      {/* Persona Banner */}
      <div className="px-6 py-4 bg-[#111C2E] border-b border-gray-700">
        <p className="text-sm text-gray-400">
          You’re chatting with{" "}
          <span className="text-blue-400 break-all">{url}</span>
        </p>
      </div>

      {/* Messages Pane */}
      <div className="flex-grow overflow-y-auto px-6 py-4 space-y-4 bg-[#111C2E]">
        {messages.map((msg, idx) => {
          const isUser = msg.role === "user";
          return (
            <div
              key={idx}
              className={`flex items-start ${
                isUser ? "justify-end" : "justify-start"
              }`}
            >
              {!isUser && (
                <Cpu className="text-2xl text-blue-400 mr-2 flex-shrink-0" />
              )}
              <div
                className={`max-w-[70%] px-4 py-2 rounded-xl break-words ${
                  isUser
                    ? "bg-blue-600 text-white rounded-br-none"
                    : "bg-gray-800 text-gray-100 rounded-bl-none"
                }`}
              >
                {msg.content}
              </div>
              {isUser && (
                <User className="text-2xl text-gray-400 ml-2 flex-shrink-0" />
              )}
            </div>
          );
        })}
        <div ref={endRef} />
      </div>

      {/* Input Bar */}
      <div className="px-6 py-4 bg-[#1E293B] border-t border-gray-700">
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Type your question here..."
            className="flex-grow px-4 py-2 bg-[#0F172A] text-white placeholder-gray-500 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={loading}
          />
          <button
            onClick={sendMessage}
            disabled={loading}
            className="p-3 bg-blue-600 hover:bg-blue-700 rounded-full transition disabled:opacity-50"
          >
            {loading ? (
              <Loader2 className="animate-spin text-white" />
            ) : (
              "Send"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
