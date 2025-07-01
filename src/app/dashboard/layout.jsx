// src/app/dashboard/layout.js
import LoggedInNavbar from "../components/LoggedInNavbar";

export default function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen bg-[#0F172A] text-white">
      <LoggedInNavbar />
      {children}
    </div>
  );
}
