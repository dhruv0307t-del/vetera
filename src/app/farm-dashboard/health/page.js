"use client";
import React from "react";
import { FaHeartbeat, FaStethoscope, FaSyringe, FaPills } from "react-icons/fa";

export default function HealthMonitoring() {
  return (
    <div className="space-y-6 pb-12 h-full flex flex-col">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-black text-white">Health & Veterinary</h2>
          <p className="text-slate-400 text-sm mt-1">Manage vaccinations, treatments, and medical records.</p>
        </div>
        <button className="px-4 py-2.5 bg-teal-600 hover:bg-teal-500 text-white font-bold text-sm rounded-xl transition-colors shadow-lg shadow-teal-500/20">
          + Log Treatment
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-[#1e293b]/50 border border-slate-700/50 rounded-2xl p-6 backdrop-blur-xl">
          <div className="text-rose-400 text-3xl mb-4"><FaHeartbeat /></div>
          <h3 className="text-3xl font-black text-white">12</h3>
          <p className="text-sm text-slate-400 font-bold uppercase tracking-wider mt-1">Sick Cattle</p>
        </div>
        <div className="bg-[#1e293b]/50 border border-slate-700/50 rounded-2xl p-6 backdrop-blur-xl">
          <div className="text-indigo-400 text-3xl mb-4"><FaSyringe /></div>
          <h3 className="text-3xl font-black text-white">45</h3>
          <p className="text-sm text-slate-400 font-bold uppercase tracking-wider mt-1">Due for Vaccine</p>
        </div>
        <div className="bg-[#1e293b]/50 border border-slate-700/50 rounded-2xl p-6 backdrop-blur-xl">
          <div className="text-amber-400 text-3xl mb-4"><FaPills /></div>
          <h3 className="text-3xl font-black text-white">Low</h3>
          <p className="text-sm text-slate-400 font-bold uppercase tracking-wider mt-1">Inventory Alert</p>
        </div>
        <div className="bg-[#1e293b]/50 border border-slate-700/50 rounded-2xl p-6 backdrop-blur-xl">
          <div className="text-emerald-400 text-3xl mb-4"><FaStethoscope /></div>
          <h3 className="text-3xl font-black text-white">2</h3>
          <p className="text-sm text-slate-400 font-bold uppercase tracking-wider mt-1">Vet Visits Scheduled</p>
        </div>
      </div>

      <div className="bg-[#1e293b]/50 border border-slate-700/50 rounded-2xl p-6 backdrop-blur-xl flex-1 flex flex-col items-center justify-center text-center">
        <FaStethoscope className="text-6xl text-slate-600 mb-4" />
        <h3 className="text-xl font-bold text-white mb-2">Detailed Health Records</h3>
        <p className="text-slate-400 max-w-md">The comprehensive health tracking system is currently in development. Soon you will be able to manage digital health cards and AI-driven disease prediction.</p>
      </div>
    </div>
  );
}
