"use client";
import { useEffect, useState } from "react";

const Badge = ({ label, color }) => (
  <span style={{ padding: "3px 10px", borderRadius: "20px", fontSize: "11px", fontWeight: 600, background: `${color}20`, color, border: `1px solid ${color}40` }}>{label}</span>
);

const ApproveBtn = ({ id, type, currentApproved, refresh }) => {
  const [loading, setLoading] = useState(false);
  const doAction = async (action) => {
    setLoading(true);
    const endpoint = type === "farm" ? `/api/admin/farms` : `/api/admin/users/${id}`;
    await fetch(type === "farm" ? `/api/admin/farms/${id}` : `/api/admin/users/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action }),
    });
    refresh();
    setLoading(false);
  };
  const status = currentApproved ? "Approved" : "Pending";
  return (
    <div style={{ display: "flex", gap: "6px" }}>
      {!currentApproved && (
        <button disabled={loading} onClick={() => doAction("approve")} style={{ padding: "5px 12px", borderRadius: "8px", fontSize: "12px", fontWeight: 600, background: "rgba(34,197,94,0.15)", color: "#4ade80", border: "1px solid rgba(34,197,94,0.3)", cursor: "pointer" }}>✓ Approve</button>
      )}
      {currentApproved && (
        <button disabled={loading} onClick={() => doAction("reject")} style={{ padding: "5px 12px", borderRadius: "8px", fontSize: "12px", fontWeight: 600, background: "rgba(239,68,68,0.12)", color: "#f87171", border: "1px solid rgba(239,68,68,0.25)", cursor: "pointer" }}>✕ Revoke</button>
      )}
    </div>
  );
};

export default function FarmsPage() {
  const [farms, setFarms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("ALL");

  const fetchFarms = async () => {
    setLoading(true);
    const res = await fetch("/api/admin/farms");
    const data = await res.json();
    if (data.success) setFarms(data.farms);
    setLoading(false);
  };

  useEffect(() => { fetchFarms(); }, []);

  const farmTypes = ["DAIRY", "POULTRY", "GOAT_SHEEP", "PIGGERY", "MIXED"];
  const farmTypeColors = { DAIRY: "#06b6d4", POULTRY: "#f59e0b", GOAT_SHEEP: "#10b981", PIGGERY: "#f97316", MIXED: "#8b5cf6" };

  const filtered = farms.filter(f => {
    const matchType = typeFilter === "ALL" || f.farmType === typeFilter;
    const matchSearch = !search || f.farmName?.toLowerCase().includes(search.toLowerCase()) || f.ownerId?.fullName?.toLowerCase().includes(search.toLowerCase());
    return matchType && matchSearch;
  });

  return (
    <div style={{ padding: "32px", maxWidth: "1400px", margin: "0 auto" }}>
      <div style={{ marginBottom: "28px" }}>
        <h2 style={{ color: "#f1f5f9", fontSize: "24px", fontWeight: 700, margin: 0 }}>Farm Management</h2>
        <p style={{ color: "#6b7280", fontSize: "14px", marginTop: "4px" }}>Review and approve registered farm operations</p>
      </div>

      {/* Stats Row */}
      <div style={{ display: "flex", gap: "12px", marginBottom: "24px", flexWrap: "wrap" }}>
        {[
          { label: "Total Farms", value: farms.length, color: "#10b981" },
          { label: "Approved", value: farms.filter(f => f.isApproved).length, color: "#4ade80" },
          { label: "Pending", value: farms.filter(f => !f.isApproved).length, color: "#fbbf24" },
        ].map(s => (
          <div key={s.label} style={{ background: "rgba(255,255,255,0.03)", border: `1px solid ${s.color}30`, borderRadius: "12px", padding: "16px 24px", flex: 1, minWidth: "140px" }}>
            <div style={{ color: "#6b7280", fontSize: "11px", fontWeight: 600, textTransform: "uppercase" }}>{s.label}</div>
            <div style={{ color: s.color, fontSize: "28px", fontWeight: 700, marginTop: "4px" }}>{s.value}</div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div style={{ display: "flex", gap: "10px", marginBottom: "24px", flexWrap: "wrap" }}>
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="🔍  Search farms or owners..."
          style={{ flex: 1, minWidth: "200px", padding: "10px 16px", borderRadius: "10px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "#e2e8f0", fontSize: "14px", outline: "none" }}
        />
        <select value={typeFilter} onChange={e => setTypeFilter(e.target.value)} style={{ padding: "10px 16px", borderRadius: "10px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "#e2e8f0", fontSize: "14px", cursor: "pointer" }}>
          <option value="ALL">All Types</option>
          {farmTypes.map(t => <option key={t} value={t}>{t}</option>)}
        </select>
      </div>

      {/* Table */}
      <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "16px", overflow: "hidden" }}>
        {loading ? (
          <div style={{ padding: "48px", textAlign: "center", color: "#4b5563" }}>⏳ Loading farms...</div>
        ) : filtered.length === 0 ? (
          <div style={{ padding: "48px", textAlign: "center", color: "#4b5563" }}><div style={{ fontSize: "32px" }}>🌾</div> No farms found</div>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "rgba(255,255,255,0.04)", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
                {["Farm Name", "Owner", "Type", "Location", "Animals", "Status", "Actions"].map(h => (
                  <th key={h} style={{ padding: "14px 16px", textAlign: "left", color: "#6b7280", fontSize: "11px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(f => (
                <tr key={f._id} style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}
                  onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.025)"}
                  onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                >
                  <td style={{ padding: "14px 16px", color: "#f1f5f9", fontSize: "14px", fontWeight: 500 }}>🌾 {f.farmName}</td>
                  <td style={{ padding: "14px 16px" }}>
                    <div style={{ color: "#e2e8f0", fontSize: "13px", fontWeight: 500 }}>{f.ownerId?.fullName || "—"}</div>
                    <div style={{ color: "#6b7280", fontSize: "11px" }}>{f.ownerId?.email}</div>
                  </td>
                  <td style={{ padding: "14px 16px" }}><Badge label={f.farmType || "—"} color={farmTypeColors[f.farmType] || "#6b7280"} /></td>
                  <td style={{ padding: "14px 16px", color: "#9ca3af", fontSize: "13px" }}>{f.location || "—"}</td>
                  <td style={{ padding: "14px 16px", color: "#9ca3af", fontSize: "13px" }}>{f.numberOfAnimals || "—"}</td>
                  <td style={{ padding: "14px 16px" }}><Badge label={f.isApproved ? "Approved" : "Pending"} color={f.isApproved ? "#4ade80" : "#fbbf24"} /></td>
                  <td style={{ padding: "14px 16px" }}>
                    <ApproveBtn id={f._id} type="farm" currentApproved={f.isApproved} refresh={fetchFarms} />
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
