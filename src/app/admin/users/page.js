"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const ROLE_COLORS = {
  ADMIN: "#ef4444",
  VET: "#8b5cf6",
  PET_OWNER: "#06b6d4",
  FARM_OWNER: "#10b981",
  RETAILER: "#f97316",
  GROOMING: "#ec4899",
};

const Badge = ({ label, color }) => (
  <span style={{
    padding: "3px 10px", borderRadius: "20px", fontSize: "11px", fontWeight: 600,
    background: `${color}20`, color, border: `1px solid ${color}40`, letterSpacing: "0.04em"
  }}>{label}</span>
);

const ApproveBtn = ({ id, currentStatus, refresh }) => {
  const [loading, setLoading] = useState(false);

  const doAction = async (action) => {
    setLoading(true);
    await fetch(`/api/admin/users/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action }),
    });
    refresh();
    setLoading(false);
  };

  return (
    <div style={{ display: "flex", gap: "6px" }}>
      {(currentStatus !== "Approved") && (
        <button disabled={loading} onClick={() => doAction("approve")} style={{
          padding: "5px 12px", borderRadius: "8px", fontSize: "12px", fontWeight: 600,
          background: "rgba(34,197,94,0.15)", color: "#4ade80", border: "1px solid rgba(34,197,94,0.3)",
          cursor: "pointer", transition: "all 0.2s",
        }}
          onMouseEnter={e => e.currentTarget.style.background = "rgba(34,197,94,0.25)"}
          onMouseLeave={e => e.currentTarget.style.background = "rgba(34,197,94,0.15)"}
        >✓ Approve</button>
      )}
      {(currentStatus !== "Rejected") && (
        <button disabled={loading} onClick={() => doAction("reject")} style={{
          padding: "5px 12px", borderRadius: "8px", fontSize: "12px", fontWeight: 600,
          background: "rgba(239,68,68,0.12)", color: "#f87171", border: "1px solid rgba(239,68,68,0.25)",
          cursor: "pointer", transition: "all 0.2s",
        }}
          onMouseEnter={e => e.currentTarget.style.background = "rgba(239,68,68,0.22)"}
          onMouseLeave={e => e.currentTarget.style.background = "rgba(239,68,68,0.12)"}
        >✕ Reject</button>
      )}
    </div>
  );
};

export default function UsersPage() {
  const router = useRouter();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("ALL");
  const [statusFilter, setStatusFilter] = useState("ALL");

  const fetchUsers = async () => {
    setLoading(true);
    const res = await fetch("/api/admin/users");
    const data = await res.json();
    setUsers(data);
    setLoading(false);
  };

  useEffect(() => { fetchUsers(); }, []);

  const filtered = users.filter(u => {
    const matchRole = roleFilter === "ALL" || u.role === roleFilter;
    const matchStatus = statusFilter === "ALL" ||
      (statusFilter === "APPROVED" && u.isApproved === true) ||
      (statusFilter === "REJECTED" && u.isApproved === false) ||
      (statusFilter === "PENDING" && u.isApproved === null);
    const matchSearch = !search || u.fullName?.toLowerCase().includes(search.toLowerCase()) || u.email?.toLowerCase().includes(search.toLowerCase());
    return matchRole && matchStatus && matchSearch;
  });

  return (
    <div style={{ padding: "32px", maxWidth: "1400px", margin: "0 auto" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "28px", flexWrap: "wrap", gap: "16px" }}>
        <div>
          <h2 style={{ color: "#f1f5f9", fontSize: "24px", fontWeight: 700, margin: 0 }}>All Users</h2>
          <p style={{ color: "#6b7280", fontSize: "14px", marginTop: "4px" }}>Manage all registered platform users</p>
        </div>
        <div style={{ color: "#6b7280", fontSize: "14px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", padding: "8px 16px", borderRadius: "10px" }}>
          Total: <strong style={{ color: "#f1f5f9" }}>{users.length}</strong>
        </div>
      </div>

      {/* Filters */}
      <div style={{ display: "flex", gap: "12px", marginBottom: "24px", flexWrap: "wrap" }}>
        <input
          value={search} onChange={e => setSearch(e.target.value)}
          placeholder="🔍  Search by name or email..."
          style={{
            flex: 1, minWidth: "200px", padding: "10px 16px", borderRadius: "10px",
            background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)",
            color: "#e2e8f0", fontSize: "14px", outline: "none",
          }}
        />
        <select value={roleFilter} onChange={e => setRoleFilter(e.target.value)} style={{
          padding: "10px 16px", borderRadius: "10px", background: "rgba(255,255,255,0.05)",
          border: "1px solid rgba(255,255,255,0.1)", color: "#e2e8f0", fontSize: "14px", cursor: "pointer"
        }}>
          <option value="ALL">All Roles</option>
          <option value="VET">Veterinarian</option>
          <option value="PET_OWNER">Pet Owner</option>
          <option value="FARM_OWNER">Farm Owner</option>
          <option value="RETAILER">Retailer</option>
          <option value="GROOMING">Grooming</option>
          <option value="ADMIN">Admin</option>
        </select>
        <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} style={{
          padding: "10px 16px", borderRadius: "10px", background: "rgba(255,255,255,0.05)",
          border: "1px solid rgba(255,255,255,0.1)", color: "#e2e8f0", fontSize: "14px", cursor: "pointer"
        }}>
          <option value="ALL">All Status</option>
          <option value="APPROVED">Approved</option>
          <option value="REJECTED">Rejected</option>
          <option value="PENDING">Pending</option>
        </select>
      </div>

      {/* Table */}
      <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "16px", overflow: "hidden" }}>
        {loading ? (
          <div style={{ padding: "48px", textAlign: "center", color: "#4b5563" }}>
            <div style={{ fontSize: "24px", marginBottom: "8px" }}>⏳</div> Loading users...
          </div>
        ) : filtered.length === 0 ? (
          <div style={{ padding: "48px", textAlign: "center", color: "#4b5563" }}>
            <div style={{ fontSize: "32px", marginBottom: "8px" }}>🔍</div> No users found
          </div>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "rgba(255,255,255,0.04)", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
                {["#", "Name", "Email", "Phone", "Role", "Status", "Joined", "Actions"].map(h => (
                  <th key={h} style={{ padding: "14px 16px", textAlign: "left", color: "#6b7280", fontSize: "11px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((u, i) => {
                const status = u.isApproved === true ? "Approved" : u.isApproved === false ? "Rejected" : "Pending";
                const statusColor = status === "Approved" ? "#4ade80" : status === "Rejected" ? "#f87171" : "#fbbf24";
                return (
                  <tr key={u._id} style={{ borderBottom: "1px solid rgba(255,255,255,0.04)", transition: "background 0.2s" }}
                    onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.025)"}
                    onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                  >
                    <td style={{ padding: "14px 16px", color: "#4b5563", fontSize: "13px" }}>{i + 1}</td>
                    <td style={{ padding: "14px 16px" }}>
                      <button onClick={() => router.push(`/admin/users/${u._id}`)} style={{ background: "none", border: "none", padding: 0, cursor: "pointer", color: "#93c5fd", fontSize: "14px", fontWeight: 600, textDecoration: "none" }}>
                        {u.fullName}
                      </button>
                    </td>
                    <td style={{ padding: "14px 16px", color: "#9ca3af", fontSize: "13px" }}>{u.email}</td>
                    <td style={{ padding: "14px 16px", color: "#9ca3af", fontSize: "13px" }}>{u.phone || "—"}</td>
                    <td style={{ padding: "14px 16px" }}><Badge label={u.role} color={ROLE_COLORS[u.role] || "#6b7280"} /></td>
                    <td style={{ padding: "14px 16px" }}><Badge label={status} color={statusColor} /></td>
                    <td style={{ padding: "14px 16px", color: "#6b7280", fontSize: "12px" }}>{new Date(u.createdAt).toLocaleDateString("en-IN")}</td>
                    <td style={{ padding: "14px 16px" }}>
                      {u.role !== "ADMIN" && <ApproveBtn id={u._id} currentStatus={status} refresh={fetchUsers} />}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
