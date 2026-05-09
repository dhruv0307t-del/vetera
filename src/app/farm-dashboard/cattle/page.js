"use client";
import React, { useState, useEffect } from "react";
import { FaSearch, FaFilter, FaPlus, FaQrcode, FaHeartbeat, FaMars, FaVenus, FaEllipsisV } from "react-icons/fa";
import { GiCow } from "react-icons/gi";

export default function CattleManagement() {
  const [cattle, setCattle] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("/api/farm/cattle")
      .then(res => res.json())
      .then(data => {
        if (data.success) setCattle(data.data);
        setLoading(false);
      });
  }, []);

  const filteredCattle = cattle.filter(c => 
    c.tagId?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    c.breed?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 pb-12 h-full flex flex-col">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-black text-white">Livestock Registry</h2>
          <p className="text-slate-400 text-sm mt-1">Manage and monitor all individual cattle profiles.</p>
        </div>
        
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input 
              type="text" 
              placeholder="Search by Tag ID or Breed..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#1e293b]/50 border border-slate-700 text-white text-sm rounded-xl pl-10 pr-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-teal-500 backdrop-blur-xl transition-all"
            />
          </div>
          <button className="p-2.5 bg-slate-800 border border-slate-700 rounded-xl text-slate-300 hover:text-white hover:bg-slate-700 transition-colors shrink-0">
            <FaFilter />
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-teal-600 hover:bg-teal-500 text-white font-bold text-sm rounded-xl transition-colors shadow-lg shadow-teal-500/20 shrink-0">
            <FaPlus /> <span className="hidden sm:inline">Add Cattle</span>
          </button>
        </div>
      </div>

      <div className="bg-[#1e293b]/50 border border-slate-700/50 rounded-2xl backdrop-blur-xl overflow-hidden flex-1 flex flex-col">
        {loading ? (
          <div className="flex-1 flex items-center justify-center py-20">
            <div className="animate-spin w-8 h-8 border-4 border-teal-500 border-t-transparent rounded-full"></div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-slate-800/80 text-slate-400 text-xs uppercase tracking-wider border-b border-slate-700">
                <tr>
                  <th className="px-6 py-4 font-bold">Tag & Identity</th>
                  <th className="px-6 py-4 font-bold">Breed & Details</th>
                  <th className="px-6 py-4 font-bold">Status</th>
                  <th className="px-6 py-4 font-bold">AI Health Score</th>
                  <th className="px-6 py-4 font-bold">Avg. Milk Yield</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/50">
                {filteredCattle.map((item) => (
                  <tr key={item._id} className="hover:bg-slate-800/30 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center shrink-0">
                          <GiCow className="text-xl text-teal-400" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-white">{item.tagId}</span>
                            <FaQrcode className="text-slate-500 cursor-pointer hover:text-teal-400 transition-colors" title="View QR" />
                          </div>
                          <span className="text-xs text-slate-500">RFID: {item.rfid || "N/A"}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-semibold text-slate-200 flex items-center gap-2">
                        {item.breed} 
                        {item.gender === "FEMALE" ? <FaVenus className="text-pink-400" /> : <FaMars className="text-blue-400" />}
                      </p>
                      <p className="text-xs text-slate-500 mt-0.5">{item.species} • {item.age || "Unknown Age"} • {item.weight}kg</p>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold border ${
                        item.status === 'ACTIVE' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                        item.status === 'SICK' ? 'bg-rose-500/10 text-rose-400 border-rose-500/20' :
                        item.status === 'PREGNANT' ? 'bg-fuchsia-500/10 text-fuchsia-400 border-fuchsia-500/20' :
                        'bg-slate-500/10 text-slate-400 border-slate-500/20'
                      }`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex-1 h-2 bg-slate-800 rounded-full overflow-hidden w-24">
                          <div 
                            className={`h-full rounded-full ${item.healthScore > 80 ? 'bg-emerald-500' : item.healthScore > 50 ? 'bg-amber-500' : 'bg-rose-500'}`}
                            style={{ width: `${item.healthScore}%` }}
                          ></div>
                        </div>
                        <span className="font-bold text-slate-300 text-xs w-8">{item.healthScore}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {item.gender === "FEMALE" && item.averageMilkYield > 0 ? (
                        <div className="font-bold text-teal-400">{item.averageMilkYield} <span className="text-xs font-normal text-slate-500">L/day</span></div>
                      ) : (
                        <span className="text-slate-600">—</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="p-2 hover:bg-slate-700 rounded-lg text-slate-400 hover:text-white transition-colors">
                        <FaEllipsisV />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filteredCattle.length === 0 && (
              <div className="text-center py-12 text-slate-500">
                No cattle found matching your criteria.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
