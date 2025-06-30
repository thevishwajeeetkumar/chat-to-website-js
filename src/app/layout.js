// src/app/layout.js

import Providers from "./components/Providers"; // ✅ Ensure this path is correct
import "./globals.css";
import Navbar from "./components/Navbar";

export const metadata = {
  title: "RagChat",
  description: "Chat with the content of any URL using RAG",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-[#0A0F1A] text-white">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
