"use client";
import { useEffect, useState } from "react";

const Badge = ({ label, color }) => (
  <span style={{ padding: "3px 10px", borderRadius: "20px", fontSize: "11px", fontWeight: 600, background: `${color}20`, color, border: `1px solid ${color}40` }}>{label}</span>
);

export default function RetailersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const fetchUsers = async () => {
    setLoading(true);
    const res = await fetch("/api/admin/users");
    const data = await res.json();
    setUsers((data || []).filter(u => u.role === "RETAILER" || u.role === "GROOMING"));
    setLoading(false);
  };

  useEffect(() => { fetchUsers(); }, []);

  const filtered = users.filter(u =>
    !search || u.fullName?.toLowerCase().includes(search.toLowerCase()) || u.email?.toLowerCase().includes(search.toLowerCase())
  );

  const doAction = async (id, action) => {
    await fetch(`/api/admin/users/${id}`, {
      method: "PATCH", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action }),
    });
    fetchUsers();
  };

  const roleColors = { RETAILER: "#f97316", GROOMING: "#ec4899" };

  return (
    <div style={{ padding: "32px", maxWidth: "1400px", margin: "0 auto" }}>
      <div style={{ marginBottom: "28px" }}>
        <h2 style={{ color: "#f1f5f9", fontSize: "24px", fontWeight: 700, margin: 0 }}>Retailers & Shop Owners</h2>
        <p style={{ color: "#6b7280", fontSize: "14px", marginTop: "4px" }}>Manage retailers and grooming shop registrations</p>
      </div>

      <div style={{ display: "flex", gap: "12px", marginBottom: "24px", flexWrap: "wrap" }}>
        {[
          { label: "Total", value: users.length, color: "#f97316" },
          { label: "Retailers", value: users.filter(u => u.role === "RETAILER").length, color: "#f97316" },
          { label: "Grooming", value: users.filter(u => u.role === "GROOMING").length, color: "#ec4899" },
          { label: "Pending", value: users.filter(u => !u.isApproved).length, color: "#fbbf24" },
        ].map(s => (
          <div key={s.label} style={{ background: "rgba(255,255,255,0.03)", border: `1px solid ${s.color}30`, borderRadius: "12px", padding: "14px 20px", flex: 1, minWidth: "110px" }}>
            <div style={{ color: "#6b7280", fontSize: "11px", fontWeight: 600, textTransform: "uppercase" }}>{s.label}</div>
            <div style={{ color: s.color, fontSize: "26px", fontWeight: 700, marginTop: "4px" }}>{s.value}</div>
          </div>
        ))}
      </div>

      <input value={search} onChange={e => setSearch(e.target.value)} placeholder="🔍  Search retailers..."
        style={{ width: "100%", maxWidth: "400px", padding: "10px 16px", borderRadius: "10px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "#e2e8f0", fontSize: "14px", outline: "none", marginBottom: "24px", boxSizing: "border-box" }}
      />

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "16px" }}>
        {loading ? (
          <div style={{ padding: "48px", textAlign: "center", color: "#4b5563", gridColumn: "1/-1" }}>⏳ Loading...</div>
        ) : filtered.length === 0 ? (
          <div style={{ padding: "48px", textAlign: "center", color: "#4b5563", gridColumn: "1/-1" }}><div style={{ fontSize: "32px" }}>🏪</div> No retailers found</div>
        ) : filtered.map(u => {
          const color = roleColors[u.role] || "#6b7280";
          return (
            <div key={u._id} style={{
              background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: "16px", padding: "24px", transition: "all 0.2s",
              position: "relative", overflow: "hidden"
            }}>
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "3px", background: `linear-gradient(90deg, ${color}, ${color}40)` }} />

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <div style={{ width: "40px", height: "40px", borderRadius: "10px", background: `${color}15`, border: `1px solid ${color}30`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px" }}>
                    {u.role === "GROOMING" ? "✂️" : "🏪"}
                  </div>
                  <div>
                    <div style={{ color: "#f1f5f9", fontSize: "14px", fontWeight: 600 }}>{u.fullName}</div>
                    <div style={{ color: "#6b7280", fontSize: "12px" }}>{u.email}</div>
                  </div>
                </div>
                <Badge label={u.role} color={color} />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", marginBottom: "16px" }}>
                {[["📞 Phone", u.phone || "—"], ["📍 City", u.city || "—"], ["🗺 State", u.state || "—"], ["📮 PIN", u.pinCode || "—"]].map(([k, v]) => (
                  <div key={k} style={{ background: "rgba(255,255,255,0.03)", borderRadius: "8px", padding: "8px 10px" }}>
                    <div style={{ color: "#4b5563", fontSize: "10px", fontWeight: 600 }}>{k}</div>
                    <div style={{ color: "#d1d5db", fontSize: "12px", marginTop: "2px" }}>{v}</div>
                  </div>
                ))}
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Badge label={u.isApproved ? "Approved" : "Pending"} color={u.isApproved ? "#4ade80" : "#fbbf24"} />
                <div style={{ display: "flex", gap: "6px" }}>
                  {!u.isApproved && (
                    <button onClick={() => doAction(u._id, "approve")} style={{ padding: "6px 14px", borderRadius: "8px", fontSize: "12px", fontWeight: 600, background: "rgba(34,197,94,0.15)", color: "#4ade80", border: "1px solid rgba(34,197,94,0.3)", cursor: "pointer" }}>✓ Approve</button>
                  )}
                  {u.isApproved && (
                    <button onClick={() => doAction(u._id, "reject")} style={{ padding: "6px 14px", borderRadius: "8px", fontSize: "12px", fontWeight: 600, background: "rgba(239,68,68,0.12)", color: "#f87171", border: "1px solid rgba(239,68,68,0.25)", cursor: "pointer" }}>✕ Revoke</button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
