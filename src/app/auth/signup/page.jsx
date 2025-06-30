// src/app/auth/signup/page.jsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    url: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      return alert("Passwords do not match");
    }
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      router.push("/auth/login");
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

      <div className="relative">
        <input
          name="confirmPassword"
          type={showPassword ? "text" : "password"}
          placeholder="Confirm Password"
          value={form.confirmPassword}
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

      <input
        name="url"
        type="url"
        placeholder="Website URL (optional)"
        value={form.url}
        onChange={handleChange}
        className="w-full px-4 py-2 rounded-full bg-[#0F172A] focus:outline-none focus:ring-1 focus:ring-[#00E0FF]"
      />

      <button
        type="submit"
        className="cursor-pointer w-full py-2 rounded-full bg-gradient-to-r from-[#5D5FEF] to-[#00E0FF] text-white shadow-[0_0_10px_#00E0FF] hover:opacity-90 transition"
      >
        Create Account
      </button>

      <p className="text-center text-sm">
        Already have an account?
        <button
          type="button"
          onClick={() => router.push("/auth/login")}
          className="cursor-pointer text-[#5D5FEF] hover:underline ml-1"
        >
          Log In
        </button>
      </p>
    </form>
  );
}
