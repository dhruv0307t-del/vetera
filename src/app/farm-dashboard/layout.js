"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  FaHome, FaBox, FaUserMd, FaChartLine, FaSignOutAlt, FaTractor, FaFileInvoiceDollar, FaFlask, FaUsers, FaLeaf
} from "react-icons/fa";
import { GiCow } from "react-icons/gi";

const navItems = [
  { icon: FaHome, label: "Smart Dashboard", href: "/farm-dashboard" },
  { icon: GiCow, label: "Cattle Management", href: "/farm-dashboard/cattle" },
  { icon: FaFlask, label: "Milk Intelligence", href: "/farm-dashboard/milk" },
  { icon: FaUserMd, label: "Health & Vet", href: "/farm-dashboard/health" },
  { icon: FaLeaf, label: "Feed & Nutrition", href: "/farm-dashboard/feed" },
  { icon: FaTractor, label: "Breeding & AI", href: "/farm-dashboard/breeding" },
  { icon: FaUsers, label: "Staff & Labour", href: "/farm-dashboard/staff" },
  { icon: FaFileInvoiceDollar, label: "Farm Finance", href: "/farm-dashboard/finance" },
  { icon: FaChartLine, label: "AI Insights", href: "/farm-dashboard/insights" },
];

export default function FarmDashboardLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/logout", { method: "POST" });
    window.location.href = "/login";
  };

  return (
    <div className="flex min-h-screen bg-[#0B1120] text-slate-300 font-sans selection:bg-teal-500/30">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-72 bg-[#111827]/80 backdrop-blur-xl border-r border-slate-800 flex flex-col z-50">
        <div className="p-6 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-teal-400 to-emerald-600 flex items-center justify-center shadow-lg shadow-teal-500/20">
              <GiCow className="text-white text-2xl" />
            </div>
            <div>
              <p className="font-extrabold text-white text-xl tracking-tight leading-none">VetEra ERP</p>
              <p className="text-xs text-teal-400 font-medium mt-1 uppercase tracking-wider">Smart Farm System</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-1 scrollbar-thin scrollbar-thumb-slate-800">
          {navItems.map(({ icon: Icon, label, href }) => {
            const active = pathname === href || (pathname.startsWith(href) && href !== "/farm-dashboard");
            return (
              <Link key={href} href={href}
                className={`flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-semibold transition-all duration-200 group ${
                  active
                    ? "bg-teal-500/10 text-teal-400 border border-teal-500/20 shadow-[inset_0px_0px_20px_rgba(20,184,166,0.05)]"
                    : "text-slate-400 hover:bg-slate-800/50 hover:text-slate-200"
                }`}
              >
                <Icon className={`text-lg transition-transform duration-200 ${active ? "scale-110" : "group-hover:scale-110"}`} />
                {label}
              </Link>
            );
          })}
        </nav>

        {/* AI Agent Banner */}
        <div className="p-4 m-4 rounded-xl bg-gradient-to-br from-indigo-900/40 to-purple-900/40 border border-indigo-500/20 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-20 h-20 bg-indigo-500/10 rounded-full blur-xl"></div>
          <p className="text-xs text-indigo-300 font-bold uppercase tracking-wider mb-1">Ask VetEra AI</p>
          <p className="text-sm text-slate-300 mb-3">Get predictive insights on your livestock.</p>
          <button className="w-full py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-lg transition-colors shadow-lg shadow-indigo-500/20">
            Open AI Chat
          </button>
        </div>

        <div className="p-4 border-t border-slate-800">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 text-sm text-rose-400/80 hover:text-rose-400 w-full px-4 py-3 rounded-xl hover:bg-rose-500/10 transition-colors"
          >
            <FaSignOutAlt />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="ml-72 flex-1 min-h-screen flex flex-col">
        {/* Top Header */}
        <header className="h-20 border-b border-slate-800 bg-[#111827]/80 backdrop-blur-xl sticky top-0 z-40 flex items-center justify-between px-8">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-bold text-white">Livestock Intelligence Dashboard</h1>
            <span className="px-2.5 py-1 rounded-full bg-teal-500/10 text-teal-400 text-xs font-bold border border-teal-500/20">Live</span>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 text-sm text-slate-400">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              IoT Sensors Online
            </div>
            <div className="w-px h-6 bg-slate-800"></div>
            <div className="flex items-center gap-3 cursor-pointer group">
              <div className="text-right">
                <p className="text-sm font-bold text-white group-hover:text-teal-400 transition-colors">Farm Manager</p>
                <p className="text-xs text-slate-500">Sunrise Dairy</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-teal-400 font-bold">
                SM
              </div>
            </div>
          </div>
        </header>

        <div className="p-8 flex-1">
          {children}
        </div>
      </main>
    </div>
  );
}
