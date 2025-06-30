"use client";

import React from "react";
import Message from "./Message";
import { MessageSquare } from "lucide-react";

export default function Messages({ messages }) {
  return (
    <div className="space-y-4 max-h-[60vh] overflow-y-auto p-2">
      {messages && messages.length > 0 ? (
        messages.map((msg, i) => (
          <Message
            key={i}
            content={msg.content}
            isUserMessage={msg.role === "user"}
          />
        ))
      ) : (
        <div className="flex flex-col items-center justify-center py-8 text-blue-400">
          <MessageSquare size={32} />
          <h3 className="text-xl font-semibold">You&apos;re all set!</h3>
          <p className="text-sm text-blue-300">Ask your first question below</p>
        </div>
      )}
    </div>
  );
}
