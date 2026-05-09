"use client";
import React, { useState, useEffect } from "react";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from "recharts";
import { FaFlask, FaDownload, FaFilter, FaPlus } from "react-icons/fa";

export default function MilkIntelligence() {
  const [data, setData] = useState([
    { name: 'Mon', AM: 1100, PM: 1050 },
    { name: 'Tue', AM: 1120, PM: 1030 },
    { name: 'Wed', AM: 1080, PM: 1000 },
    { name: 'Thu', AM: 1150, PM: 1050 },
    { name: 'Fri', AM: 1110, PM: 1070 },
    { name: 'Sat', AM: 1090, PM: 1060 },
    { name: 'Sun', AM: 1130, PM: 1090 },
  ]);
  const [logs, setLogs] = useState([]);
  const [cattle, setCattle] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    cattleId: "",
    date: new Date().toISOString().split('T')[0],
    shift: "AM",
    yieldLiters: "",
    fatPercentage: "",
    snfPercentage: ""
  });

  useEffect(() => {
    fetchLogs();
    fetchCattle();
  }, []);

  const fetchLogs = async () => {
    try {
      const res = await fetch("/api/farm/milk");
      const result = await res.json();
      if (result.success) setLogs(result.data);
    } catch (e) { console.error(e); }
  };

  const fetchCattle = async () => {
    try {
      const res = await fetch("/api/farm/cattle");
      const result = await res.json();
      if (result.success) setCattle(result.data.filter(c => c.gender === "FEMALE"));
    } catch (e) { console.error(e); }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/farm/milk", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      const result = await res.json();
      if (result.success) {
        alert("Log added successfully!");
        setShowModal(false);
        fetchLogs();
      }
    } catch (e) { alert("Error adding log"); }
    finally { setLoading(false); }
  };

  return (
    <div className="space-y-6 pb-12 h-full flex flex-col">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-black text-white">Milk Intelligence</h2>
          <p className="text-slate-400 text-sm mt-1">Daily collection, quality analysis, and yield predictions.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-slate-800 border border-slate-700 hover:bg-slate-700 text-slate-300 text-sm rounded-xl transition-colors">
            <FaDownload /> Export
          </button>
          <button 
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-teal-600 hover:bg-teal-500 text-white font-bold text-sm rounded-xl transition-colors shadow-lg shadow-teal-500/20"
          >
            <FaPlus /> Enter Log
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart */}
        <div className="lg:col-span-2 bg-[#1e293b]/50 border border-slate-700/50 rounded-2xl p-6 backdrop-blur-xl">
          <h3 className="text-lg font-bold text-white mb-6">Weekly Collection (AM vs PM)</h3>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  cursor={{fill: '#334155', opacity: 0.2}}
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', color: '#f8fafc' }}
                />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '12px', color: '#94a3b8', paddingTop: '10px' }} />
                <Bar dataKey="AM" fill="#38bdf8" radius={[4, 4, 0, 0]} barSize={20} />
                <Bar dataKey="PM" fill="#818cf8" radius={[4, 4, 0, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Quality Metrics */}
        <div className="bg-[#1e293b]/50 border border-slate-700/50 rounded-2xl p-6 backdrop-blur-xl flex flex-col">
          <h3 className="text-lg font-bold text-white mb-6">Quality Averages (Today)</h3>
          <div className="flex-1 flex flex-col justify-center space-y-8">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-slate-400 font-bold text-sm uppercase tracking-wider">Fat %</span>
                <span className="text-white font-black">4.2%</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-2">
                <div className="bg-amber-400 h-2 rounded-full" style={{ width: '65%' }}></div>
              </div>
              <p className="text-xs text-slate-500 mt-2 text-right">Target: &gt; 3.5%</p>
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <span className="text-slate-400 font-bold text-sm uppercase tracking-wider">SNF %</span>
                <span className="text-white font-black">8.6%</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-2">
                <div className="bg-indigo-400 h-2 rounded-full" style={{ width: '85%' }}></div>
              </div>
              <p className="text-xs text-slate-500 mt-2 text-right">Target: &gt; 8.5%</p>
            </div>
            
            <div className="p-4 rounded-xl bg-teal-500/10 border border-teal-500/20 text-teal-400 mt-auto">
              <div className="flex items-center gap-2 font-bold mb-1"><FaFlask /> Quality: EXCELLENT</div>
              <p className="text-xs text-teal-400/80">Your milk quality exceeds the enterprise standard today. This translates to +₹2.50 premium per liter.</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Logs Table */}
      <div className="bg-[#1e293b]/50 border border-slate-700/50 rounded-2xl overflow-hidden backdrop-blur-xl flex-1 flex flex-col">
         <div className="p-6 border-b border-slate-700/50">
           <h3 className="text-lg font-bold text-white">Recent Milk Logs</h3>
         </div>
         <div className="overflow-x-auto">
           <table className="w-full text-left text-sm whitespace-nowrap">
             <thead className="bg-slate-800/80 text-slate-400 text-xs uppercase tracking-wider border-b border-slate-700">
               <tr>
                 <th className="px-6 py-4">Date</th>
                 <th className="px-6 py-4">Cattle Tag</th>
                 <th className="px-6 py-4">Shift</th>
                 <th className="px-6 py-4">Yield (L)</th>
                 <th className="px-6 py-4">Fat %</th>
                 <th className="px-6 py-4">SNF %</th>
               </tr>
             </thead>
             <tbody className="divide-y divide-slate-700/50">
               {logs.map((log) => (
                 <tr key={log._id} className="hover:bg-slate-800/30 transition-colors">
                   <td className="px-6 py-4 text-slate-300">{new Date(log.date).toLocaleDateString()}</td>
                   <td className="px-6 py-4 font-bold text-white">{log.cattleId?.tagId || "N/A"}</td>
                   <td className="px-6 py-4">
                     <span className={`px-2 py-1 rounded text-xs font-bold ${log.shift === 'AM' ? 'bg-blue-500/10 text-blue-400' : 'bg-orange-500/10 text-orange-400'}`}>
                       {log.shift}
                     </span>
                   </td>
                   <td className="px-6 py-4 text-teal-400 font-bold">{log.yieldLiters} L</td>
                   <td className="px-6 py-4 text-slate-300">{log.fatPercentage}%</td>
                   <td className="px-6 py-4 text-slate-300">{log.snfPercentage}%</td>
                 </tr>
               ))}
             </tbody>
           </table>
           {logs.length === 0 && (
             <div className="text-center py-10 text-slate-500">No milk logs found. Click "Enter Log" to add one.</div>
           )}
         </div>
      </div>

      {/* Entry Modal */}
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowModal(false)}></div>
          <div className="relative bg-[#1e293b] border border-slate-700 w-full max-w-md rounded-3xl shadow-2xl p-8 overflow-hidden">
            <h3 className="text-2xl font-black text-white mb-6">Enter Milk Log</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Select Cattle</label>
                <select 
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-white focus:ring-2 focus:ring-teal-500 outline-none"
                  value={form.cattleId}
                  onChange={(e) => setForm({...form, cattleId: e.target.value})}
                  required
                >
                  <option value="">Choose Cattle Tag</option>
                  {cattle.map(c => (
                    <option key={c._id} value={c._id}>{c.tagId} ({c.breed})</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Date</label>
                  <input 
                    type="date" 
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-white outline-none"
                    value={form.date}
                    onChange={(e) => setForm({...form, date: e.target.value})}
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Shift</label>
                  <select 
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-white outline-none"
                    value={form.shift}
                    onChange={(e) => setForm({...form, shift: e.target.value})}
                  >
                    <option value="AM">AM</option>
                    <option value="PM">PM</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Yield (Liters)</label>
                <input 
                  type="number" step="0.1"
                  placeholder="e.g. 12.5"
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-white outline-none"
                  value={form.yieldLiters}
                  onChange={(e) => setForm({...form, yieldLiters: e.target.value})}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Fat %</label>
                  <input 
                    type="number" step="0.1"
                    placeholder="4.2"
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-white outline-none"
                    value={form.fatPercentage}
                    onChange={(e) => setForm({...form, fatPercentage: e.target.value})}
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">SNF %</label>
                  <input 
                    type="number" step="0.1"
                    placeholder="8.5"
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-white outline-none"
                    value={form.snfPercentage}
                    onChange={(e) => setForm({...form, snfPercentage: e.target.value})}
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button 
                  type="button" 
                  onClick={() => setShowModal(false)}
                  className="flex-1 py-3 bg-slate-800 hover:bg-slate-700 text-slate-400 font-bold rounded-xl transition-all"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  disabled={loading}
                  className="flex-1 py-3 bg-teal-600 hover:bg-teal-500 text-white font-bold rounded-xl shadow-lg shadow-teal-500/20 transition-all"
                >
                  {loading ? "Saving..." : "Save Log"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
