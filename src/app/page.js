"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import FeatureSection from "./components/FeatureSection";
import HowItWorks from "./components/HowItWorks";
import PricingSection from "./components/PricingSection";
import TestimonialGrid from "./components/TestimonialGrid";
import FAQSection from "./components/FAQSection";
import Link from "next/link";

export default function Landing() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const hasToken = document.cookie.includes("accessToken");
    setIsAuthenticated(hasToken);
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-[#0F172A] text-[#F1F5F9]">
      
      {/* 🔷 TOP NAVBAR */}
      <div className="flex justify-between items-center px-8 py-4 border-b border-white/10">
        <h1 className="text-2xl font-bold text-blue-400">RagChatAI</h1>
        {!isAuthenticated && (
          <div className="space-x-4">
            <Link href="/auth/login">
              <button className="px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 transition">
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
      </div>

      {/* 🧭 MIDDLE NAVIGATION */}
      <div className="flex justify-center mt-6">
        <div className="flex space-x-6 px-6 py-2 rounded-full bg-[#111827] shadow-sm border border-gray-700 text-sm">
          <a href="#features" className="hover:text-blue-400 transition duration-150">Features</a>
          <a href="#howitworks" className="hover:text-blue-400 transition duration-150">How It Works</a>
          <a href="#pricing" className="hover:text-blue-400 transition duration-150">Pricing</a>
          <a href="#faq" className="hover:text-blue-400 transition duration-150">FAQ</a>
        </div>
      </div>

      {/* 🧠 HERO SECTION */}
      <header className="relative isolate py-20 text-center px-6">
        <div className="absolute -z-10 inset-0 bg-gradient-to-b from-white/5 via-primary/10 to-transparent" />
        <h1 className="text-4xl md:text-5xl font-extrabold mx-auto max-w-4xl text-primary">
          Chat instantly with the content of{" "}
          <span className="text-accent">any website</span>
        </h1>
        <p className="mt-6 mx-auto max-w-2xl text-lg text-gray-300">
          RagChatAI is your intelligent assistant for web-based content...
        </p>
        <p className="mt-3 mx-auto max-w-xl text-gray-400 text-sm">
          Whether it’s a blog, documentation, help center, or legal document...
        </p>
        <button
          onClick={() =>
            router.push(isAuthenticated ? "/chat" : "/auth/signup")
          }
          className="cursor-pointer mt-8 inline-block rounded-full px-8 py-3 font-semibold text-black bg-white hover:bg-gray-200 transition ring-1 ring-white/20 shadow-lg"
        >
          {isAuthenticated ? "Go to Chat →" : "Start Now →"}
        </button>
      </header>

      {/* 🔸 SECTION LINKS */}
      <div id="features">
        <FeatureSection />
      </div>
      <div id="howitworks">
        <HowItWorks />
      </div>
      <div id="pricing">
        <PricingSection />
      </div>
      <div id="faq">
        <FAQSection />
      </div>

      <TestimonialGrid />

      {/* 🔻 FOOTER */}
      <footer className="mt-24 border-t border-white/10 py-8 text-center text-xs text-gray-400">
        © {new Date().getFullYear()} RagChatAI &bull; Built with ❤️
      </footer>
    </div>
  );
}
