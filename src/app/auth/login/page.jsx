// src/app/auth/login/page.jsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      router.push("/chat"); // redirect to landing or dashboard
    } else {
      alert(await res.text());
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 bg-[#1A202C] rounded-xl p-6 shadow-lg"
    >
      <input
        name="email"
        type="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        className="w-full px-4 py-2 rounded-full bg-[#0F172A] focus:outline-none focus:ring-1 focus:ring-[#00E0FF]"
        required
      />

      <div className="relative">
        <input
          name="password"
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full px-4 py-2 rounded-full bg-[#0F172A] focus:outline-none focus:ring-1 focus:ring-[#00E0FF]"
          required
        />
        <span
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer select-none"
        >
          {showPassword ? "🙈" : "👁️"}
        </span>
      </div>

      <button
        type="submit"
        className="cursor-pointer w-full py-2 rounded-full bg-gradient-to-r from-[#5D5FEF] to-[#00E0FF] text-white shadow-[0_0_10px_#00E0FF] hover:opacity-90 transition"
      >
        Sign In
      </button>

      <p className="text-center text-sm">
        Don’t have an account?
        <button
          type="button"
          onClick={() => router.push("/auth/signup")}
          className="cursor-pointer text-[#5D5FEF] hover:underline ml-1"
        >
          Sign Up
        </button>
      </p>

      <p className="cursor-pointer text-center text-xs text-gray-500">
        <a href="#" className="hover:underline">
          Forgot password?
        </a>
      </p>
    </form>
  );
}
