"use client";
import { useEffect, useState } from "react";
import { FaBell, FaCalendarAlt, FaFileAlt, FaExclamationTriangle, FaStar, FaCheckCircle } from "react-icons/fa";
import { toast } from "react-toastify";

const typeIcon = {
  BOOKING: <FaCalendarAlt className="text-blue-500" />,
  DOCUMENT: <FaFileAlt className="text-purple-500" />,
  LICENSE: <FaExclamationTriangle className="text-red-500" />,
  REVIEW: <FaStar className="text-yellow-500" />,
  REMINDER: <FaBell className="text-orange-500" />,
  SYSTEM: <FaCheckCircle className="text-green-500" />,
};

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    fetch(`/api/vet/notifications?userId=${userId}`)
      .then(r => r.json())
      .then(d => { if (d.success) setNotifications(d.data); })
      .catch(() => toast.error("Failed to load notifications"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="p-10 text-center animate-pulse text-slate-400">Loading...</div>;

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h1 className="text-3xl font-extrabold text-slate-800 mb-2">Notifications</h1>
      <p className="text-slate-500 mb-8">Stay up to date on bookings, document status and reminders.</p>

      {notifications.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl border text-slate-400">
          <FaBell className="text-5xl mx-auto mb-4 opacity-30" />
          <p>No notifications yet. You&apos;re all caught up!</p>
        </div>
      ) : (
        <div className="space-y-3">
          {notifications.map(n => (
            <div key={n._id} className={`flex items-start gap-4 p-5 rounded-2xl border shadow-sm transition ${n.isRead ? "bg-white" : "bg-blue-50 border-blue-200"}`}>
              <div className="w-10 h-10 rounded-full bg-white border flex items-center justify-center text-lg shadow-sm flex-shrink-0">
                {typeIcon[n.type] || <FaBell />}
              </div>
              <div className="flex-1">
                <p className="font-bold text-slate-800 text-sm">{n.title}</p>
                <p className="text-slate-600 text-sm mt-0.5">{n.message}</p>
                <p className="text-xs text-slate-400 mt-2">{new Date(n.createdAt).toLocaleString()}</p>
              </div>
              {!n.isRead && <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 flex-shrink-0" />}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
