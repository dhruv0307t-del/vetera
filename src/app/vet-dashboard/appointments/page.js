"use client";
import { useEffect, useState, useCallback } from "react";
import { toast } from "react-toastify";
import { FaCheck, FaTimes, FaRedo } from "react-icons/fa";

const STATUS_TABS = ["ALL", "REQUESTED", "CONFIRMED", "COMPLETED", "CANCELLED"];

const statusConfig = {
  REQUESTED: { cls: "bg-yellow-100 text-yellow-700" },
  CONFIRMED: { cls: "bg-blue-100 text-blue-700" },
  COMPLETED: { cls: "bg-green-100 text-green-700" },
  CANCELLED: { cls: "bg-red-100 text-red-700" },
};

const statusBadge = (status) => (
  <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${statusConfig[status]?.cls || "bg-gray-100 text-gray-700"}`}>
    {status}
  </span>
);

export default function VetAppointmentsPage() {
  const [appts, setAppts] = useState([]);
  const [tab, setTab] = useState("ALL");
  const [loading, setLoading] = useState(true);

  const userId = typeof window !== "undefined" ? localStorage.getItem("userId") : null;

  const fetchAppts = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/vet/appointments?userId=${userId}&status=${tab}`);
      const d = await res.json();
      if (d.success) setAppts(d.data);
    } catch { toast.error("Failed to load appointments"); }
    finally { setLoading(false); }
  }, [userId, tab]);

  useEffect(() => { if (userId) fetchAppts(); }, [userId, fetchAppts]);

  const updateStatus = async (appointmentId, status) => {
    try {
      const res = await fetch("/api/vet/appointments", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ appointmentId, status, userId }),
      });
      const d = await res.json();
      if (d.success) { toast.success(`Appointment ${status}`); fetchAppts(); }
    } catch { toast.error("Update failed"); }
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-800">Appointments</h1>
        <p className="text-slate-500 mt-1 text-sm sm:text-base">
          Manage your incoming and past appointment requests.
        </p>
      </div>

      {/* Status Tabs — horizontally scrollable on mobile */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2 scrollbar-hide">
        {STATUS_TABS.map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition shrink-0 ${
              tab === t
                ? "bg-blue-600 text-white"
                : "bg-white border text-slate-600 hover:bg-slate-50"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Content */}
      {loading ? (
        <div className="text-center py-20 text-slate-400 animate-pulse text-sm">
          Loading appointments...
        </div>
      ) : appts.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl border text-slate-400 text-sm">
          No appointments found.
        </div>
      ) : (
        <div className="space-y-4">
          {appts.map(a => (
            <div
              key={a._id}
              className="bg-white rounded-2xl border shadow-sm p-4 sm:p-6 hover:shadow-md transition"
            >
              <div className="flex flex-col gap-4">
                {/* Info */}
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    {statusBadge(a.status)}
                    <span className="text-xs text-slate-500 font-medium">
                      {a.visitType} — {new Date(a.dateTime).toLocaleString()}
                    </span>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-800">
                    🐾 {a.animalId?.name || "Unknown Pet"} — {a.animalId?.species} ({a.animalId?.breed})
                  </h3>
                  <p className="text-sm text-slate-500 mt-1">
                    Owner: {a.clientId?.fullName} · {a.clientId?.email}
                  </p>
                  {a.symptoms?.length > 0 && (
                    <div className="flex gap-2 flex-wrap mt-2">
                      {a.symptoms.map(s => (
                        <span key={s} className="px-2 py-0.5 bg-red-50 text-red-600 rounded-full text-xs font-medium">
                          {s}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="flex flex-wrap gap-2">
                  {a.status === "REQUESTED" && (
                    <>
                      <button
                        onClick={() => updateStatus(a._id, "CONFIRMED")}
                        className="flex items-center gap-1.5 px-3 sm:px-4 py-2 bg-green-600 text-white rounded-xl text-xs sm:text-sm font-bold hover:bg-green-700 transition"
                      >
                        <FaCheck /> Accept
                      </button>
                      <button
                        onClick={() => updateStatus(a._id, "CANCELLED")}
                        className="flex items-center gap-1.5 px-3 sm:px-4 py-2 bg-red-500 text-white rounded-xl text-xs sm:text-sm font-bold hover:bg-red-600 transition"
                      >
                        <FaTimes /> Reject
                      </button>
                    </>
                  )}
                  {a.status === "CONFIRMED" && (
                    <>
                      <button
                        onClick={() => updateStatus(a._id, "COMPLETED")}
                        className="flex items-center gap-1.5 px-3 sm:px-4 py-2 bg-blue-600 text-white rounded-xl text-xs sm:text-sm font-bold hover:bg-blue-700 transition"
                      >
                        <FaCheck /> Complete
                      </button>
                      <a
                        href={`/vet-dashboard/consultation/${a._id}`}
                        className="flex items-center gap-1.5 px-3 sm:px-4 py-2 bg-purple-600 text-white rounded-xl text-xs sm:text-sm font-bold hover:bg-purple-700 transition"
                      >
                        <FaRedo /> Consult
                      </a>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
