"use client";
import React, { useState, useEffect } from "react";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const STATUS_TABS = ["ALL", "REQUESTED", "CONFIRMED", "COMPLETED", "CANCELLED"];

const statusConfig = {
  REQUESTED: "bg-yellow-100 text-yellow-700",
  CONFIRMED: "bg-blue-100 text-blue-700",
  COMPLETED: "bg-green-100 text-green-700",
  CANCELLED: "bg-red-100 text-red-700",
};

export default function GroomingAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [tab, setTab] = useState("ALL");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAppointments();
  }, []);

  useEffect(() => {
    setFiltered(
      tab === "ALL"
        ? appointments
        : appointments.filter(a => a.status === tab)
    );
  }, [tab, appointments]);

  const fetchAppointments = async () => {
    try {
      const res = await fetch("/api/grooming-dashboard/appointments");
      const data = await res.json();
      if (data.success) {
        setAppointments(data.data);
      }
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const updateStatus = async (id, status) => {
    try {
      const res = await fetch(`/api/grooming-dashboard/appointments/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status })
      });
      const data = await res.json();
      if (data.success) {
        setAppointments(appointments.map(a => a._id === id ? { ...a, status } : a));
      } else {
        alert("Failed to update status");
      }
    } catch {
      alert("Error updating status");
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-purple-950">Manage Appointments</h1>
        <p className="text-gray-500 mt-1 text-sm sm:text-base">
          View and manage your grooming shop bookings.
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
                ? "bg-pink-500 text-white"
                : "bg-white border text-slate-600 hover:bg-slate-50"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="text-center py-20 text-gray-400 animate-pulse text-sm">
          Loading appointments...
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl border text-gray-400 text-sm">
          No appointments found.
        </div>
      ) : (
        <>
          {/* ── MOBILE CARDS (< md) ── */}
          <div className="space-y-4 md:hidden">
            {filtered.map(app => (
              <div
                key={app._id}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4"
              >
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div>
                    <p className="font-bold text-gray-900 text-sm">
                      {app.petName}{" "}
                      <span className="text-xs text-gray-500 font-normal">({app.petType})</span>
                    </p>
                    <p className="text-gray-600 text-xs mt-0.5">{app.ownerName}</p>
                    <p className="text-gray-400 text-xs">{app.ownerPhone}</p>
                  </div>
                  <span className={`px-2.5 py-1 rounded-full text-xs font-bold uppercase shrink-0 ${statusConfig[app.status] || "bg-gray-100 text-gray-700"}`}>
                    {app.status}
                  </span>
                </div>

                <div className="text-xs text-gray-600 mb-3 space-y-0.5">
                  <p>
                    <span className="font-semibold">Date: </span>
                    {new Date(app.dateTime).toLocaleDateString()} {app.timeSlot && `· ${app.timeSlot}`}
                  </p>
                  {app.coatCondition && (
                    <p><span className="font-semibold">Coat: </span>{app.coatCondition}</p>
                  )}
                  {app.groomingInstructions && (
                    <p className="line-clamp-2">
                      <span className="font-semibold">Notes: </span>{app.groomingInstructions}
                    </p>
                  )}
                </div>

                {app.status === "REQUESTED" && (
                  <div className="flex gap-2">
                    <button
                      onClick={() => updateStatus(app._id, "CONFIRMED")}
                      className="flex items-center gap-1.5 px-3 py-2 bg-blue-600 text-white text-xs font-bold rounded-xl hover:bg-blue-700 transition"
                    >
                      <FaCheckCircle /> Confirm
                    </button>
                    <button
                      onClick={() => updateStatus(app._id, "CANCELLED")}
                      className="flex items-center gap-1.5 px-3 py-2 bg-red-500 text-white text-xs font-bold rounded-xl hover:bg-red-600 transition"
                    >
                      <FaTimesCircle /> Cancel
                    </button>
                  </div>
                )}
                {app.status === "CONFIRMED" && (
                  <button
                    onClick={() => updateStatus(app._id, "COMPLETED")}
                    className="px-3 py-2 bg-green-500 hover:bg-green-600 text-white text-xs font-bold rounded-xl transition"
                  >
                    Mark Done
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* ── DESKTOP TABLE (≥ md) ── */}
          <div className="hidden md:block bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-gray-50 text-gray-600 border-b border-gray-100">
                  <tr>
                    <th className="px-6 py-4 font-semibold">Pet & Owner</th>
                    <th className="px-6 py-4 font-semibold">Date & Time</th>
                    <th className="px-6 py-4 font-semibold">Details</th>
                    <th className="px-6 py-4 font-semibold">Status</th>
                    <th className="px-6 py-4 font-semibold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filtered.map(app => (
                    <tr key={app._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <p className="font-bold text-gray-900">
                          {app.petName}{" "}
                          <span className="text-xs text-gray-500 font-normal">({app.petType})</span>
                        </p>
                        <p className="text-gray-600 text-xs mt-1">{app.ownerName}</p>
                        <p className="text-gray-500 text-xs">{app.ownerPhone}</p>
                      </td>
                      <td className="px-6 py-4 text-gray-700 font-semibold">
                        {new Date(app.dateTime).toLocaleDateString()}
                        <p className="text-gray-500 font-normal text-xs">{app.timeSlot}</p>
                      </td>
                      <td className="px-6 py-4 text-gray-600 text-xs">
                        {app.coatCondition && <p><span className="font-semibold">Coat:</span> {app.coatCondition}</p>}
                        {app.groomingInstructions && (
                          <p className="mt-1 line-clamp-2" title={app.groomingInstructions}>
                            <span className="font-semibold">Notes:</span> {app.groomingInstructions}
                          </p>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${statusConfig[app.status] || "bg-gray-100 text-gray-700"}`}>
                          {app.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        {app.status === "REQUESTED" && (
                          <div className="flex justify-end gap-2">
                            <button onClick={() => updateStatus(app._id, "CONFIRMED")} className="text-blue-600 hover:text-blue-800" title="Confirm">
                              <FaCheckCircle size={18} />
                            </button>
                            <button onClick={() => updateStatus(app._id, "CANCELLED")} className="text-red-500 hover:text-red-700" title="Cancel">
                              <FaTimesCircle size={18} />
                            </button>
                          </div>
                        )}
                        {app.status === "CONFIRMED" && (
                          <button
                            onClick={() => updateStatus(app._id, "COMPLETED")}
                            className="text-xs px-3 py-1.5 bg-green-500 hover:bg-green-600 text-white font-bold rounded-lg transition"
                          >
                            Mark Done
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
