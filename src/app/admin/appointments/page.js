"use client";
import { useEffect, useState } from "react";

const statusStyles = {
  REQUESTED: { color: "#fbbf24", label: "Requested" },
  CONFIRMED: { color: "#3b82f6", label: "Confirmed" },
  COMPLETED: { color: "#4ade80", label: "Completed" },
  CANCELLED: { color: "#f87171", label: "Cancelled" },
};

const visitTypeIcon = { CLINIC: "🏥", HOME: "🏠", TELE: "💻" };

const Badge = ({ label, color }) => (
  <span style={{ padding: "3px 10px", borderRadius: "20px", fontSize: "11px", fontWeight: 600, background: `${color}20`, color, border: `1px solid ${color}40` }}>{label}</span>
);

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");

  useEffect(() => {
    fetch("/api/admin/appointments")
      .then(r => r.json())
      .then(data => { setAppointments(data.appointments || []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const filtered = appointments.filter(a => {
    const matchStatus = statusFilter === "ALL" || a.status === statusFilter;
    const matchSearch = !search ||
      a.clientId?.fullName?.toLowerCase().includes(search.toLowerCase()) ||
      a.doctorId?.fullName?.toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchSearch;
  });

  const counts = {
    ALL: appointments.length,
    REQUESTED: appointments.filter(a => a.status === "REQUESTED").length,
    CONFIRMED: appointments.filter(a => a.status === "CONFIRMED").length,
    COMPLETED: appointments.filter(a => a.status === "COMPLETED").length,
    CANCELLED: appointments.filter(a => a.status === "CANCELLED").length,
  };

  return (
    <div style={{ padding: "32px", maxWidth: "1400px", margin: "0 auto" }}>
      <div style={{ marginBottom: "28px" }}>
        <h2 style={{ color: "#f1f5f9", fontSize: "24px", fontWeight: 700, margin: 0 }}>Appointments</h2>
        <p style={{ color: "#6b7280", fontSize: "14px", marginTop: "4px" }}>Monitor all pet & farm appointments across the platform</p>
      </div>

      {/* Stats */}
      <div style={{ display: "flex", gap: "12px", marginBottom: "24px", flexWrap: "wrap" }}>
        {Object.entries(statusStyles).map(([key, { color, label }]) => (
          <div key={key} style={{ background: "rgba(255,255,255,0.03)", border: `1px solid ${color}30`, borderRadius: "12px", padding: "14px 20px", flex: 1, minWidth: "120px" }}>
            <div style={{ color: "#6b7280", fontSize: "11px", fontWeight: 600, textTransform: "uppercase" }}>{label}</div>
            <div style={{ color, fontSize: "26px", fontWeight: 700, marginTop: "4px" }}>{counts[key]}</div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div style={{ display: "flex", gap: "10px", marginBottom: "24px", flexWrap: "wrap" }}>
        {["ALL", "REQUESTED", "CONFIRMED", "COMPLETED", "CANCELLED"].map(s => {
          const active = statusFilter === s;
          const color = s === "ALL" ? "#3b82f6" : statusStyles[s]?.color || "#6b7280";
          return (
            <button key={s} onClick={() => setStatusFilter(s)} style={{
              padding: "8px 16px", borderRadius: "10px", fontSize: "12px", fontWeight: 600,
              background: active ? `${color}20` : "rgba(255,255,255,0.04)",
              border: active ? `1px solid ${color}50` : "1px solid rgba(255,255,255,0.08)",
              color: active ? color : "#6b7280", cursor: "pointer",
            }}>
              {s} <span style={{ background: "rgba(255,255,255,0.1)", borderRadius: "10px", padding: "1px 7px", marginLeft: "4px", fontSize: "11px" }}>{counts[s] ?? 0}</span>
            </button>
          );
        })}
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="🔍  Search client or doctor..."
          style={{ marginLeft: "auto", padding: "8px 16px", borderRadius: "10px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "#e2e8f0", fontSize: "13px", outline: "none", minWidth: "220px" }}
        />
      </div>

      {/* Table */}
      <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "16px", overflow: "hidden" }}>
        {loading ? (
          <div style={{ padding: "48px", textAlign: "center", color: "#4b5563" }}>⏳ Loading appointments...</div>
        ) : filtered.length === 0 ? (
          <div style={{ padding: "48px", textAlign: "center", color: "#4b5563" }}><div style={{ fontSize: "32px" }}>📅</div> No appointments found</div>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "rgba(255,255,255,0.04)", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
                {["Client", "Doctor", "Animal", "Type", "Date & Time", "Fee", "Status"].map(h => (
                  <th key={h} style={{ padding: "14px 16px", textAlign: "left", color: "#6b7280", fontSize: "11px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(a => {
                const s = statusStyles[a.status] || { color: "#6b7280", label: a.status };
                return (
                  <tr key={a._id} style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}
                    onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.025)"}
                    onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                  >
                    <td style={{ padding: "14px 16px" }}>
                      <div style={{ color: "#f1f5f9", fontSize: "13px", fontWeight: 500 }}>{a.clientId?.fullName || "—"}</div>
                      <div style={{ color: "#6b7280", fontSize: "11px" }}>{a.clientId?.role}</div>
                    </td>
                    <td style={{ padding: "14px 16px", color: "#9ca3af", fontSize: "13px" }}>{a.doctorId?.clinicName || a.doctorId?.userId?.fullName || "—"}</td>
                    <td style={{ padding: "14px 16px" }}>
                      <div style={{ color: "#d1d5db", fontSize: "13px" }}>{a.animalId?.animalName || "—"}</div>
                      <div style={{ color: "#6b7280", fontSize: "11px" }}>{a.animalId?.species}</div>
                    </td>
                    <td style={{ padding: "14px 16px", fontSize: "18px" }}>{visitTypeIcon[a.visitType] || "—"} <span style={{ color: "#9ca3af", fontSize: "11px" }}>{a.visitType}</span></td>
                    <td style={{ padding: "14px 16px", color: "#9ca3af", fontSize: "12px" }}>
                      {a.dateTime ? new Date(a.dateTime).toLocaleString("en-IN", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" }) : "—"}
                    </td>
                    <td style={{ padding: "14px 16px", color: "#fbbf24", fontSize: "13px", fontWeight: 600 }}>
                      {a.consultationFee ? `₹${a.consultationFee}` : a.fee ? `₹${a.fee}` : "—"}
                    </td>
                    <td style={{ padding: "14px 16px" }}><Badge label={s.label} color={s.color} /></td>
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
