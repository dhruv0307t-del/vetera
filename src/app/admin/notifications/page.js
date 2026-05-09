"use client";
import { useEffect, useState } from "react";

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    // Fetch existing notifications if API available
    fetch("/api/admin/notifications")
      .then(r => r.json())
      .then(d => { setNotifications(d.notifications || []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const sendNotification = async () => {
    if (!title.trim() || !message.trim()) return;
    setSending(true);
    try {
      await fetch("/api/admin/notifications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, message }),
      });
      setSent(true);
      setTitle("");
      setMessage("");
      setTimeout(() => setSent(false), 3000);
    } catch {}
    setSending(false);
  };

  const typeNotifs = [
    { icon: "🆕", label: "New User Registrations", count: 5, color: "#3b82f6", time: "2 mins ago" },
    { icon: "🩺", label: "Vet Verification Requests", count: 3, color: "#8b5cf6", time: "15 mins ago" },
    { icon: "📅", label: "Appointment Reminders", count: 8, color: "#ec4899", time: "1 hr ago" },
    { icon: "🌾", label: "Farm Approval Requests", count: 2, color: "#10b981", time: "3 hrs ago" },
    { icon: "⭐", label: "New Reviews Posted", count: 12, color: "#fbbf24", time: "5 hrs ago" },
    { icon: "🛒", label: "New Shop Orders", count: 7, color: "#06b6d4", time: "6 hrs ago" },
  ];

  return (
    <div style={{ padding: "32px", maxWidth: "1400px", margin: "0 auto" }}>
      <div style={{ marginBottom: "28px" }}>
        <h2 style={{ color: "#f1f5f9", fontSize: "24px", fontWeight: 700, margin: 0 }}>Notifications & Alerts</h2>
        <p style={{ color: "#6b7280", fontSize: "14px", marginTop: "4px" }}>Platform activity and broadcast announcements</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
        {/* Activity Summary */}
        <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "16px", padding: "24px" }}>
          <h3 style={{ color: "#f1f5f9", fontSize: "16px", fontWeight: 600, marginBottom: "20px" }}>📊 Platform Activity</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {typeNotifs.map(n => (
              <div key={n.label} style={{
                display: "flex", alignItems: "center", gap: "14px", padding: "14px 16px",
                background: "rgba(255,255,255,0.03)", borderRadius: "12px",
                border: `1px solid ${n.color}20`, transition: "all 0.2s"
              }}
                onMouseEnter={e => e.currentTarget.style.borderColor = `${n.color}40`}
                onMouseLeave={e => e.currentTarget.style.borderColor = `${n.color}20`}
              >
                <div style={{ width: "40px", height: "40px", borderRadius: "10px", background: `${n.color}15`, border: `1px solid ${n.color}30`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px", flexShrink: 0 }}>
                  {n.icon}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ color: "#e2e8f0", fontSize: "13px", fontWeight: 500 }}>{n.label}</div>
                  <div style={{ color: "#4b5563", fontSize: "11px", marginTop: "2px" }}>{n.time}</div>
                </div>
                <div style={{ background: `${n.color}20`, color: n.color, borderRadius: "20px", padding: "3px 10px", fontSize: "12px", fontWeight: 700 }}>
                  {n.count}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Broadcast Panel */}
        <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "16px", padding: "24px" }}>
          <h3 style={{ color: "#f1f5f9", fontSize: "16px", fontWeight: 600, marginBottom: "20px" }}>📢 Broadcast Announcement</h3>
          <p style={{ color: "#6b7280", fontSize: "13px", marginBottom: "20px" }}>Send a notification to all platform users</p>

          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <div>
              <label style={{ color: "#9ca3af", fontSize: "12px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", display: "block", marginBottom: "8px" }}>Title</label>
              <input
                value={title} onChange={e => setTitle(e.target.value)}
                placeholder="Notification title..."
                style={{ width: "100%", padding: "12px 16px", borderRadius: "10px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "#e2e8f0", fontSize: "14px", outline: "none", boxSizing: "border-box" }}
              />
            </div>
            <div>
              <label style={{ color: "#9ca3af", fontSize: "12px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", display: "block", marginBottom: "8px" }}>Message</label>
              <textarea
                value={message} onChange={e => setMessage(e.target.value)}
                placeholder="Write your announcement message here..."
                rows={5}
                style={{ width: "100%", padding: "12px 16px", borderRadius: "10px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "#e2e8f0", fontSize: "14px", outline: "none", resize: "vertical", boxSizing: "border-box" }}
              />
            </div>

            {sent && (
              <div style={{ padding: "12px 16px", borderRadius: "10px", background: "rgba(34,197,94,0.15)", border: "1px solid rgba(34,197,94,0.3)", color: "#4ade80", fontSize: "13px", fontWeight: 500 }}>
                ✅ Notification sent successfully to all users!
              </div>
            )}

            <button onClick={sendNotification} disabled={sending || !title || !message} style={{
              padding: "14px", borderRadius: "12px", fontSize: "14px", fontWeight: 700,
              background: sending ? "rgba(59,130,246,0.3)" : "linear-gradient(135deg, #1d4ed8, #3b82f6)",
              color: "#fff", border: "none", cursor: sending ? "not-allowed" : "pointer",
              transition: "all 0.2s", opacity: (!title || !message) ? 0.5 : 1,
            }}>
              {sending ? "⏳ Sending..." : "📢 Send to All Users"}
            </button>
          </div>

          {/* Quick Alerts */}
          <div style={{ marginTop: "24px", paddingTop: "24px", borderTop: "1px solid rgba(255,255,255,0.07)" }}>
            <div style={{ color: "#9ca3af", fontSize: "12px", fontWeight: 600, textTransform: "uppercase", marginBottom: "12px" }}>Quick Templates</div>
            {[
              "🎉 New feature launched — check it out!",
              "🔧 Scheduled maintenance on Sunday 2AM-4AM",
              "📣 Important policy update — please review",
            ].map(t => (
              <button key={t} onClick={() => setMessage(t)} style={{
                display: "block", width: "100%", textAlign: "left", padding: "10px 14px",
                borderRadius: "8px", background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.07)", color: "#9ca3af",
                fontSize: "12px", cursor: "pointer", marginBottom: "8px", transition: "all 0.2s",
              }}
                onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.07)"; e.currentTarget.style.color = "#e2e8f0"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.03)"; e.currentTarget.style.color = "#9ca3af"; }}
              >{t}</button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
