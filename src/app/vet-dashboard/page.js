"use client";
import { useEffect, useState } from "react";
import {
  FaPaw, FaStethoscope, FaExclamationTriangle, FaMoneyBillWave, FaBell
} from "react-icons/fa";

const StatCard = ({ icon: Icon, label, value, sub, color = "blue" }) => {
  const colors = {
    blue: "bg-blue-50 text-blue-600",
    green: "bg-green-50 text-green-600",
    yellow: "bg-yellow-50 text-yellow-600",
    purple: "bg-purple-50 text-purple-600",
  };
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition">
      <div className="flex items-center justify-between mb-4">
        <span className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl ${colors[color]}`}>
          <Icon />
        </span>
        <span className="text-3xl font-extrabold text-slate-800">{value ?? "—"}</span>
      </div>
      <p className="text-sm font-semibold text-slate-600">{label}</p>
      {sub && <p className="text-xs text-slate-400 mt-1">{sub}</p>}
    </div>
  );
};

export default function VetDashboardHome() {
  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-black text-slate-800">Clinic Overview</h1>
        <p className="text-slate-500 mt-1">Here is the performance of your veterinary clinic today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Patients */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-500 flex items-center justify-center text-xl">
              <FaPaw />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-500 uppercase tracking-wider">Total Patients</p>
              <h3 className="text-2xl font-black text-slate-800">1,248</h3>
            </div>
          </div>
          <p className="text-xs font-bold text-emerald-500 flex items-center gap-1">+12 New this week</p>
        </div>

        {/* Consultations Today */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-500 flex items-center justify-center text-xl">
              <FaStethoscope />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-500 uppercase tracking-wider">Consultations</p>
              <h3 className="text-2xl font-black text-slate-800">18</h3>
            </div>
          </div>
          <p className="text-xs font-bold text-blue-500 flex items-center gap-1">5 Remaining Today</p>
        </div>

        {/* Emergency Cases */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-16 h-16 bg-red-500/10 rounded-bl-full"></div>
          <div className="flex items-center gap-4 mb-4 relative z-10">
            <div className="w-12 h-12 rounded-xl bg-red-50 text-red-500 flex items-center justify-center text-xl animate-pulse">
              <FaExclamationTriangle />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-500 uppercase tracking-wider">Emergencies</p>
              <h3 className="text-2xl font-black text-slate-800">2</h3>
            </div>
          </div>
          <p className="text-xs font-bold text-red-500">Requires immediate attention</p>
        </div>

        {/* Revenue Today */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-500 flex items-center justify-center text-xl">
              <FaMoneyBillWave />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-500 uppercase tracking-wider">Revenue Today</p>
              <h3 className="text-2xl font-black text-slate-800">₹8,400</h3>
            </div>
          </div>
          <p className="text-xs font-bold text-emerald-500 flex items-center gap-1">+15% vs Yesterday</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Upcoming Appointments */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex justify-between items-center">
            <h2 className="text-lg font-bold text-slate-800">Upcoming Appointments</h2>
            <button className="text-sm font-bold text-blue-600 hover:text-blue-700">View All</button>
          </div>
          <div className="p-0">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-4">Time</th>
                  <th className="px-6 py-4">Patient / Owner</th>
                  <th className="px-6 py-4">Type</th>
                  <th className="px-6 py-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr className="hover:bg-slate-50">
                  <td className="px-6 py-4 font-bold text-slate-800">10:00 AM</td>
                  <td className="px-6 py-4">
                    <p className="font-bold text-slate-800">Charlie (Labrador)</p>
                    <p className="text-xs text-slate-500">Alice Smith</p>
                  </td>
                  <td className="px-6 py-4 text-slate-600">Vaccination</td>
                  <td className="px-6 py-4"><span className="px-2 py-1 bg-amber-100 text-amber-700 rounded-md text-[10px] font-black uppercase">Waiting</span></td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="px-6 py-4 font-bold text-slate-800">11:30 AM</td>
                  <td className="px-6 py-4">
                    <p className="font-bold text-slate-800">Bessie (Holstein Cow)</p>
                    <p className="text-xs text-slate-500">Sunrise Dairy Farm</p>
                  </td>
                  <td className="px-6 py-4 text-slate-600">Farm Visit</td>
                  <td className="px-6 py-4"><span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-md text-[10px] font-black uppercase">Scheduled</span></td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="px-6 py-4 font-bold text-slate-800">01:00 PM</td>
                  <td className="px-6 py-4">
                    <p className="font-bold text-slate-800">Luna (Persian Cat)</p>
                    <p className="text-xs text-slate-500">Bob Jones</p>
                  </td>
                  <td className="px-6 py-4 text-slate-600">General Checkup</td>
                  <td className="px-6 py-4"><span className="px-2 py-1 bg-emerald-100 text-emerald-700 rounded-md text-[10px] font-black uppercase">Confirmed</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Reminders & Alerts */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 flex flex-col">
          <h2 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
            <FaBell className="text-amber-500" /> Notifications
          </h2>
          <div className="space-y-4 flex-1">
            <div className="p-3 bg-red-50 border border-red-100 rounded-xl">
              <p className="text-xs font-bold text-red-600 uppercase tracking-wider mb-1">Emergency</p>
              <p className="text-sm font-semibold text-slate-800">Incoming trauma case in 10 mins.</p>
              <p className="text-xs text-slate-500 mt-1">From: City Pet Ambulance</p>
            </div>
            <div className="p-3 bg-blue-50 border border-blue-100 rounded-xl">
              <p className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-1">Teleconsultation</p>
              <p className="text-sm font-semibold text-slate-800">Video call with farm owner at 2 PM.</p>
            </div>
            <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Follow-up</p>
              <p className="text-sm font-semibold text-slate-800">Call Alice about Charlie&apos;s blood test results.</p>
            </div>
          </div>
          <button className="w-full mt-4 py-2 border border-slate-200 text-sm font-bold text-slate-600 rounded-xl hover:bg-slate-50">
            View All
          </button>
        </div>
      </div>
    </div>
  );
}
