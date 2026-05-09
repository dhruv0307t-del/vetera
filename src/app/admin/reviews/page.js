"use client";
import { useEffect, useState } from "react";

const StarRating = ({ rating }) => (
  <div style={{ display: "flex", gap: "2px" }}>
    {[1, 2, 3, 4, 5].map(star => (
      <span key={star} style={{ color: star <= rating ? "#fbbf24" : "#374151", fontSize: "14px" }}>★</span>
    ))}
  </div>
);

export default function ReviewsPage() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [ratingFilter, setRatingFilter] = useState(0);

  useEffect(() => {
    fetch("/api/reviews")
      .then(r => r.json())
      .then(data => { setReviews(data.reviews || data || []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Delete this review?")) return;
    await fetch(`/api/admin/reviews/${id}`, { method: "DELETE" }).catch(() => {});
    setReviews(prev => prev.filter(r => r._id !== id));
  };

  const filtered = ratingFilter === 0 ? reviews : reviews.filter(r => r.rating === ratingFilter);
  const avgRating = reviews.length ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1) : 0;

  return (
    <div style={{ padding: "32px", maxWidth: "1400px", margin: "0 auto" }}>
      <div style={{ marginBottom: "28px" }}>
        <h2 style={{ color: "#f1f5f9", fontSize: "24px", fontWeight: 700, margin: 0 }}>Reviews & Ratings</h2>
        <p style={{ color: "#6b7280", fontSize: "14px", marginTop: "4px" }}>Monitor all user reviews for veterinarians</p>
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "16px", marginBottom: "28px" }}>
        {[
          { label: "Total Reviews", value: reviews.length, color: "#ec4899", icon: "⭐" },
          { label: "Avg Rating", value: avgRating, color: "#fbbf24", icon: "📊" },
          { label: "5 Star", value: reviews.filter(r => r.rating === 5).length, color: "#4ade80", icon: "🌟" },
          { label: "Low Ratings (≤2)", value: reviews.filter(r => r.rating <= 2).length, color: "#f87171", icon: "⚠️" },
        ].map(s => (
          <div key={s.label} style={{ background: "rgba(255,255,255,0.03)", border: `1px solid ${s.color}30`, borderRadius: "16px", padding: "20px" }}>
            <div style={{ fontSize: "24px", marginBottom: "6px" }}>{s.icon}</div>
            <div style={{ color: "#6b7280", fontSize: "11px", fontWeight: 600, textTransform: "uppercase" }}>{s.label}</div>
            <div style={{ color: s.color, fontSize: "28px", fontWeight: 700, marginTop: "4px" }}>{s.value}</div>
          </div>
        ))}
      </div>

      {/* Rating Filter */}
      <div style={{ display: "flex", gap: "8px", marginBottom: "24px", alignItems: "center" }}>
        <span style={{ color: "#6b7280", fontSize: "13px" }}>Filter by rating:</span>
        {[0, 5, 4, 3, 2, 1].map(r => {
          const active = ratingFilter === r;
          return (
            <button key={r} onClick={() => setRatingFilter(r)} style={{
              padding: "7px 14px", borderRadius: "10px", fontSize: "12px", fontWeight: 600,
              background: active ? "rgba(251,191,36,0.2)" : "rgba(255,255,255,0.04)",
              border: active ? "1px solid rgba(251,191,36,0.5)" : "1px solid rgba(255,255,255,0.08)",
              color: active ? "#fbbf24" : "#6b7280", cursor: "pointer",
            }}>
              {r === 0 ? "All" : `${"★".repeat(r)}`}
            </button>
          );
        })}
      </div>

      {/* Reviews Grid */}
      {loading ? (
        <div style={{ textAlign: "center", padding: "60px", color: "#4b5563" }}>⏳ Loading reviews...</div>
      ) : filtered.length === 0 ? (
        <div style={{ textAlign: "center", padding: "80px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "16px" }}>
          <div style={{ fontSize: "48px", marginBottom: "12px" }}>⭐</div>
          <div style={{ color: "#6b7280", fontSize: "16px" }}>No reviews found</div>
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "16px" }}>
          {filtered.map(r => (
            <div key={r._id} style={{
              background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: "16px", padding: "20px", position: "relative"
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <div style={{ width: "38px", height: "38px", borderRadius: "10px", background: "rgba(236,72,153,0.15)", border: "1px solid rgba(236,72,153,0.3)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "16px" }}>👤</div>
                  <div>
                    <div style={{ color: "#f1f5f9", fontSize: "13px", fontWeight: 600 }}>{r.petOwnerId?.fullName || "Anonymous"}</div>
                    <div style={{ color: "#6b7280", fontSize: "11px" }}>→ {r.doctorId?.userId?.fullName || r.doctorId?.clinicName || "Unknown Vet"}</div>
                  </div>
                </div>
                <button onClick={() => handleDelete(r._id)} style={{
                  background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)",
                  borderRadius: "8px", padding: "4px 10px", color: "#f87171", cursor: "pointer", fontSize: "12px"
                }}>🗑</button>
              </div>

              <StarRating rating={r.rating} />
              {r.comment && (
                <p style={{ color: "#9ca3af", fontSize: "13px", marginTop: "10px", lineHeight: 1.6, fontStyle: "italic" }}>
                  &quot;{r.comment}&quot;
                </p>
              )}
              <div style={{ color: "#4b5563", fontSize: "11px", marginTop: "10px" }}>
                {new Date(r.createdAt).toLocaleDateString("en-IN")}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
