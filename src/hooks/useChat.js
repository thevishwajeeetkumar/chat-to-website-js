// src/hooks/useChat.js
import { useState, useEffect } from "react";

export function useChat({ api, sessionId, initialMessages = [] }) {
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState("");

  useEffect(() => {
    setMessages(initialMessages);
  }, [initialMessages]);

  const handleInputChange = (e) => setInput(e.target.value);

  const handleSubmit = async (e) => {
    e?.preventDefault();
    if (!input.trim()) return;

    setMessages((m) => [...m, { role: "user", content: input }]);
    const res = await fetch(api, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sessionId, prompt: input }),
    });

    if (!res.ok) {
      console.error("Network error:", res.statusText);
      return;
    }

    const data = await res.json();
    setMessages((m) => [...m, { role: "assistant", content: data.response }]);
    setInput("");
  };

  return { messages, input, setInput, handleInputChange, handleSubmit };
}
