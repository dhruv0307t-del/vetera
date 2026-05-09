"use client";
import React from "react";
import { FaArrowUp, FaChartLine, FaChartPie, FaDownload, FaUsers } from "react-icons/fa";

const AnalyticsPage = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-800">Business Analytics</h1>
          <p className="text-slate-500 text-sm">Deep dive into your shop's performance and growth.</p>
        </div>
        <button className="bg-slate-800 hover:bg-slate-900 text-white px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 transition-all">
          <FaDownload /> Export Report
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm relative overflow-hidden">
          <div className="absolute -right-4 -bottom-4 w-32 h-32 bg-pink-50 rounded-full opacity-50"></div>
          <p className="text-xs font-black text-slate-400 uppercase tracking-wider mb-2">Monthly Revenue</p>
          <h3 className="text-4xl font-black text-slate-800">₹42,500</h3>
          <p className="text-xs font-bold text-emerald-500 flex items-center gap-1 mt-4">
            <FaArrowUp /> 18.2% from last month
          </p>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm relative overflow-hidden">
          <div className="absolute -right-4 -bottom-4 w-32 h-32 bg-blue-50 rounded-full opacity-50"></div>
          <p className="text-xs font-black text-slate-400 uppercase tracking-wider mb-2">New Customers</p>
          <h3 className="text-4xl font-black text-slate-800">84</h3>
          <p className="text-xs font-bold text-emerald-500 flex items-center gap-1 mt-4">
            <FaArrowUp /> 5.4% from last month
          </p>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm relative overflow-hidden">
          <div className="absolute -right-4 -bottom-4 w-32 h-32 bg-purple-50 rounded-full opacity-50"></div>
          <p className="text-xs font-black text-slate-400 uppercase tracking-wider mb-2">Retention Rate</p>
          <h3 className="text-4xl font-black text-slate-800">72%</h3>
          <p className="text-xs font-bold text-emerald-500 flex items-center gap-1 mt-4">
            <FaArrowUp /> 2.1% from last month
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-bold text-slate-800 flex items-center gap-2">
              <FaChartLine className="text-pink-500" /> Revenue Growth
            </h3>
            <select className="bg-slate-50 border-none text-xs font-bold text-slate-500 rounded-lg outline-none px-3 py-1.5">
              <option>Last 6 Months</option>
              <option>Last Year</option>
            </select>
          </div>
          <div className="h-64 flex items-end justify-between gap-2 px-2">
            {[45, 60, 55, 85, 75, 95].map((h, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-3">
                <div 
                  className="w-full bg-gradient-to-t from-pink-500 to-pink-400 rounded-xl transition-all duration-1000 hover:scale-105 cursor-pointer shadow-lg shadow-pink-500/20"
                  style={{ height: `${h}%` }}
                ></div>
                <span className="text-[10px] font-black text-slate-400 uppercase">{['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'][i]}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-bold text-slate-800 flex items-center gap-2">
              <FaChartPie className="text-blue-500" /> Service Distribution
            </h3>
          </div>
          <div className="flex items-center justify-around h-64">
            <div className="relative w-48 h-48">
              {/* Decorative SVG for Donut Chart representation */}
              <svg viewBox="0 0 36 36" className="w-full h-full rotate-[-90deg]">
                <circle cx="18" cy="18" r="16" fill="transparent" stroke="#f1f5f9" strokeWidth="4"></circle>
                <circle cx="18" cy="18" r="16" fill="transparent" stroke="#ec4899" strokeWidth="4" strokeDasharray="40 100" strokeDashoffset="0"></circle>
                <circle cx="18" cy="18" r="16" fill="transparent" stroke="#3b82f6" strokeWidth="4" strokeDasharray="30 100" strokeDashoffset="-40"></circle>
                <circle cx="18" cy="18" r="16" fill="transparent" stroke="#8b5cf6" strokeWidth="4" strokeDasharray="20 100" strokeDashoffset="-70"></circle>
                <circle cx="18" cy="18" r="16" fill="transparent" stroke="#10b981" strokeWidth="4" strokeDasharray="10 100" strokeDashoffset="-90"></circle>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-black text-slate-800">540</span>
                <span className="text-[10px] font-bold text-slate-400 uppercase">Bookings</span>
              </div>
            </div>
            <div className="space-y-3">
              {[
                { label: 'Styling', color: 'bg-pink-500', val: '40%' },
                { label: 'Hygiene', color: 'bg-blue-500', val: '30%' },
                { label: 'Special', color: 'bg-purple-500', val: '20%' },
                { label: 'Other', color: 'bg-emerald-500', val: '10%' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
                  <span className="text-xs font-bold text-slate-600 w-16">{item.label}</span>
                  <span className="text-xs font-black text-slate-800">{item.val}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;
