"use client";
import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";

const navItems = [
  {
    group: "Overview",
    items: [
      { label: "Dashboard", href: "/admin/dashboard", icon: "📊" },
    ],
  },
  {
    group: "People",
    items: [
      { label: "All Users", href: "/admin/users", icon: "👥" },
      { label: "Veterinarians", href: "/admin/vets", icon: "🩺" },
      { label: "Pet Owners", href: "/admin/pet-owners", icon: "🐾" },
      { label: "Retailers", href: "/admin/retailers", icon: "🏪" },
    ],
  },
  {
    group: "Operations",
    items: [
      { label: "Verifications", href: "/admin/verifications", icon: "🛡️" },
      { label: "Appointments", href: "/admin/appointments", icon: "📅" },
      { label: "Farms", href: "/admin/farms", icon: "🌾" },
      { label: "Grooming Shops", href: "/admin/grooming", icon: "✂️" },
      { label: "Shop Orders", href: "/admin/orders", icon: "🛒" },
    ],
  },
  {
    group: "Finance",
    items: [
      { label: "Earnings", href: "/admin/earnings", icon: "💰" },
      { label: "Reviews", href: "/admin/reviews", icon: "⭐" },
    ],
  },
  {
    group: "Settings",
    items: [
      { label: "Notifications", href: "/admin/notifications", icon: "🔔" },
    ],
  },
];

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) setSidebarOpen(false);
      else setSidebarOpen(true);
    };
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const handleLogout = async () => {
    await fetch("/api/logout", { method: "POST" });
    router.push("/login");
  };

  const currentPage = navItems
    .flatMap((g) => g.items)
    .find((i) => i.href === pathname)?.label || "Admin Panel";

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#0f1117", fontFamily: "'Inter', sans-serif" }}>
      {/* Overlay for mobile */}
      {isMobile && sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          style={{
            position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)",
            zIndex: 40, backdropFilter: "blur(2px)"
          }}
        />
      )}

      {/* SIDEBAR */}
      <aside style={{
        position: isMobile ? "fixed" : "sticky",
        top: 0, left: 0, height: "100vh",
        width: sidebarOpen ? "260px" : "0px",
        background: "linear-gradient(180deg, #0d1b2a 0%, #0f2040 50%, #0a1628 100%)",
        borderRight: "1px solid rgba(255,255,255,0.06)",
        overflow: "hidden",
        transition: "width 0.3s ease",
        zIndex: 50,
        display: "flex",
        flexDirection: "column",
        flexShrink: 0,
      }}>
        <div style={{ minWidth: "260px", display: "flex", flexDirection: "column", height: "100%" }}>
          {/* Brand */}
          <div style={{
            padding: "28px 24px 20px",
            borderBottom: "1px solid rgba(255,255,255,0.07)",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div style={{
                width: "42px", height: "42px", borderRadius: "12px",
                background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "22px", flexShrink: 0,
                boxShadow: "0 4px 15px rgba(59,130,246,0.4)"
              }}>🐾</div>
              <div>
                <div style={{ color: "#fff", fontWeight: 700, fontSize: "16px", letterSpacing: "0.02em" }}>Vet Era</div>
                <div style={{ color: "#6b83a6", fontSize: "11px", fontWeight: 500, letterSpacing: "0.08em", textTransform: "uppercase" }}>Master Admin</div>
              </div>
            </div>
          </div>

          {/* Nav */}
          <nav style={{ flex: 1, overflowY: "auto", padding: "16px 12px", scrollbarWidth: "thin" }}>
            {navItems.map((group) => (
              <div key={group.group} style={{ marginBottom: "24px" }}>
                <div style={{
                  color: "#4a6080", fontSize: "10px", fontWeight: 700,
                  letterSpacing: "0.12em", textTransform: "uppercase",
                  padding: "0 12px", marginBottom: "8px"
                }}>{group.group}</div>
                {group.items.map((item) => {
                  const active = pathname === item.href || (item.href !== "/admin/dashboard" && pathname.startsWith(item.href));
                  return (
                    <Link key={item.href} href={item.href} onClick={() => isMobile && setSidebarOpen(false)}
                      style={{
                        display: "flex", alignItems: "center", gap: "12px",
                        padding: "10px 12px", borderRadius: "10px", marginBottom: "2px",
                        textDecoration: "none",
                        background: active ? "linear-gradient(135deg, rgba(59,130,246,0.2), rgba(139,92,246,0.15))" : "transparent",
                        border: active ? "1px solid rgba(59,130,246,0.3)" : "1px solid transparent",
                        color: active ? "#93c5fd" : "#8a9bb5",
                        fontWeight: active ? 600 : 400,
                        fontSize: "14px",
                        transition: "all 0.2s ease",
                        cursor: "pointer",
                      }}
                      onMouseEnter={e => { if (!active) { e.currentTarget.style.background = "rgba(255,255,255,0.05)"; e.currentTarget.style.color = "#c5d3e8"; } }}
                      onMouseLeave={e => { if (!active) { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#8a9bb5"; } }}
                    >
                      <span style={{ fontSize: "16px", flexShrink: 0 }}>{item.icon}</span>
                      <span>{item.label}</span>
                      {active && <div style={{ marginLeft: "auto", width: "6px", height: "6px", borderRadius: "50%", background: "#3b82f6" }} />}
                    </Link>
                  );
                })}
              </div>
            ))}
          </nav>

          {/* Logout */}
          <div style={{ padding: "16px 12px", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
            <button onClick={handleLogout} style={{
              width: "100%", display: "flex", alignItems: "center", gap: "12px",
              padding: "10px 12px", borderRadius: "10px", border: "1px solid rgba(239,68,68,0.2)",
              background: "rgba(239,68,68,0.08)", color: "#f87171", fontSize: "14px",
              fontWeight: 500, cursor: "pointer", transition: "all 0.2s ease",
            }}
              onMouseEnter={e => { e.currentTarget.style.background = "rgba(239,68,68,0.15)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "rgba(239,68,68,0.08)"; }}
            >
              <span>🚪</span> Logout
            </button>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0, overflow: "hidden" }}>
        {/* Top Bar */}
        <header style={{
          height: "64px", display: "flex", alignItems: "center",
          padding: "0 24px", gap: "16px",
          background: "rgba(15,17,23,0.95)",
          backdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          position: "sticky", top: 0, zIndex: 30,
        }}>
          <button onClick={() => setSidebarOpen(!sidebarOpen)} style={{
            background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)",
            color: "#9ca3af", cursor: "pointer", borderRadius: "8px",
            padding: "8px 10px", fontSize: "16px", transition: "all 0.2s ease",
            flexShrink: 0,
          }}>☰</button>

          <div style={{ flex: 1 }}>
            <h1 style={{ color: "#e2e8f0", fontSize: "18px", fontWeight: 600, margin: 0 }}>{currentPage}</h1>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div style={{
              width: "36px", height: "36px", borderRadius: "50%",
              background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
              display: "flex", alignItems: "center", justifyContent: "center",
              color: "#fff", fontWeight: 700, fontSize: "14px",
            }}>A</div>
            <div>
              <div style={{ color: "#e2e8f0", fontSize: "13px", fontWeight: 600 }}>Master Admin</div>
              <div style={{ color: "#6b7280", fontSize: "11px" }}>admin@vetera.com</div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main style={{
          flex: 1, overflowY: "auto", background: "#0f1117",
          minHeight: 0,
        }}>
          {children}
        </main>
      </div>
    </div>
  );
}
