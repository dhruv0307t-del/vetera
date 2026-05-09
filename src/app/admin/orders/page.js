"use client";
import { useState } from "react";

const orderStatuses = {
  PENDING: { color: "#fbbf24", label: "Pending" },
  PROCESSING: { color: "#3b82f6", label: "Processing" },
  SHIPPED: { color: "#8b5cf6", label: "Shipped" },
  DELIVERED: { color: "#4ade80", label: "Delivered" },
  CANCELLED: { color: "#f87171", label: "Cancelled" },
};

const Badge = ({ label, color }) => (
  <span style={{ padding: "3px 10px", borderRadius: "20px", fontSize: "11px", fontWeight: 600, background: `${color}20`, color, border: `1px solid ${color}40` }}>{label}</span>
);

const demoOrders = [
  { _id: "ORD001", customer: "Ravi Kumar", product: "Premium Dog Food (5kg)", shop: "PetMart Delhi", amount: 1299, status: "DELIVERED", date: "2026-05-01" },
  { _id: "ORD002", customer: "Priya Singh", product: "Cat Grooming Kit", shop: "Happy Paws Store", amount: 699, status: "SHIPPED", date: "2026-05-04" },
  { _id: "ORD003", customer: "Anjali Mehta", product: "Vet Prescribed Supplement", shop: "VetCare Pharmacy", amount: 450, status: "PROCESSING", date: "2026-05-06" },
  { _id: "ORD004", customer: "Suresh Nair", product: "Dog Collar + Leash Set", shop: "PetMart Delhi", amount: 349, status: "PENDING", date: "2026-05-07" },
  { _id: "ORD005", customer: "Kavya R", product: "Bird Cage Medium", shop: "Pet Palace", amount: 1850, status: "CANCELLED", date: "2026-04-30" },
  { _id: "ORD006", customer: "Mohan Das", product: "Fish Tank Starter Kit", shop: "AquaWorld", amount: 2200, status: "DELIVERED", date: "2026-04-28" },
];

export default function OrdersPage() {
  const [filter, setFilter] = useState("ALL");
  const [search, setSearch] = useState("");

  const filtered = demoOrders.filter(o => {
    const matchStatus = filter === "ALL" || o.status === filter;
    const matchSearch = !search || o.customer.toLowerCase().includes(search.toLowerCase()) || o.product.toLowerCase().includes(search.toLowerCase()) || o.shop.toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchSearch;
  });

  const totalRevenue = demoOrders.reduce((s, o) => s + o.amount, 0);
  const counts = {
    ALL: demoOrders.length,
    ...Object.keys(orderStatuses).reduce((a, s) => ({ ...a, [s]: demoOrders.filter(o => o.status === s).length }), {})
  };

  return (
    <div style={{ padding: "32px", maxWidth: "1400px", margin: "0 auto" }}>
      <div style={{ marginBottom: "28px" }}>
        <h2 style={{ color: "#f1f5f9", fontSize: "24px", fontWeight: 700, margin: 0 }}>Shop Orders</h2>
        <p style={{ color: "#6b7280", fontSize: "14px", marginTop: "4px" }}>Monitor all e-commerce orders across the platform</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "16px", marginBottom: "28px" }}>
        {[
          { label: "Total Orders", value: demoOrders.length, color: "#06b6d4", icon: "🛒" },
          { label: "Total Revenue", value: `₹${totalRevenue.toLocaleString()}`, color: "#fbbf24", icon: "💰" },
          { label: "Delivered", value: counts.DELIVERED, color: "#4ade80", icon: "✅" },
          { label: "In Progress", value: counts.PENDING + counts.PROCESSING, color: "#f97316", icon: "⏳" },
          { label: "Cancelled", value: counts.CANCELLED, color: "#f87171", icon: "❌" },
        ].map(s => (
          <div key={s.label} style={{ background: "rgba(255,255,255,0.03)", border: `1px solid ${s.color}30`, borderRadius: "16px", padding: "20px" }}>
            <div style={{ fontSize: "22px", marginBottom: "6px" }}>{s.icon}</div>
            <div style={{ color: "#6b7280", fontSize: "11px", fontWeight: 600, textTransform: "uppercase" }}>{s.label}</div>
            <div style={{ color: s.color, fontSize: "24px", fontWeight: 700, marginTop: "4px" }}>{s.value}</div>
          </div>
        ))}
      </div>

      <div style={{ display: "flex", gap: "8px", marginBottom: "24px", flexWrap: "wrap" }}>
        {["ALL", ...Object.keys(orderStatuses)].map(s => {
          const active = filter === s;
          const color = s === "ALL" ? "#06b6d4" : orderStatuses[s]?.color || "#6b7280";
          return (
            <button key={s} onClick={() => setFilter(s)} style={{
              padding: "8px 16px", borderRadius: "10px", fontSize: "12px", fontWeight: 600,
              background: active ? `${color}20` : "rgba(255,255,255,0.04)",
              border: active ? `1px solid ${color}50` : "1px solid rgba(255,255,255,0.08)",
              color: active ? color : "#6b7280", cursor: "pointer",
            }}>
              {s} <span style={{ background: "rgba(255,255,255,0.1)", borderRadius: "10px", padding: "1px 7px", marginLeft: "4px", fontSize: "11px" }}>{counts[s] ?? 0}</span>
            </button>
          );
        })}
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="🔍  Search orders..."
          style={{ marginLeft: "auto", padding: "8px 16px", borderRadius: "10px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "#e2e8f0", fontSize: "13px", outline: "none", minWidth: "220px" }}
        />
      </div>

      <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "16px", overflow: "hidden" }}>
        {filtered.length === 0 ? (
          <div style={{ padding: "48px", textAlign: "center", color: "#4b5563" }}><div style={{ fontSize: "32px" }}>🛒</div> No orders found</div>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "rgba(255,255,255,0.04)", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
                {["Order ID", "Customer", "Product", "Shop", "Amount", "Status", "Date"].map(h => (
                  <th key={h} style={{ padding: "14px 16px", textAlign: "left", color: "#6b7280", fontSize: "11px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(o => {
                const s = orderStatuses[o.status] || { color: "#6b7280", label: o.status };
                return (
                  <tr key={o._id} style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}
                    onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.025)"}
                    onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                  >
                    <td style={{ padding: "14px 16px", color: "#6b7280", fontSize: "12px", fontFamily: "monospace" }}>{o._id}</td>
                    <td style={{ padding: "14px 16px", color: "#f1f5f9", fontSize: "13px", fontWeight: 500 }}>{o.customer}</td>
                    <td style={{ padding: "14px 16px", color: "#9ca3af", fontSize: "13px" }}>{o.product}</td>
                    <td style={{ padding: "14px 16px", color: "#9ca3af", fontSize: "13px" }}>{o.shop}</td>
                    <td style={{ padding: "14px 16px", color: "#fbbf24", fontSize: "14px", fontWeight: 700 }}>₹{o.amount.toLocaleString()}</td>
                    <td style={{ padding: "14px 16px" }}><Badge label={s.label} color={s.color} /></td>
                    <td style={{ padding: "14px 16px", color: "#6b7280", fontSize: "12px" }}>{o.date}</td>
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
