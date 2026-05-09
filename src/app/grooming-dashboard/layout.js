"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FaHome, FaCalendarCheck, FaUsers, FaCut, FaBoxOpen, FaChartBar, FaStar, FaMoneyCheckAlt, FaSignOutAlt
} from "react-icons/fa";

const navItems = [
  { icon: FaHome, label: "Dashboard", href: "/grooming-dashboard" },
  { icon: FaCalendarCheck, label: "Bookings", href: "/grooming-dashboard/bookings" },
  { icon: FaUsers, label: "Customers", href: "/grooming-dashboard/customers" },
  { icon: FaCut, label: "Services", href: "/grooming-dashboard/services" },
  { icon: FaUsers, label: "Staff", href: "/grooming-dashboard/staff" },
  { icon: FaBoxOpen, label: "Inventory", href: "/grooming-dashboard/inventory" },
  { icon: FaChartBar, label: "Analytics", href: "/grooming-dashboard/analytics" },
  { icon: FaStar, label: "Reviews", href: "/grooming-dashboard/reviews" },
  { icon: FaMoneyCheckAlt, label: "Billing", href: "/grooming-dashboard/billing" },
];

export default function GroomingDashboardLayout({ children }) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans">
      <aside className="fixed left-0 top-0 h-full w-64 bg-[#1e293b] text-white flex flex-col z-50 shadow-2xl">
        <div className="p-6 border-b border-slate-700">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-pink-500 flex items-center justify-center">
              <FaCut className="text-white text-lg" />
            </div>
            <div>
              <p className="font-black text-white text-lg tracking-tight leading-none">VetEra</p>
              <p className="text-xs text-pink-300 font-bold uppercase mt-1">Grooming Shop</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          {navItems.map(({ icon: Icon, label, href }) => {
            const active = pathname === href || (pathname.startsWith(href) && href !== "/grooming-dashboard");
            return (
              <Link key={href} href={href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                  active
                    ? "bg-pink-500 text-white shadow-lg shadow-pink-500/30"
                    : "text-slate-400 hover:bg-slate-800 hover:text-slate-200"
                }`}
              >
                <Icon className={`text-lg ${active ? "scale-110" : ""}`} />
                {label}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-slate-700">
          <button
            onClick={async () => { await fetch("/api/logout", { method: "POST" }); window.location.href = "/login"; }}
            className="flex items-center gap-3 text-sm text-rose-400/80 hover:text-rose-400 w-full px-4 py-3 rounded-xl hover:bg-rose-500/10 transition"
          >
            <FaSignOutAlt />
            Sign Out
          </button>
        </div>
      </aside>

      <main className="ml-64 flex-1 min-h-screen flex flex-col">
        <header className="h-16 bg-white border-b border-slate-200 sticky top-0 z-40 flex items-center justify-between px-8">
          <h1 className="text-xl font-bold text-slate-800">Shop Management System</h1>
          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-bold text-slate-800">Grooming Manager</p>
              <p className="text-xs text-emerald-500 font-bold">● Online</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-500">
              GM
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
