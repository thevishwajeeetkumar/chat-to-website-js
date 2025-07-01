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
      credentials: "include",              // ← Include cookies
      body: JSON.stringify(form),
    });

    if (res.ok) {
      // Redirect into your new dashboard
      router.push("/dashboard");
    } else {
      alert(await res.text());
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0F172A] px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm space-y-6 bg-[#1A202C] rounded-xl p-8 shadow-lg"
      >
        <h2 className="text-2xl font-semibold text-white text-center">
          Sign In
        </h2>

        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full px-4 py-2 rounded-full bg-[#0F172A] text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#00E0FF]"
          required
        />

        <div className="relative">
          <input
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-full bg-[#0F172A] text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#00E0FF]"
            required
          />
          <span
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer select-none"
          >
            {showPassword ? "🙈" : "👁️"}
          </span>
        </div>

        <button
          type="submit"
          className="w-full py-2 rounded-full bg-gradient-to-r from-[#5D5FEF] to-[#00E0FF] text-white font-medium shadow-[0_0_10px_#00E0FF] hover:opacity-90 transition"
        >
          Sign In
        </button>

        <p className="text-center text-sm text-gray-400">
          Don’t have an account?
          <button
            type="button"
            onClick={() => router.push("/auth/signup")}
            className="ml-1 text-[#5D5FEF] hover:underline"
          >
            Sign Up
          </button>
        </p>

        <p className="text-center text-xs text-gray-500">
          <a href="#" className="hover:underline">
            Forgot password?
          </a>
        </p>
      </form>
    </div>
  );
}
