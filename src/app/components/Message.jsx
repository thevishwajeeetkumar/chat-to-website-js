import React from "react";
import { User, Bot } from "lucide-react";

export default function Message({ content, isUserMessage }) {
  return (
    <div className={`flex ${isUserMessage ? "justify-end" : "justify-start"} w-full`}>
      <div className={`flex items-start space-x-2 max-w-lg px-4 py-3 rounded-2xl shadow-md ${isUserMessage ? "bg-blue-800" : "bg-[#1A2233]"} text-white`}>
        <div className="flex-shrink-0 mt-1">
          {isUserMessage ? (
            <User className="text-blue-200" size={20} />
          ) : (
            <Bot className="text-blue-300" size={20} />
          )}
        </div>
        <div className="flex flex-col">
          <span className="font-semibold text-sm text-blue-300 mb-1">
            {isUserMessage ? "You" : "Website"}
          </span>
          <p className="text-sm">{content}</p>
        </div>
      </div>
    </div>
  );
}
