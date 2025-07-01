"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import FeatureSection from "./components/FeatureSection";
import HowItWorks from "./components/HowItWorks";
import PricingSection from "./components/PricingSection";
import TestimonialGrid from "./components/TestimonialGrid";
import FAQSection from "./components/FAQSection";

export default function Landing() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    setIsAuthenticated(document.cookie.includes("accessToken"));
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#0F172A] text-[#F1F5F9]">
      {/* Top Navbar */}
      <header className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#0F172A]">
        <div
          className="text-2xl font-extrabold text-blue-400 cursor-pointer"
          onClick={() => router.push("/")}
        >
          RagChatAI
        </div>

        <div className="hidden md:flex space-x-2 bg-white text-black px-4 py-2 rounded-full shadow-md">
          <Link href="#features">
            <span className="px-4 py-1 rounded-md hover:bg-gray-200 transition font-medium cursor-pointer">
              Features
            </span>
          </Link>
          <Link href="#howitworks">
            <span className="px-4 py-1 rounded-md hover:bg-gray-200 transition font-medium cursor-pointer">
              How It Works
            </span>
          </Link>
          <Link href="#pricing">
            <span className="px-4 py-1 rounded-md hover:bg-gray-200 transition font-medium cursor-pointer">
              Pricing
            </span>
          </Link>
          <Link href="#faq">
            <span className="px-4 py-1 rounded-md hover:bg-gray-200 transition font-medium cursor-pointer">
              FAQ
            </span>
          </Link>
        </div>

        {!isAuthenticated && (
          <div className="space-x-4">
            <Link href="/auth/login">
              <button className="px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 transition text-white">
                Login
              </button>
            </Link>
            <Link href="/auth/signup">
              <button className="px-4 py-2 rounded-md bg-white text-blue-700 hover:bg-blue-100 transition">
                Sign Up
              </button>
            </Link>
          </div>
        )}
      </header>

      {/* Hero */}
      <section className="relative text-center py-24 px-6">
        <h2 className="text-4xl md:text-5xl font-extrabold max-w-4xl mx-auto text-blue-200">
          Chat instantly with the content of{" "}
          <span className="text-blue-500">any website</span>
        </h2>
        <p className="mt-6 max-w-2xl mx-auto text-lg text-gray-300">
          RagChatAI is your intelligent assistant for web-based content…
        </p>
        <button
          onClick={() =>
            router.push(isAuthenticated ? "/dashboard" : "/auth/signup")
          }
          className="mt-8 inline-block rounded-full px-8 py-3 font-semibold text-black bg-white hover:bg-gray-200 transition ring-1 ring-white/20 shadow-lg"
        >
          {isAuthenticated ? "Go to Dashboard →" : "Start Chat Now →"}
        </button>
      </section>

      {/* Page Sections */}
      <section id="features" className="py-16 px-4">
        <FeatureSection />
      </section>
      <section id="howitworks" className="py-16 px-4 bg-[#111C2E]">
        <HowItWorks />
      </section>
      <section id="pricing" className="py-16 px-4">
        <PricingSection />
      </section>
      <section id="faq" className="py-16 px-4 bg-[#111C2E]">
        <FAQSection />
      </section>
      <section className="py-16 px-4">
        <TestimonialGrid />
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} RagChatAI • Built with ❤️
      </footer>
    </div>
  );
}
