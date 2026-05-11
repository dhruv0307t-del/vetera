"use client";
import { useEffect, useState } from "react";

const Badge = ({ label, color }) => (
  <span style={{ padding: "3px 10px", borderRadius: "20px", fontSize: "11px", fontWeight: 600, background: `${color}20`, color, border: `1px solid ${color}40` }}>{label}</span>
);

export default function GroomingPage() {
  const [shops, setShops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("ALL");
  const [selectedShop, setSelectedShop] = useState(null);

  const fetchShops = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/grooming-shops");
      const data = await res.json();
      if (data.success) setShops(data.data || data.shops || []);
    } catch {
      setShops([]);
    }
    setLoading(false);
  };

  useEffect(() => { fetchShops(); }, []);

  const doAction = async (id, action) => {
    // action is "approve" or "reject"
    await fetch(`/api/admin/users/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action }),
    }).catch(() => {});
    if (selectedShop && selectedShop._id === id) {
       setSelectedShop(prev => ({ ...prev, isApproved: action === "approve" ? true : false }));
    }
    fetchShops();
  };

  const filtered = shops.filter(s => {
    const isPending = s.isApproved === false || s.isApproved === null;
    const matchFilter = filter === "ALL" || (filter === "APPROVED" && s.isApproved === true) || (filter === "PENDING" && isPending);
    const matchSearch = !search || s.fullName?.toLowerCase().includes(search.toLowerCase()) || s.email?.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  return (
    <div style={{ padding: "32px", maxWidth: "1400px", margin: "0 auto" }}>
      <div style={{ marginBottom: "28px" }}>
        <h2 style={{ color: "#f1f5f9", fontSize: "24px", fontWeight: 700, margin: 0 }}>Grooming Shops</h2>
        <p style={{ color: "#6b7280", fontSize: "14px", marginTop: "4px" }}>Review and manage pet grooming shop registrations</p>
      </div>

      {/* Stats */}
      <div style={{ display: "flex", gap: "12px", marginBottom: "24px", flexWrap: "wrap" }}>
        {[
          { label: "Total Shops", value: shops.length, color: "#f97316" },
          { label: "Approved", value: shops.filter(s => s.isApproved === true).length, color: "#4ade80" },
          { label: "Pending Review", value: shops.filter(s => s.isApproved === false || s.isApproved === null).length, color: "#fbbf24" },
        ].map(s => (
          <div key={s.label} style={{ background: "rgba(255,255,255,0.03)", border: `1px solid ${s.color}30`, borderRadius: "12px", padding: "16px 24px", flex: 1, minWidth: "140px" }}>
            <div style={{ color: "#6b7280", fontSize: "11px", fontWeight: 600, textTransform: "uppercase" }}>{s.label}</div>
            <div style={{ color: s.color, fontSize: "28px", fontWeight: 700, marginTop: "4px" }}>{s.value}</div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div style={{ display: "flex", gap: "10px", marginBottom: "24px", flexWrap: "wrap" }}>
        {["ALL", "APPROVED", "PENDING"].map(f => {
          const active = filter === f;
          const color = f === "APPROVED" ? "#4ade80" : f === "PENDING" ? "#fbbf24" : "#f97316";
          return (
            <button key={f} onClick={() => setFilter(f)} style={{
              padding: "8px 16px", borderRadius: "10px", fontSize: "12px", fontWeight: 600,
              background: active ? `${color}20` : "rgba(255,255,255,0.04)",
              border: active ? `1px solid ${color}50` : "1px solid rgba(255,255,255,0.08)",
              color: active ? color : "#6b7280", cursor: "pointer",
            }}>{f}</button>
          );
        })}
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="🔍  Search shops..."
          style={{ marginLeft: "auto", padding: "8px 16px", borderRadius: "10px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "#e2e8f0", fontSize: "13px", outline: "none", minWidth: "220px" }}
        />
      </div>

      {/* Content */}
      {loading ? (
        <div style={{ textAlign: "center", padding: "60px", color: "#4b5563" }}>⏳ Loading shops...</div>
      ) : filtered.length === 0 ? (
        <div style={{
          textAlign: "center", padding: "80px 32px",
          background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "16px"
        }}>
          <div style={{ fontSize: "64px", marginBottom: "16px" }}>✂️</div>
          <div style={{ color: "#6b7280", fontSize: "18px", fontWeight: 600 }}>No Grooming Shops Yet</div>
          <div style={{ color: "#4b5563", fontSize: "14px", marginTop: "8px" }}>Grooming shop registrations will appear here for review</div>
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "16px" }}>
          {filtered.map(shop => (
            <div key={shop._id} style={{
              background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: "16px", padding: "24px", transition: "all 0.2s", cursor: "pointer"
            }}
            onClick={() => setSelectedShop(shop)}
            onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(249,115,22,0.3)"; e.currentTarget.style.background = "rgba(255,255,255,0.05)"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)"; e.currentTarget.style.background = "rgba(255,255,255,0.03)"; }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <div style={{ width: "44px", height: "44px", borderRadius: "12px", background: "rgba(249,115,22,0.15)", border: "1px solid rgba(249,115,22,0.3)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px" }}>✂️</div>
                  <div>
                    <div style={{ color: "#f1f5f9", fontSize: "15px", fontWeight: 600 }}>{shop.fullName}</div>
                    <div style={{ color: "#6b7280", fontSize: "12px" }}>{shop.city || "No location"}</div>
                  </div>
                </div>
                <Badge label={shop.isApproved ? "Approved" : "Pending"} color={shop.isApproved ? "#4ade80" : "#fbbf24"} />
              </div>
              <div style={{ color: "#9ca3af", fontSize: "13px", marginBottom: "16px" }}>Email: {shop.email || "—"}</div>
              <div style={{ display: "flex", gap: "8px" }}>
                {(!shop.isApproved) && (
                  <button onClick={(e) => { e.stopPropagation(); doAction(shop._id, "approve"); }} style={{ flex: 1, padding: "10px", borderRadius: "10px", fontSize: "13px", fontWeight: 600, background: "rgba(34,197,94,0.15)", color: "#4ade80", border: "1px solid rgba(34,197,94,0.3)", cursor: "pointer" }}>✓ Approve</button>
                )}
                {(shop.isApproved !== false) && (
                  <button onClick={(e) => { e.stopPropagation(); doAction(shop._id, "reject"); }} style={{ flex: 1, padding: "10px", borderRadius: "10px", fontSize: "13px", fontWeight: 600, background: "rgba(239,68,68,0.12)", color: "#f87171", border: "1px solid rgba(239,68,68,0.25)", cursor: "pointer" }}>✕ Reject</button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {selectedShop && (
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
                <h3 style={{ color: "#f1f5f9", fontSize: "20px", fontWeight: 700, margin: 0 }}>Review: {selectedShop.fullName}</h3>
                <p style={{ color: "#6b7280", fontSize: "13px", marginTop: "4px" }}>{selectedShop.email} · {selectedShop.phone}</p>
              </div>
              <button onClick={() => setSelectedShop(null)} style={{
                background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)",
                borderRadius: "8px", padding: "8px 12px", color: "#9ca3af", cursor: "pointer", fontSize: "16px"
              }}>✕</button>
            </div>

            {/* Details */}
            <div style={{ background: "rgba(255,255,255,0.03)", borderRadius: "12px", padding: "16px", marginBottom: "24px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                {[
                  ["Full Name", selectedShop.fullName || "—"],
                  ["Email", selectedShop.email || "—"],
                  ["Phone", selectedShop.phone || "—"],
                  ["Role", selectedShop.role || "—"],
                  ["City", selectedShop.city || "—"],
                  ["Address", selectedShop.address || "—"],
                ].map(([k, v]) => (
                  <div key={k}>
                    <div style={{ color: "#4b5563", fontSize: "11px", fontWeight: 600, textTransform: "uppercase" }}>{k}</div>
                    <div style={{ color: "#d1d5db", fontSize: "13px", marginTop: "2px", wordBreak: "break-word" }}>{v}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div style={{ display: "flex", gap: "12px" }}>
              {(!selectedShop.isApproved) && (
                  <button onClick={() => doAction(selectedShop._id, "approve")} style={{
                    flex: 1, padding: "14px", borderRadius: "12px", fontSize: "14px", fontWeight: 700,
                    background: "linear-gradient(135deg, #059669, #10b981)", color: "#fff", border: "none",
                    cursor: "pointer", transition: "opacity 0.2s"
                  }}>✅ Approve Shop</button>
              )}
              {(selectedShop.isApproved !== false) && (
                  <button onClick={() => doAction(selectedShop._id, "reject")} style={{
                    flex: 1, padding: "14px", borderRadius: "12px", fontSize: "14px", fontWeight: 700,
                    background: "linear-gradient(135deg, #dc2626, #ef4444)", color: "#fff", border: "none",
                    cursor: "pointer", transition: "opacity 0.2s"
                  }}>❌ Reject Shop</button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
