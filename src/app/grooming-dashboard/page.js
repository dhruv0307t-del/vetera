"use client";
import { useEffect, useState } from "react";
import { FaCalendarCheck, FaMoneyBillWave, FaCut, FaStar } from "react-icons/fa";

export default function GroomingDashboardHome() {
  const [stats, setStats] = useState({
    appointments: 0,
    completed: 0,
    revenue: 0,
    rating: 0
  });
  const [recentAppointments, setRecentAppointments] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/grooming-dashboard/stats");
        const data = await res.json();
        if (data.success) {
          setStats(data.stats || { appointments: 0, completed: 0, revenue: 0, rating: 0 });
          setRecentAppointments(data.recent || []);
        }
      } catch (e) {
        console.error("Failed to fetch grooming stats", e);
      }
    }
    fetchData();
  }, []);

  const statCards = [
    {
      label: "Bookings Today",
      value: stats.appointments,
      icon: FaCalendarCheck,
      bg: "bg-blue-50",
      text: "text-blue-500",
    },
    {
      label: "Revenue",
      value: `₹${stats.revenue}`,
      icon: FaMoneyBillWave,
      bg: "bg-emerald-50",
      text: "text-emerald-500",
    },
    {
      label: "Completed (Week)",
      value: stats.completed,
      icon: FaCut,
      bg: "bg-purple-50",
      text: "text-purple-500",
    },
    {
      label: "Shop Rating",
      value: stats.rating || "—",
      icon: FaStar,
      bg: "bg-amber-50",
      text: "text-amber-500",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-6 sm:space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-800">Shop Overview</h1>
        <p className="text-slate-500 mt-1 text-sm sm:text-base">
          Here is the performance of your grooming shop today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {statCards.map(({ label, value, icon: Icon, bg, text }) => (
          <div key={label} className="bg-white p-4 sm:p-6 rounded-2xl shadow-sm border border-slate-100">
            <div className="flex items-start gap-3 sm:gap-4">
              <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl ${bg} ${text} flex items-center justify-center text-lg sm:text-xl shrink-0`}>
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
        {/* Recent Appointments */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="p-5 sm:p-6 border-b border-slate-100 flex justify-between items-center">
            <h2 className="text-base sm:text-lg font-bold text-slate-800">Recent Appointments</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
                <tr>
                  <th className="px-5 sm:px-6 py-4">Pet & Owner</th>
                  <th className="px-5 sm:px-6 py-4">Time</th>
                  <th className="px-5 sm:px-6 py-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {recentAppointments.length === 0 ? (
                  <tr>
                    <td colSpan="3" className="px-6 py-8 text-center text-slate-400 text-sm">
                      No appointments yet.
                    </td>
                  </tr>
                ) : (
                  recentAppointments.map(app => (
                    <tr key={app._id} className="hover:bg-slate-50">
                      <td className="px-5 sm:px-6 py-4 font-bold text-slate-800 text-xs sm:text-sm">
                        {app.petName || "—"}
                        <p className="text-slate-400 font-normal text-xs">{app.ownerName}</p>
                      </td>
                      <td className="px-5 sm:px-6 py-4 text-slate-600 text-xs sm:text-sm">
                        {new Date(app.dateTime).toLocaleString()}
                      </td>
                      <td className="px-5 sm:px-6 py-4">
                        <span className={`px-2 py-1 rounded-md text-[10px] font-black uppercase ${
                          app.status === "COMPLETED"
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-pink-100 text-pink-700"
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

        {/* Top Services */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5 sm:p-6">
          <h2 className="text-base sm:text-lg font-bold text-slate-800 mb-5">Top Services</h2>
          <div className="space-y-4">
            <p className="text-sm text-slate-400 italic">
              Data will appear here once you have more bookings.
            </p>
            <div>
              <div className="flex justify-between text-sm font-bold mb-1">
                <span className="text-slate-700">Service Data</span>
                <span className="text-slate-400">0%</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2">
                <div className="bg-slate-300 h-2 rounded-full" style={{ width: "0%" }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
