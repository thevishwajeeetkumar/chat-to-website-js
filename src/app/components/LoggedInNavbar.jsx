"use client";

import { useRouter } from "next/navigation";

export default function LoggedInNavbar() {
  const router = useRouter();

  const handleLogout = () => {
    document.cookie = "accessToken=; Max-Age=0; path=/;";
    router.push("/");
  };

  return (
    <nav className="flex justify-between items-center px-6 py-4 bg-[#0F172A] border-b border-white/10 text-white">
      <div
        className="text-xl font-bold text-blue-400 cursor-pointer"
        onClick={() => router.push("/dashboard")}
      >
        RagChatAI
      </div>
      <div className="flex space-x-6 text-sm">
        <button onClick={() => router.push("/dashboard")} className="hover:text-blue-400">
          Dashboard
        </button>
        <button onClick={() => router.push("/feedback")} className="hover:text-blue-400">
          Feedback
        </button>
        <button onClick={() => router.push("/profile")} className="hover:text-blue-400">
          Profile
        </button>
        <button onClick={handleLogout} className="hover:text-red-400">
          Logout
        </button>
      </div>
    </nav>
  );
}
