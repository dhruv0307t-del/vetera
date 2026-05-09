"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const StatCard = ({ icon, label, value, sub, color, href, trend }) => {
  const router = useRouter();
  return (
    <div
      onClick={() => href && router.push(href)}
      style={{
        background: "linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.02) 100%)",
        border: `1px solid ${color}30`,
        borderRadius: "16px",
        padding: "24px",
        cursor: href ? "pointer" : "default",
        transition: "all 0.3s ease",
        position: "relative",
        overflow: "hidden",
      }}
      onMouseEnter={e => { if (href) e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.borderColor = `${color}60`; }}
      onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.borderColor = `${color}30`; }}
    >
      {/* Glow */}
      <div style={{ position: "absolute", top: "-20px", right: "-20px", width: "100px", height: "100px", borderRadius: "50%", background: color, opacity: 0.06, filter: "blur(30px)" }} />

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <div style={{ fontSize: "28px", marginBottom: "12px" }}>{icon}</div>
          <div style={{ color: "#9ca3af", fontSize: "12px", fontWeight: 500, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "8px" }}>{label}</div>
          <div style={{ color: "#f1f5f9", fontSize: "36px", fontWeight: 700, lineHeight: 1 }}>{value ?? <span style={{ fontSize: "20px", color: "#475569" }}>—</span>}</div>
          {sub && <div style={{ color: "#6b7280", fontSize: "12px", marginTop: "8px" }}>{sub}</div>}
        </div>
        {trend !== undefined && (
          <div style={{
            padding: "6px 12px", borderRadius: "20px",
            background: trend >= 0 ? "rgba(34,197,94,0.15)" : "rgba(239,68,68,0.15)",
            color: trend >= 0 ? "#4ade80" : "#f87171",
            fontSize: "12px", fontWeight: 600
          }}>
            {trend >= 0 ? "↑" : "↓"} {Math.abs(trend)}%
          </div>
        )}
      </div>

      <div style={{ marginTop: "16px", height: "3px", borderRadius: "2px", background: `linear-gradient(90deg, ${color}, ${color}40)` }} />
    </div>
  );
};

const ActivityItem = ({ icon, text, time, color }) => (
  <div style={{ display: "flex", alignItems: "flex-start", gap: "12px", padding: "12px 0", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
    <div style={{ width: "36px", height: "36px", borderRadius: "10px", background: `${color}20`, border: `1px solid ${color}30`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "16px", flexShrink: 0 }}>{icon}</div>
    <div style={{ flex: 1 }}>
      <div style={{ color: "#e2e8f0", fontSize: "13px", fontWeight: 500 }}>{text}</div>
      <div style={{ color: "#4b5563", fontSize: "11px", marginTop: "4px" }}>{time}</div>
    </div>
  </div>
);

const QuickActionBtn = ({ icon, label, href, color }) => {
  const router = useRouter();
  return (
    <button onClick={() => router.push(href)} style={{
      display: "flex", flexDirection: "column", alignItems: "center", gap: "8px",
      padding: "20px 16px", borderRadius: "14px",
      background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)",
      cursor: "pointer", transition: "all 0.2s ease", color: "#9ca3af", fontSize: "12px",
      fontWeight: 500, minWidth: "100px",
    }}
      onMouseEnter={e => { e.currentTarget.style.background = `${color}15`; e.currentTarget.style.borderColor = `${color}40`; e.currentTarget.style.color = "#e2e8f0"; }}
      onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.03)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; e.currentTarget.style.color = "#9ca3af"; }}
    >
      <span style={{ fontSize: "24px" }}>{icon}</span>
      {label}
    </button>
  );
};

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [vets, setVets] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [statsRes, vetsRes, usersRes] = await Promise.all([
          fetch("/api/admin/stats"),
          fetch("/api/admin/verify-vet"),
          fetch("/api/admin/users"),
        ]);
        const statsData = await statsRes.json();
        const vetsData = await vetsRes.json();
        const usersData = await usersRes.json();
        setStats(statsData);
        setVets(vetsData.data || []);
        setUsers(usersData || []);
      } catch (e) { console.error(e); }
      finally { setLoading(false); }
    };
    fetchAll();
  }, []);

  const pendingVets = vets.filter(v => v.verificationStatus === "PENDING");
  const recentUsers = users.slice(0, 5);

  return (
    <div style={{ padding: "32px", maxWidth: "1400px", margin: "0 auto" }}>
      {/* Header */}
      <div style={{ marginBottom: "32px" }}>
        <h2 style={{ color: "#f1f5f9", fontSize: "28px", fontWeight: 700, margin: 0 }}>Welcome back, Admin 👋</h2>
        <p style={{ color: "#6b7280", fontSize: "14px", marginTop: "6px" }}>
          {new Date().toLocaleDateString("en-IN", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
        </p>
      </div>

      {/* Stats Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "16px", marginBottom: "32px" }}>
        <StatCard icon="👥" label="Total Users" value={stats?.totalUsers} color="#3b82f6" href="/admin/users" trend={12} />
        <StatCard icon="🩺" label="Veterinarians" value={stats?.vets} color="#8b5cf6" href="/admin/vets" trend={5} />
        <StatCard icon="🐾" label="Pet Owners" value={stats?.petOwners} color="#06b6d4" href="/admin/pet-owners" trend={18} />
        <StatCard icon="🌾" label="Farms" value={stats?.farms} color="#10b981" href="/admin/farms" />
        <StatCard icon="🐻" label="Animals" value={stats?.animals} color="#f59e0b" href="/admin/users" />
        <StatCard icon="📅" label="Appointments" value={stats?.appointments} color="#ec4899" href="/admin/appointments" trend={7} />
        <StatCard icon="⏳" label="Pending Approvals" value={stats?.pendingApprovals} color="#ef4444" href="/admin/vets" sub="Needs your attention" />
        <StatCard icon="✂️" label="Grooming Shops" value={stats?.groomingShops ?? 0} color="#f97316" href="/admin/grooming" />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px", marginBottom: "32px" }}>
        {/* Pending Vet Verifications */}
        <div style={{
          background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: "16px", padding: "24px"
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
            <h3 style={{ color: "#f1f5f9", fontSize: "16px", fontWeight: 600, margin: 0 }}>🔔 Pending Vet Verifications</h3>
            <Link href="/admin/vets" style={{ color: "#3b82f6", fontSize: "12px", fontWeight: 500 }}>View All →</Link>
          </div>
          {loading ? (
            <div style={{ color: "#4b5563", fontSize: "14px" }}>Loading...</div>
          ) : pendingVets.length === 0 ? (
            <div style={{ textAlign: "center", color: "#4b5563", padding: "24px 0" }}>
              <div style={{ fontSize: "32px", marginBottom: "8px" }}>✅</div>
              <div style={{ fontSize: "14px" }}>All vets have been reviewed!</div>
            </div>
          ) : (
            pendingVets.slice(0, 4).map(vet => (
              <ActivityItem
                key={vet._id}
                icon="🩺"
                text={`${vet.userId?.fullName || "Unknown"} — ${vet.clinicName || "No Clinic"}`}
                time={`License: ${vet.licenseNumber || "N/A"} · Exp: ${vet.experienceYears || 0} yrs`}
                color="#8b5cf6"
              />
            ))
          )}
        </div>

        {/* Recent Users */}
        <div style={{
          background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: "16px", padding: "24px"
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
            <h3 style={{ color: "#f1f5f9", fontSize: "16px", fontWeight: 600, margin: 0 }}>👤 Recently Joined Users</h3>
            <Link href="/admin/users" style={{ color: "#3b82f6", fontSize: "12px", fontWeight: 500 }}>View All →</Link>
          </div>
          {loading ? (
            <div style={{ color: "#4b5563", fontSize: "14px" }}>Loading...</div>
          ) : recentUsers.length === 0 ? (
            <div style={{ textAlign: "center", color: "#4b5563", padding: "24px 0" }}>
              <div style={{ fontSize: "14px" }}>No users yet</div>
            </div>
          ) : (
            recentUsers.map(u => (
              <ActivityItem
                key={u._id}
                icon={u.role === "VET" ? "🩺" : u.role === "PET_OWNER" ? "🐾" : u.role === "FARM_OWNER" ? "🌾" : "👤"}
                text={`${u.fullName} — ${u.role}`}
                time={`${u.email} · ${new Date(u.createdAt).toLocaleDateString()}`}
                color={u.isApproved ? "#10b981" : "#f59e0b"}
              />
            ))
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div style={{
        background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: "16px", padding: "24px"
      }}>
        <h3 style={{ color: "#f1f5f9", fontSize: "16px", fontWeight: 600, marginBottom: "20px" }}>⚡ Quick Actions</h3>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
          <QuickActionBtn icon="🩺" label="Approve Vets" href="/admin/vets" color="#8b5cf6" />
          <QuickActionBtn icon="👥" label="Manage Users" href="/admin/users" color="#3b82f6" />
          <QuickActionBtn icon="🌾" label="Review Farms" href="/admin/farms" color="#10b981" />
          <QuickActionBtn icon="📅" label="Appointments" href="/admin/appointments" color="#ec4899" />
          <QuickActionBtn icon="✂️" label="Grooming" href="/admin/grooming" color="#f97316" />
          <QuickActionBtn icon="🛒" label="Shop Orders" href="/admin/orders" color="#06b6d4" />
          <QuickActionBtn icon="💰" label="Earnings" href="/admin/earnings" color="#f59e0b" />
          <QuickActionBtn icon="⭐" label="Reviews" href="/admin/reviews" color="#ec4899" />
        </div>
      </div>
    </div>
  );
}
