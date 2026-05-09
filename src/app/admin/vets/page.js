"use client";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Badge = ({ label, color }) => (
  <span style={{
    padding: "3px 10px", borderRadius: "20px", fontSize: "11px", fontWeight: 600,
    background: `${color}20`, color, border: `1px solid ${color}40`
  }}>{label}</span>
);

const statusColor = { APPROVED: "#4ade80", REJECTED: "#f87171", PENDING: "#fbbf24" };

export default function AdminVetsPage() {
  const [vets, setVets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedVet, setSelectedVet] = useState(null);
  const [adminRemarks, setAdminRemarks] = useState("");
  const [filter, setFilter] = useState("ALL");
  const [search, setSearch] = useState("");
  const [actionLoading, setActionLoading] = useState(false);

  const fetchVets = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/verify-vet");
      const data = await res.json();
      if (data.success) setVets(data.data);
    } catch { toast.error("Failed to fetch vets"); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchVets(); }, []);

  const handleAction = async (status) => {
    setActionLoading(true);
    try {
      const res = await fetch("/api/admin/verify-vet", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ doctorId: selectedVet._id, verificationStatus: status, adminRemarks })
      });
      const data = await res.json();
      if (data.success) {
        toast.success(data.message);
        setSelectedVet(null);
        setAdminRemarks("");
        fetchVets();
      } else toast.error(data.message);
    } catch { toast.error("Error occurred."); }
    finally { setActionLoading(false); }
  };

  const filtered = vets.filter(v => {
    const matchFilter = filter === "ALL" || v.verificationStatus === filter;
    const matchSearch = !search || v.userId?.fullName?.toLowerCase().includes(search.toLowerCase()) || v.clinicName?.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  const counts = {
    ALL: vets.length,
    PENDING: vets.filter(v => v.verificationStatus === "PENDING").length,
    APPROVED: vets.filter(v => v.verificationStatus === "APPROVED").length,
    REJECTED: vets.filter(v => v.verificationStatus === "REJECTED").length,
  };

  return (
    <div style={{ padding: "32px", maxWidth: "1400px", margin: "0 auto" }}>
      {/* Header */}
      <div style={{ marginBottom: "28px" }}>
        <h2 style={{ color: "#f1f5f9", fontSize: "24px", fontWeight: 700, margin: 0 }}>Vet KYC Verification</h2>
        <p style={{ color: "#6b7280", fontSize: "14px", marginTop: "4px" }}>Review and approve veterinarian document submissions</p>
      </div>

      {/* Filter Tabs */}
      <div style={{ display: "flex", gap: "8px", marginBottom: "24px", flexWrap: "wrap" }}>
        {["ALL", "PENDING", "APPROVED", "REJECTED"].map(f => {
          const active = filter === f;
          const color = f === "PENDING" ? "#fbbf24" : f === "APPROVED" ? "#4ade80" : f === "REJECTED" ? "#f87171" : "#3b82f6";
          return (
            <button key={f} onClick={() => setFilter(f)} style={{
              padding: "8px 18px", borderRadius: "10px", fontSize: "13px", fontWeight: 600,
              background: active ? `${color}20` : "rgba(255,255,255,0.04)",
              border: active ? `1px solid ${color}50` : "1px solid rgba(255,255,255,0.08)",
              color: active ? color : "#6b7280", cursor: "pointer", transition: "all 0.2s",
            }}>
              {f} <span style={{ marginLeft: "6px", background: active ? `${color}30` : "rgba(255,255,255,0.1)", borderRadius: "10px", padding: "1px 8px", fontSize: "11px" }}>{counts[f]}</span>
            </button>
          );
        })}
        <input
          value={search} onChange={e => setSearch(e.target.value)}
          placeholder="🔍  Search vet or clinic..."
          style={{
            marginLeft: "auto", padding: "8px 16px", borderRadius: "10px",
            background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)",
            color: "#e2e8f0", fontSize: "13px", outline: "none", minWidth: "220px"
          }}
        />
      </div>

      {/* Grid */}
      {loading ? (
        <div style={{ textAlign: "center", padding: "60px", color: "#4b5563" }}>
          <div style={{ fontSize: "32px", marginBottom: "12px" }}>⏳</div> Loading veterinarians...
        </div>
      ) : filtered.length === 0 ? (
        <div style={{ textAlign: "center", padding: "60px", color: "#4b5563" }}>
          <div style={{ fontSize: "48px", marginBottom: "12px" }}>🩺</div>
          <div style={{ fontSize: "16px", fontWeight: 600, color: "#6b7280" }}>No vets found</div>
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "16px" }}>
          {filtered.map(vet => {
            const vStatus = vet.verificationStatus || "PENDING";
            const vColor = statusColor[vStatus] || "#fbbf24";
            return (
              <div key={vet._id} style={{
                background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: "16px", padding: "24px", transition: "all 0.3s ease",
                position: "relative", overflow: "hidden"
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = `${vColor}30`; e.currentTarget.style.background = "rgba(255,255,255,0.05)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)"; e.currentTarget.style.background = "rgba(255,255,255,0.03)"; }}
              >
                {/* Top glow */}
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "3px", background: `linear-gradient(90deg, ${vColor}, ${vColor}40)` }} />

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <div style={{
                      width: "44px", height: "44px", borderRadius: "12px",
                      background: "linear-gradient(135deg, #8b5cf620, #3b82f620)",
                      border: "1px solid rgba(139,92,246,0.3)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: "20px"
                    }}>🩺</div>
                    <div>
                      <div style={{ color: "#f1f5f9", fontSize: "15px", fontWeight: 600 }}>{vet.userId?.fullName || "Unknown"}</div>
                      <div style={{ color: "#6b7280", fontSize: "12px" }}>{vet.clinicName || "No Clinic"}</div>
                    </div>
                  </div>
                  <Badge label={vStatus} color={vColor} />
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", marginBottom: "16px" }}>
                  {[
                    ["📋 License", vet.licenseNumber || "—"],
                    ["⏱ Experience", `${vet.experienceYears || 0} yrs`],
                    ["📞 Phone", vet.userId?.phone || "—"],
                    ["💊 Spec.", (vet.specialization || []).join(", ") || "General"],
                  ].map(([k, v]) => (
                    <div key={k} style={{ background: "rgba(255,255,255,0.03)", borderRadius: "8px", padding: "8px 12px" }}>
                      <div style={{ color: "#4b5563", fontSize: "10px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em" }}>{k}</div>
                      <div style={{ color: "#d1d5db", fontSize: "12px", fontWeight: 500, marginTop: "2px" }}>{v}</div>
                    </div>
                  ))}
                </div>

                <button onClick={() => { setSelectedVet(vet); setAdminRemarks(vet.adminRemarks || ""); }} style={{
                  width: "100%", padding: "10px", borderRadius: "10px", fontSize: "13px", fontWeight: 600,
                  background: "rgba(139,92,246,0.15)", border: "1px solid rgba(139,92,246,0.3)",
                  color: "#a78bfa", cursor: "pointer", transition: "all 0.2s",
                }}
                  onMouseEnter={e => e.currentTarget.style.background = "rgba(139,92,246,0.25)"}
                  onMouseLeave={e => e.currentTarget.style.background = "rgba(139,92,246,0.15)"}
                >
                  📄 Review Documents
                </button>
              </div>
            );
          })}
        </div>
      )}

      {/* Modal */}
      {selectedVet && (
        <div style={{ position: "fixed", inset: 0, zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(0,0,0,0.7)", backdropFilter: "blur(4px)", padding: "16px" }}>
          <div style={{
            background: "linear-gradient(135deg, #0d1b2a, #0f2040)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "20px", padding: "32px", maxWidth: "600px", width: "100%",
            maxHeight: "90vh", overflowY: "auto",
            boxShadow: "0 25px 60px rgba(0,0,0,0.5)"
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
              <div>
                <h3 style={{ color: "#f1f5f9", fontSize: "20px", fontWeight: 700, margin: 0 }}>Review: {selectedVet.userId?.fullName}</h3>
                <p style={{ color: "#6b7280", fontSize: "13px", marginTop: "4px" }}>{selectedVet.clinicName} · License: {selectedVet.licenseNumber}</p>
              </div>
              <button onClick={() => setSelectedVet(null)} style={{
                background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)",
                borderRadius: "8px", padding: "8px 12px", color: "#9ca3af", cursor: "pointer", fontSize: "16px"
              }}>✕</button>
            </div>

            {/* Documents */}
            <div style={{ marginBottom: "24px" }}>
              <div style={{ color: "#9ca3af", fontSize: "12px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "12px" }}>📎 Submitted Documents</div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "10px" }}>
                {[
                  { label: "Degree", key: "degreeCertificate" },
                  { label: "License", key: "licenseCertificate" },
                  { label: "Government ID", key: "governmentId" },
                ].map(doc => (
                  <a key={doc.key} href={selectedVet.documents?.[doc.key] || "#"} target="_blank" rel="noreferrer" style={{
                    display: "block", padding: "16px", borderRadius: "12px",
                    background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)",
                    textAlign: "center", textDecoration: "none", transition: "all 0.2s",
                  }}
                    onMouseEnter={e => { e.currentTarget.style.background = "rgba(59,130,246,0.1)"; e.currentTarget.style.borderColor = "rgba(59,130,246,0.3)"; }}
                    onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.04)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; }}
                  >
                    <div style={{ fontSize: "24px", marginBottom: "6px" }}>📄</div>
                    <div style={{ color: "#9ca3af", fontSize: "11px", fontWeight: 600, textTransform: "uppercase" }}>{doc.label}</div>
                    <div style={{ color: selectedVet.documents?.[doc.key] ? "#3b82f6" : "#4b5563", fontSize: "11px", marginTop: "4px" }}>
                      {selectedVet.documents?.[doc.key] ? "View File →" : "Not Submitted"}
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Details */}
            <div style={{ background: "rgba(255,255,255,0.03)", borderRadius: "12px", padding: "16px", marginBottom: "24px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                {[
                  ["Qualification", selectedVet.qualification || "—"],
                  ["Reg. ID", selectedVet.registrationId || "—"],
                  ["Consult Fee", selectedVet.consultationFee ? `₹${selectedVet.consultationFee}` : "—"],
                  ["Home Visit Fee", selectedVet.homeVisitFee ? `₹${selectedVet.homeVisitFee}` : "—"],
                  ["License Expiry", selectedVet.licenseExpiry ? new Date(selectedVet.licenseExpiry).toLocaleDateString() : "—"],
                  ["Tele-consult", selectedVet.teleConsultation ? "Yes" : "No"],
                ].map(([k, v]) => (
                  <div key={k}>
                    <div style={{ color: "#4b5563", fontSize: "11px", fontWeight: 600, textTransform: "uppercase" }}>{k}</div>
                    <div style={{ color: "#d1d5db", fontSize: "13px", marginTop: "2px" }}>{v}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Remarks */}
            <div style={{ marginBottom: "24px" }}>
              <label style={{ color: "#9ca3af", fontSize: "12px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", display: "block", marginBottom: "8px" }}>💬 Admin Remarks</label>
              <textarea value={adminRemarks} onChange={e => setAdminRemarks(e.target.value)} rows={3} placeholder="Leave a note for approval or rejection reason..."
                style={{ width: "100%", padding: "12px 16px", borderRadius: "10px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "#e2e8f0", fontSize: "14px", outline: "none", resize: "vertical", boxSizing: "border-box" }}
              />
            </div>

            {/* Actions */}
            <div style={{ display: "flex", gap: "12px" }}>
              <button disabled={actionLoading} onClick={() => handleAction("APPROVED")} style={{
                flex: 1, padding: "14px", borderRadius: "12px", fontSize: "14px", fontWeight: 700,
                background: "linear-gradient(135deg, #059669, #10b981)", color: "#fff", border: "none",
                cursor: "pointer", transition: "opacity 0.2s", opacity: actionLoading ? 0.7 : 1,
              }}>✅ Approve Vet</button>
              <button disabled={actionLoading} onClick={() => handleAction("REJECTED")} style={{
                flex: 1, padding: "14px", borderRadius: "12px", fontSize: "14px", fontWeight: 700,
                background: "linear-gradient(135deg, #dc2626, #ef4444)", color: "#fff", border: "none",
                cursor: "pointer", transition: "opacity 0.2s", opacity: actionLoading ? 0.7 : 1,
              }}>❌ Reject Vet</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
