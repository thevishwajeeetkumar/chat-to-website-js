"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { UserCircle2 } from "lucide-react";

export default function Navbar() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Basic cookie check (client-side). You can replace with API call for stricter auth.
    const token = document.cookie.includes("accessToken");
    setIsAuthenticated(token);
  }, []);

  return (
    <nav className="flex items-center justify-between px-8 py-5 border-b border-white/10 bg-[#0F172A]">
      <h1
        className="text-lg font-bold tracking-tight cursor-pointer"
        onClick={() => router.push("/")}
      >
        RagChat<span className="text-accent">AI</span>
      </h1>

      <div className="hidden md:flex gap-6 text-sm">
        <a href="#features" className="hover:text-accent">
          Features
        </a>
        <a href="#pricing" className="hover:text-accent">
          Pricing
        </a>
        <a href="#faq" className="hover:text-accent">
          FAQ
        </a>

        {isAuthenticated ? (
          <>
            <button
              onClick={() => router.push("/chat")}
              className="bg-primary px-4 py-2 rounded-md text-sm font-medium hover:bg-accent transition"
            >
              Dashboard
            </button>

            <button
              onClick={() => {
                document.cookie = "accessToken=; Max-Age=0; path=/;";
                router.refresh(); // refresh page to re-render navbar
              }}
              className="ml-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm"
            >
              Logout
            </button>

            <UserCircle2 className="w-8 h-8 text-blue-400 hover:text-accent cursor-pointer" />
          </>
        ) : (
          <>
            <button
              onClick={() => router.push("/auth/login")}
              className="bg-primary px-4 py-2 rounded-md text-sm font-medium hover:bg-accent transition"
            >
              Log in
            </button>
            <button
              onClick={() => router.push("/auth/signup")}
              className="ml-2 bg-gradient-to-r from-[#5D5FEF] to-[#00E0FF] px-4 py-2 rounded-md text-sm font-medium text-black hover:opacity-90 transition"
            >
              Sign up
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
