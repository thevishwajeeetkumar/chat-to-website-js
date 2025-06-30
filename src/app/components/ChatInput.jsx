"use client";

import React from "react";
import { Send } from "lucide-react";

export default function ChatInput({
  input,
  onInputChange,
  onSubmit,
  setInput,
}) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(e);
        setInput("");
      }}
      className="relative flex items-center mt-4"
    >
      <input
        type="text"
        value={input}
        onChange={onInputChange}
        placeholder="Ask something about the website..."
        className="w-full bg-[#101828] text-white placeholder:text-blue-300 p-4 rounded-full pr-12 shadow-md outline-none focus:ring-2 focus:ring-blue-600 transition"
      />
      <button
        type="submit"
        className="absolute right-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full p-2 shadow-lg transition"
      >
        <Send size={18} />
      </button>
    </form>
  );
}
