"use client";
import { useEffect, useState } from "react";

const Badge = ({ label, color }) => (
  <span style={{ padding: "3px 10px", borderRadius: "20px", fontSize: "11px", fontWeight: 600, background: `${color}20`, color, border: `1px solid ${color}40` }}>{label}</span>
);

export default function PetOwnersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const fetchUsers = async () => {
    setLoading(true);
    const res = await fetch("/api/admin/users");
    const data = await res.json();
    setUsers((data || []).filter(u => u.role === "PET_OWNER"));
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

  return (
    <div style={{ padding: "32px", maxWidth: "1400px", margin: "0 auto" }}>
      <div style={{ marginBottom: "28px" }}>
        <h2 style={{ color: "#f1f5f9", fontSize: "24px", fontWeight: 700, margin: 0 }}>Pet Owners</h2>
        <p style={{ color: "#6b7280", fontSize: "14px", marginTop: "4px" }}>Manage all registered pet owners on the platform</p>
      </div>

      <div style={{ display: "flex", gap: "12px", marginBottom: "24px", flexWrap: "wrap" }}>
        {[
          { label: "Total", value: users.length, color: "#06b6d4" },
          { label: "Approved", value: users.filter(u => u.isApproved).length, color: "#4ade80" },
          { label: "Pending", value: users.filter(u => !u.isApproved).length, color: "#fbbf24" },
        ].map(s => (
          <div key={s.label} style={{ background: "rgba(255,255,255,0.03)", border: `1px solid ${s.color}30`, borderRadius: "12px", padding: "14px 20px", flex: 1, minWidth: "120px" }}>
            <div style={{ color: "#6b7280", fontSize: "11px", fontWeight: 600, textTransform: "uppercase" }}>{s.label}</div>
            <div style={{ color: s.color, fontSize: "26px", fontWeight: 700, marginTop: "4px" }}>{s.value}</div>
          </div>
        ))}
      </div>

      <input value={search} onChange={e => setSearch(e.target.value)} placeholder="🔍  Search pet owners..."
        style={{ width: "100%", maxWidth: "400px", padding: "10px 16px", borderRadius: "10px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "#e2e8f0", fontSize: "14px", outline: "none", marginBottom: "24px", boxSizing: "border-box" }}
      />

      <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "16px", overflow: "hidden" }}>
        {loading ? (
          <div style={{ padding: "48px", textAlign: "center", color: "#4b5563" }}>⏳ Loading...</div>
        ) : filtered.length === 0 ? (
          <div style={{ padding: "48px", textAlign: "center", color: "#4b5563" }}><div style={{ fontSize: "32px" }}>🐾</div> No pet owners found</div>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "rgba(255,255,255,0.04)", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
                {["Name", "Email", "Phone", "City", "Status", "Joined", "Actions"].map(h => (
                  <th key={h} style={{ padding: "14px 16px", textAlign: "left", color: "#6b7280", fontSize: "11px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(u => (
                <tr key={u._id} style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}
                  onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.025)"}
                  onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                >
                  <td style={{ padding: "14px 16px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <div style={{ width: "34px", height: "34px", borderRadius: "50%", background: "rgba(6,182,212,0.15)", border: "1px solid rgba(6,182,212,0.3)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "14px" }}>🐾</div>
                      <span style={{ color: "#f1f5f9", fontSize: "13px", fontWeight: 600 }}>{u.fullName}</span>
                    </div>
                  </td>
                  <td style={{ padding: "14px 16px", color: "#9ca3af", fontSize: "13px" }}>{u.email}</td>
                  <td style={{ padding: "14px 16px", color: "#9ca3af", fontSize: "13px" }}>{u.phone || "—"}</td>
                  <td style={{ padding: "14px 16px", color: "#9ca3af", fontSize: "13px" }}>{u.city || "—"}</td>
                  <td style={{ padding: "14px 16px" }}><Badge label={u.isApproved ? "Approved" : "Pending"} color={u.isApproved ? "#4ade80" : "#fbbf24"} /></td>
                  <td style={{ padding: "14px 16px", color: "#6b7280", fontSize: "12px" }}>{new Date(u.createdAt).toLocaleDateString("en-IN")}</td>
                  <td style={{ padding: "14px 16px" }}>
                    <div style={{ display: "flex", gap: "6px" }}>
                      {!u.isApproved && (
                        <button onClick={() => doAction(u._id, "approve")} style={{ padding: "5px 12px", borderRadius: "8px", fontSize: "12px", fontWeight: 600, background: "rgba(34,197,94,0.15)", color: "#4ade80", border: "1px solid rgba(34,197,94,0.3)", cursor: "pointer" }}>✓ Approve</button>
                      )}
                      {u.isApproved && (
                        <button onClick={() => doAction(u._id, "reject")} style={{ padding: "5px 12px", borderRadius: "8px", fontSize: "12px", fontWeight: 600, background: "rgba(239,68,68,0.12)", color: "#f87171", border: "1px solid rgba(239,68,68,0.25)", cursor: "pointer" }}>✕ Revoke</button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
