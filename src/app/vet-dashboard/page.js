"use client";
import { useEffect, useState } from "react";
import {
  FaPaw, FaStethoscope, FaExclamationTriangle, FaMoneyBillWave, FaBell
} from "react-icons/fa";

export default function VetDashboardHome() {
  const [stats, setStats] = useState({
    todayAppointments: 0,
    totalPatients: 0,
    totalEarnings: 0,
    emergencies: 0,
  });
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/vet/dashboard-stats");
        const data = await res.json();
        if (data.success) {
          setStats({
            todayAppointments: data.data.todayAppointments || 0,
            totalPatients: data.data.totalPatients || 0,
            totalEarnings: data.data.totalEarnings || 0,
            emergencies: 0,
          });
        }
      } catch (e) {
        console.error("Failed to fetch vet stats", e);
      }

      try {
        const apptRes = await fetch("/api/vet/appointments");
        const apptData = await apptRes.json();
        if (apptData.success) {
          setAppointments(apptData.data || []);
        }
      } catch (e) {
        console.error("Failed to fetch appointments", e);
      }
    }
    fetchData();
  }, []);

  const statCards = [
    {
      label: "Total Patients",
      value: stats.totalPatients,
      icon: FaPaw,
      color: "purple",
      bg: "bg-purple-50",
      text: "text-purple-500",
    },
    {
      label: "Consultations",
      value: stats.todayAppointments,
      icon: FaStethoscope,
      color: "blue",
      bg: "bg-blue-50",
      text: "text-blue-500",
    },
    {
      label: "Emergencies",
      value: stats.emergencies,
      icon: FaExclamationTriangle,
      color: "red",
      bg: "bg-red-50",
      text: "text-red-500",
      pulse: true,
    },
    {
      label: "Revenue Today",
      value: `₹${stats.totalEarnings}`,
      icon: FaMoneyBillWave,
      color: "emerald",
      bg: "bg-emerald-50",
      text: "text-emerald-500",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-6 sm:space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-800">Clinic Overview</h1>
        <p className="text-slate-500 mt-1 text-sm sm:text-base">
          Here is the performance of your veterinary clinic today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {statCards.map(({ label, value, icon: Icon, bg, text, pulse }) => (
          <div key={label} className="bg-white p-4 sm:p-6 rounded-2xl shadow-sm border border-slate-100">
            <div className="flex items-start gap-3 sm:gap-4">
              <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl ${bg} ${text} flex items-center justify-center text-lg sm:text-xl shrink-0 ${pulse ? "animate-pulse" : ""}`}>
                <Icon />
              </div>
              <div className="min-w-0">
                <p className="text-xs sm:text-sm font-bold text-slate-500 uppercase tracking-wider leading-tight">
                  {label}
                </p>
                <h3 className="text-xl sm:text-2xl font-black text-slate-800 mt-0.5">{value}</h3>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
        {/* Upcoming Appointments */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="p-5 sm:p-6 border-b border-slate-100 flex justify-between items-center">
            <h2 className="text-base sm:text-lg font-bold text-slate-800">Upcoming Appointments</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
                <tr>
                  <th className="px-5 sm:px-6 py-4">Time</th>
                  <th className="px-5 sm:px-6 py-4">Type</th>
                  <th className="px-5 sm:px-6 py-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {appointments.length === 0 ? (
                  <tr>
                    <td colSpan="3" className="px-6 py-8 text-center text-slate-400 text-sm">
                      No upcoming appointments.
                    </td>
                  </tr>
                ) : (
                  appointments.slice(0, 5).map(app => (
                    <tr key={app._id} className="hover:bg-slate-50">
                      <td className="px-5 sm:px-6 py-4 font-bold text-slate-800 text-xs sm:text-sm">
                        {new Date(app.dateTime).toLocaleString()}
                      </td>
                      <td className="px-5 sm:px-6 py-4 text-slate-600 text-xs sm:text-sm">
                        {app.appointmentType || "General Checkup"}
                      </td>
                      <td className="px-5 sm:px-6 py-4">
                        <span className={`px-2 py-1 rounded-md text-[10px] font-black uppercase ${
                          app.status === "COMPLETED"
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-blue-100 text-blue-700"
                        }`}>
                          {app.status || "Scheduled"}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5 sm:p-6 flex flex-col">
          <h2 className="text-base sm:text-lg font-bold text-slate-800 mb-5 flex items-center gap-2">
            <FaBell className="text-amber-500" /> Notifications
          </h2>
          <div className="flex-1 flex items-center justify-center">
            <p className="text-slate-400 text-sm text-center py-8">No new notifications.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
