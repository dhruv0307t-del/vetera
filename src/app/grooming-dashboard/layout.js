"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import {
  FaHome, FaCalendarCheck, FaUsers, FaCut, FaBoxOpen,
  FaChartBar, FaStar, FaMoneyCheckAlt, FaSignOutAlt, FaBars, FaTimes, FaClipboardList
} from "react-icons/fa";

const navItems = [
  { icon: FaHome, label: "Dashboard", href: "/grooming-dashboard" },
  { icon: FaCalendarCheck, label: "Bookings", href: "/grooming-dashboard/bookings" },
  { icon: FaClipboardList, label: "Appointments", href: "/grooming-dashboard/appointments" },
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
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Close sidebar on route change (mobile)
  useEffect(() => {
    setSidebarOpen(false);
  }, [pathname]);

  // Prevent body scroll when sidebar open on mobile
  useEffect(() => {
    if (sidebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [sidebarOpen]);

  const SidebarContent = () => (
    <>
      {/* Logo */}
      <div className="p-5 border-b border-slate-700 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-pink-500 flex items-center justify-center shrink-0">
            <FaCut className="text-white text-lg" />
          </div>
          <div>
            <p className="font-black text-white text-lg tracking-tight leading-none">VetEra</p>
            <p className="text-xs text-pink-300 font-bold uppercase mt-0.5">Grooming Shop</p>
          </div>
        </div>
        {/* Close btn - only visible on mobile */}
        <button
          className="lg:hidden text-slate-400 hover:text-white p-1 rounded-lg"
          onClick={() => setSidebarOpen(false)}
          aria-label="Close sidebar"
        >
          <FaTimes className="text-lg" />
        </button>
      </div>

      {/* Nav */}
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
              <Icon className={`text-lg shrink-0 ${active ? "scale-110" : ""}`} />
              {label}
            </Link>
          );
        })}
      </nav>

      {/* Sign Out */}
      <div className="p-4 border-t border-slate-700">
        <button
          onClick={async () => { await fetch("/api/logout", { method: "POST" }); window.location.href = "/login"; }}
          className="flex items-center gap-3 text-sm text-rose-400/80 hover:text-rose-400 w-full px-4 py-3 rounded-xl hover:bg-rose-500/10 transition"
        >
          <FaSignOutAlt />
          Sign Out
        </button>
      </div>
    </>
  );

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans">
      {/* ── DESKTOP SIDEBAR (always visible ≥ lg) ── */}
      <aside className="hidden lg:flex fixed left-0 top-0 h-full w-64 bg-[#1e293b] text-white flex-col z-50 shadow-2xl">
        <SidebarContent />
      </aside>

      {/* ── MOBILE SIDEBAR OVERLAY ── */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ── MOBILE SIDEBAR DRAWER ── */}
      <aside
        className={`fixed left-0 top-0 h-full w-72 bg-[#1e293b] text-white flex flex-col z-50 shadow-2xl transition-transform duration-300 ease-in-out lg:hidden ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <SidebarContent />
      </aside>

      {/* ── MAIN CONTENT ── */}
      <main className="flex-1 min-h-screen flex flex-col lg:ml-64">
        {/* Sticky Header */}
        <header className="h-16 bg-white border-b border-slate-200 sticky top-0 z-30 flex items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            {/* Hamburger — mobile only */}
            <button
              className="lg:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100 transition"
              onClick={() => setSidebarOpen(true)}
              aria-label="Open sidebar"
            >
              <FaBars className="text-xl" />
            </button>
            <h1 className="text-base sm:text-xl font-bold text-slate-800 truncate">
              Shop Management System
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-bold text-slate-800">Grooming Manager</p>
              <p className="text-xs text-emerald-500 font-bold">● Online</p>
            </div>
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-pink-100 flex items-center justify-center font-black text-pink-600 text-sm shrink-0">
              GM
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="p-4 sm:p-6 lg:p-8 flex-1">
          {children}
        </div>
      </main>
    </div>
  );
}
