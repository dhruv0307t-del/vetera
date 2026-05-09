"use client";
import React, { useState, useEffect } from "react";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, 
  LineChart, Line, AreaChart, Area
} from "recharts";
import { 
  FaStethoscope, FaFlask, FaChartLine, FaExclamationTriangle, FaCheckCircle, 
  FaBabyCarriage, FaThermometerHalf, FaHeartbeat 
} from "react-icons/fa";
import { GiCow } from "react-icons/gi";

const StatCard = ({ title, value, icon: Icon, color, trend, bgGradient }) => (
  <div className={`relative overflow-hidden rounded-2xl p-6 ${bgGradient} border border-white/5 backdrop-blur-xl group`}>
    {/* Decorative glow */}
    <div className={`absolute -right-6 -top-6 w-24 h-24 rounded-full opacity-20 blur-2xl ${color}`}></div>
    
    <div className="relative z-10 flex justify-between items-start">
      <div>
        <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">{title}</p>
        <h3 className="text-3xl font-black text-white mb-2 tracking-tight">{value}</h3>
        {trend && (
          <div className="flex items-center gap-1.5 text-xs font-semibold">
            <span className={trend > 0 ? "text-emerald-400" : "text-rose-400"}>
              {trend > 0 ? "↑" : "↓"} {Math.abs(trend)}%
            </span>
            <span className="text-slate-500">vs last week</span>
          </div>
        )}
      </div>
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl shadow-lg shadow-black/20 ${color} bg-opacity-20 backdrop-blur-md border border-white/10 group-hover:scale-110 transition-transform`}>
        <Icon className="text-white" />
      </div>
    </div>
  </div>
);

export default function FarmDashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/farm/dashboard-stats")
      .then(res => res.json())
      .then(res => {
        if(res.success) setData(res);
        setLoading(false);
      })
      .catch(console.error);
  }, []);

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="animate-spin w-12 h-12 border-4 border-teal-500 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  const { stats, productionTrends, alerts } = data;

  return (
    <div className="space-y-8 pb-12">
      {/* Header section with AI Score */}
      <div className="flex flex-col lg:flex-row gap-6 justify-between items-start">
        <div>
          <h2 className="text-3xl font-black text-white tracking-tight">Farm Intelligence Center</h2>
          <p className="text-slate-400 mt-2 font-medium">Real-time overview of your livestock, production, and AI predictions.</p>
        </div>
        
        <div className="flex items-center gap-4 bg-[#1e293b]/80 border border-slate-700/50 p-4 rounded-2xl backdrop-blur-md">
          <div className="text-right">
            <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">AI Farm Health Score</p>
            <p className="text-2xl font-black text-emerald-400 leading-none mt-1">{stats.healthScore}/100</p>
          </div>
          <div className="w-12 h-12 rounded-full border-4 border-emerald-500/20 flex items-center justify-center">
            <FaHeartbeat className="text-emerald-400 text-xl animate-pulse" />
          </div>
        </div>
      </div>

      {/* Primary KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Cattle" value={stats.totalCattle} 
          icon={GiCow} color="bg-indigo-500" trend={4}
          bgGradient="bg-gradient-to-br from-indigo-900/40 to-slate-900" 
        />
        <StatCard 
          title="Milk Production Today" value={`${stats.milkProductionToday} L`} 
          icon={FaFlask} color="bg-teal-500" trend={-2.5}
          bgGradient="bg-gradient-to-br from-teal-900/40 to-slate-900" 
        />
        <StatCard 
          title="Revenue Today" value={`₹${stats.revenueToday.toLocaleString()}`} 
          icon={FaChartLine} color="bg-emerald-500" trend={8.2}
          bgGradient="bg-gradient-to-br from-emerald-900/40 to-slate-900" 
        />
        <StatCard 
          title="Sick/Alerted Cattle" value={stats.sickCattle} 
          icon={FaThermometerHalf} color="bg-rose-500" trend={-1}
          bgGradient="bg-gradient-to-br from-rose-900/40 to-slate-900" 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Milk Production Chart */}
        <div className="lg:col-span-2 bg-[#1e293b]/50 border border-slate-700/50 rounded-3xl p-6 backdrop-blur-xl">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-lg font-bold text-white">Milk Yield Prediction</h3>
              <p className="text-sm text-slate-400">Past 7 days vs AI forecast</p>
            </div>
            <select className="bg-slate-800 border border-slate-700 text-slate-300 text-sm rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-teal-500">
              <option>Last 7 Days</option>
              <option>This Month</option>
            </select>
          </div>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={productionTrends} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorYield" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#14b8a6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#14b8a6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                <XAxis dataKey="day" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                <RechartsTooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', color: '#f8fafc' }}
                  itemStyle={{ color: '#2dd4bf' }}
                />
                <Area type="monotone" dataKey="yield" stroke="#14b8a6" strokeWidth={3} fillOpacity={1} fill="url(#colorYield)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* AI Alerts & Notifications */}
        <div className="bg-gradient-to-br from-indigo-900/20 to-[#1e293b]/80 border border-indigo-500/20 rounded-3xl p-6 backdrop-blur-xl flex flex-col">
          <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span>
            AI Smart Alerts
          </h3>
          <p className="text-sm text-slate-400 mb-6">Predictive anomalies and tasks.</p>
          
          <div className="flex-1 space-y-4 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-slate-700">
            {alerts.length === 0 ? (
              <p className="text-slate-500 text-center py-10">No active alerts. Your farm is healthy!</p>
            ) : (
              alerts.map(alert => (
                <div key={alert.id} className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-4 flex gap-4 items-start">
                  <div className={`mt-0.5 w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                    alert.severity === 'high' ? 'bg-rose-500/20 text-rose-400' : 
                    alert.severity === 'medium' ? 'bg-amber-500/20 text-amber-400' : 'bg-blue-500/20 text-blue-400'
                  }`}>
                    {alert.type === 'Health' ? <FaStethoscope size={14} /> : 
                     alert.type === 'Production' ? <FaFlask size={14} /> : <FaCheckCircle size={14} />}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-200">{alert.type} Alert</h4>
                    <p className="text-xs text-slate-400 mt-1 leading-relaxed">{alert.message}</p>
                    <button className="text-xs font-bold text-indigo-400 hover:text-indigo-300 mt-2 transition-colors">
                      Take Action →
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Secondary Metrics - Deep Dive */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-[#1e293b]/50 border border-slate-700/50 rounded-2xl p-5 backdrop-blur-xl">
          <div className="flex items-center gap-3 mb-4 text-emerald-400">
            <FaCheckCircle /> <span className="font-bold text-sm">Healthy Animals</span>
          </div>
          <div className="text-3xl font-black text-white">{stats.healthyCattle}</div>
          <div className="w-full bg-slate-800 rounded-full h-1.5 mt-4">
            <div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: `${(stats.healthyCattle/stats.totalCattle)*100}%` }}></div>
          </div>
        </div>

        <div className="bg-[#1e293b]/50 border border-slate-700/50 rounded-2xl p-5 backdrop-blur-xl">
          <div className="flex items-center gap-3 mb-4 text-fuchsia-400">
            <FaBabyCarriage /> <span className="font-bold text-sm">Pregnant Cattle</span>
          </div>
          <div className="text-3xl font-black text-white">{stats.pregnantCattle}</div>
          <p className="text-xs text-slate-400 mt-2">Next delivery in 12 days</p>
        </div>

        <div className="bg-[#1e293b]/50 border border-slate-700/50 rounded-2xl p-5 backdrop-blur-xl">
          <div className="flex items-center gap-3 mb-4 text-blue-400">
            <FaFlask /> <span className="font-bold text-sm">AM / PM Collection</span>
          </div>
          <div className="flex items-end justify-between">
            <div>
              <div className="text-sm text-slate-400">AM</div>
              <div className="text-xl font-bold text-white">{stats.amCollection} L</div>
            </div>
            <div className="text-slate-600 text-2xl">/</div>
            <div className="text-right">
              <div className="text-sm text-slate-400">PM</div>
              <div className="text-xl font-bold text-white">{stats.pmCollection} L</div>
            </div>
          </div>
        </div>

        <div className="bg-[#1e293b]/50 border border-slate-700/50 rounded-2xl p-5 backdrop-blur-xl relative overflow-hidden">
          <div className="absolute right-0 bottom-0 text-slate-800 opacity-20 text-6xl rotate-12 -mr-4 -mb-4"><GiCow /></div>
          <div className="flex items-center gap-3 mb-4 text-amber-400">
            <span className="font-bold text-sm">Feed Consumption</span>
          </div>
          <div className="text-3xl font-black text-white">{stats.feedConsumption} <span className="text-lg text-slate-400 font-medium">kg</span></div>
          <p className="text-xs text-amber-400/80 mt-2 font-medium">12% lower than optimal</p>
        </div>
      </div>

    </div>
  );
}
