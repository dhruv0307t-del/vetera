"use client";
import { useEffect, useState } from "react";

const Badge = ({ label, color }) => (
  <span style={{ padding: "3px 10px", borderRadius: "20px", fontSize: "11px", fontWeight: 600, background: `${color}20`, color, border: `1px solid ${color}40` }}>{label}</span>
);

export default function EarningsPage() {
  const [earnings, setEarnings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("ALL");

  useEffect(() => {
    fetch("/api/admin/earnings")
      .then(r => r.json())
      .then(data => { setEarnings(data.earnings || []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const statusColors = { PENDING: "#fbbf24", PAID: "#4ade80", WITHDRAWN: "#8b5cf6" };
  const typeColors = { CONSULTATION: "#3b82f6", HOME_VISIT: "#10b981", TELE: "#f97316" };

  const filtered = filter === "ALL" ? earnings : earnings.filter(e => e.status === filter);
  const totalRevenue = earnings.reduce((sum, e) => sum + (e.amount || 0), 0);
  const paidRevenue = earnings.filter(e => e.status === "PAID").reduce((sum, e) => sum + (e.amount || 0), 0);

  return (
    <div style={{ padding: "32px", maxWidth: "1400px", margin: "0 auto" }}>
      <div style={{ marginBottom: "28px" }}>
        <h2 style={{ color: "#f1f5f9", fontSize: "24px", fontWeight: 700, margin: 0 }}>Earnings & Revenue</h2>
        <p style={{ color: "#6b7280", fontSize: "14px", marginTop: "4px" }}>Track all vet earnings and platform revenue</p>
      </div>

      {/* Revenue Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px", marginBottom: "28px" }}>
        {[
          { label: "Total Revenue", value: `₹${totalRevenue.toLocaleString()}`, color: "#fbbf24", icon: "💰" },
          { label: "Paid Out", value: `₹${paidRevenue.toLocaleString()}`, color: "#4ade80", icon: "✅" },
          { label: "Pending Payout", value: `₹${(totalRevenue - paidRevenue).toLocaleString()}`, color: "#f87171", icon: "⏳" },
          { label: "Total Transactions", value: earnings.length, color: "#8b5cf6", icon: "📊" },
        ].map(s => (
          <div key={s.label} style={{ background: "rgba(255,255,255,0.03)", border: `1px solid ${s.color}30`, borderRadius: "16px", padding: "24px" }}>
            <div style={{ fontSize: "28px", marginBottom: "8px" }}>{s.icon}</div>
            <div style={{ color: "#6b7280", fontSize: "11px", fontWeight: 600, textTransform: "uppercase" }}>{s.label}</div>
            <div style={{ color: s.color, fontSize: "28px", fontWeight: 700, marginTop: "4px" }}>{s.value}</div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div style={{ display: "flex", gap: "8px", marginBottom: "24px" }}>
        {["ALL", "PENDING", "PAID", "WITHDRAWN"].map(f => {
          const active = filter === f;
          const color = f === "ALL" ? "#fbbf24" : statusColors[f] || "#6b7280";
          return (
            <button key={f} onClick={() => setFilter(f)} style={{
              padding: "8px 16px", borderRadius: "10px", fontSize: "12px", fontWeight: 600,
              background: active ? `${color}20` : "rgba(255,255,255,0.04)",
              border: active ? `1px solid ${color}50` : "1px solid rgba(255,255,255,0.08)",
              color: active ? color : "#6b7280", cursor: "pointer",
            }}>{f}</button>
          );
        })}
      </div>

      {/* Table */}
      <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "16px", overflow: "hidden" }}>
        {loading ? (
          <div style={{ padding: "48px", textAlign: "center", color: "#4b5563" }}>⏳ Loading earnings...</div>
        ) : filtered.length === 0 ? (
          <div style={{ padding: "48px", textAlign: "center", color: "#4b5563" }}>
            <div style={{ fontSize: "48px", marginBottom: "12px" }}>💰</div>
            <div>No earnings records found</div>
          </div>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "rgba(255,255,255,0.04)", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
                {["Doctor", "Amount", "Type", "Status", "Paid At", "Date"].map(h => (
                  <th key={h} style={{ padding: "14px 16px", textAlign: "left", color: "#6b7280", fontSize: "11px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(e => (
                <tr key={e._id} style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}
                  onMouseEnter={el => el.currentTarget.style.background = "rgba(255,255,255,0.025)"}
                  onMouseLeave={el => el.currentTarget.style.background = "transparent"}
                >
                  <td style={{ padding: "14px 16px", color: "#f1f5f9", fontSize: "13px" }}>
                    {e.doctorId?.userId?.fullName || e.doctorId?.clinicName || "—"}
                  </td>
                  <td style={{ padding: "14px 16px", color: "#fbbf24", fontSize: "15px", fontWeight: 700 }}>₹{e.amount?.toLocaleString()}</td>
                  <td style={{ padding: "14px 16px" }}><Badge label={e.type} color={typeColors[e.type] || "#6b7280"} /></td>
                  <td style={{ padding: "14px 16px" }}><Badge label={e.status} color={statusColors[e.status] || "#6b7280"} /></td>
                  <td style={{ padding: "14px 16px", color: "#9ca3af", fontSize: "12px" }}>{e.paidAt ? new Date(e.paidAt).toLocaleDateString("en-IN") : "—"}</td>
                  <td style={{ padding: "14px 16px", color: "#6b7280", fontSize: "12px" }}>{new Date(e.createdAt).toLocaleDateString("en-IN")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
