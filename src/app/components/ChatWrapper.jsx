"use client";

import React from "react";
import { useChat } from "../../hooks/useChat";
import Messages from "./Messages";
import ChatInput from "./ChatInput";

export default function ChatWrapper({ sessionId, initialMessages, url }) {
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    setInput,
  } = useChat({ api: "/api/chat-stream", sessionId, initialMessages });

  return (
    <div className="min-h-screen bg-[#0A0F1A] text-white flex flex-col items-center justify-start p-6">
      <div className="w-full max-w-4xl">
        <p className="text-sm text-blue-300 mb-2">
          {decodeURIComponent(url)}
        </p>
        <h1 className="text-4xl font-bold text-blue-400 mb-1">Welcome back!</h1>
        <p className="text-md text-blue-300 mb-6">
          Ask something about the website {decodeURIComponent(url)}
        </p>
        <div className="space-y-4">
          <Messages messages={messages} />
        </div>
      </div>
      <div className="w-full max-w-4xl mt-auto">
        <ChatInput
          input={input}
          onInputChange={handleInputChange}
          onSubmit={handleSubmit}
          setInput={setInput}
        />
      </div>
    </div>
  );
}
