"use client";
import React, { useState, useEffect } from "react";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

export default function GroomingAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAppointments();
  }, []);

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
    } catch (err) {
      alert("Error updating status");
    }
  };

  if (loading) return <div className="p-8 text-gray-500">Loading appointments...</div>;

  return (
    <div className="p-8">
      <h1 className="text-3xl font-extrabold text-purple-950 mb-2">Manage Appointments</h1>
      <p className="text-gray-500 mb-8">View and manage your grooming shop bookings.</p>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {appointments.length === 0 ? (
          <p className="text-gray-500 text-center py-10">No appointments found.</p>
        ) : (
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
                {appointments.map((app) => (
                  <tr key={app._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <p className="font-bold text-gray-900">{app.petName} <span className="text-xs text-gray-500 font-normal">({app.petType})</span></p>
                      <p className="text-gray-600 text-xs mt-1">{app.ownerName}</p>
                      <p className="text-gray-500 text-xs">{app.ownerPhone}</p>
                    </td>
                    <td className="px-6 py-4 text-gray-700 font-semibold">
                      {new Date(app.dateTime).toLocaleDateString()}
                      <p className="text-gray-500 font-normal text-xs">{app.timeSlot}</p>
                    </td>
                    <td className="px-6 py-4 text-gray-600 text-xs">
                      {app.coatCondition && <p><span className="font-semibold">Coat:</span> {app.coatCondition}</p>}
                      {app.groomingInstructions && <p className="mt-1 line-clamp-2" title={app.groomingInstructions}><span className="font-semibold">Notes:</span> {app.groomingInstructions}</p>}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                        app.status === "REQUESTED" ? "bg-yellow-100 text-yellow-700" :
                        app.status === "CONFIRMED" ? "bg-blue-100 text-blue-700" :
                        app.status === "COMPLETED" ? "bg-green-100 text-green-700" :
                        "bg-red-100 text-red-700"
                      }`}>
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
                        <button onClick={() => updateStatus(app._id, "COMPLETED")} className="text-xs px-3 py-1.5 bg-green-500 hover:bg-green-600 text-white font-bold rounded-lg transition-colors">
                          Mark Done
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
