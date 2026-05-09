"use client";
import React, { useState, useEffect } from "react";
import { FaLeaf, FaTractor, FaWeightHanging } from "react-icons/fa";

export default function FeedManagement() {
  const [stocks, setStocks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ feedName: "", quantityKg: "", costPerKg: "", supplier: "" });

  useEffect(() => { fetchStocks(); }, []);

  const fetchStocks = async () => {
    try {
      const res = await fetch("/api/farm/feed");
      const result = await res.json();
      if (result.success) setStocks(result.data);
    } catch (e) { console.error(e); }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/farm/feed", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      if ((await res.json()).success) {
        setShowModal(false);
        fetchStocks();
      }
    } catch (e) { alert("Error updating stock"); }
    finally { setLoading(false); }
  };

  const totalStock = stocks.reduce((acc, curr) => acc + curr.quantityKg, 0);

  return (
    <div className="space-y-6 pb-12 h-full flex flex-col">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-black text-white">Feed & Nutrition</h2>
          <p className="text-slate-400 text-sm mt-1">AI-optimized feed schedules and inventory tracking.</p>
        </div>
        <button 
          onClick={() => setShowModal(true)}
          className="px-4 py-2.5 bg-amber-600 hover:bg-amber-500 text-white font-bold text-sm rounded-xl transition-colors shadow-lg shadow-amber-500/20"
        >
          + Add Feed Stock
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#1e293b]/50 border border-slate-700/50 rounded-2xl p-6 backdrop-blur-xl">
          <div className="text-amber-400 text-3xl mb-4"><FaWeightHanging /></div>
          <p className="text-sm text-slate-400 font-bold uppercase tracking-wider mb-1">Current Stock</p>
          <h3 className="text-3xl font-black text-white">{totalStock.toLocaleString()} kg</h3>
          <p className={`text-xs mt-2 font-semibold ${totalStock < 500 ? 'text-rose-400' : 'text-emerald-400'}`}>
            {totalStock < 500 ? 'Low Stock Alert!' : 'Healthy Stock Levels'}
          </p>
        </div>
        <div className="bg-[#1e293b]/50 border border-slate-700/50 rounded-2xl p-6 backdrop-blur-xl">
          <div className="text-teal-400 text-3xl mb-4"><FaLeaf /></div>
          <p className="text-sm text-slate-400 font-bold uppercase tracking-wider mb-1">Daily Consumption</p>
          <h3 className="text-3xl font-black text-white">425 kg</h3>
          <p className="text-xs text-slate-500 mt-2">Optimal range based on AI</p>
        </div>
        <div className="bg-gradient-to-br from-indigo-900/40 to-[#1e293b]/80 border border-indigo-500/30 rounded-2xl p-6 backdrop-blur-xl">
          <div className="text-indigo-400 text-3xl mb-4"><FaTractor /></div>
          <p className="text-sm text-indigo-300 font-bold uppercase tracking-wider mb-1">AI Optimization</p>
          <h3 className="text-lg font-bold text-white mb-2">Cost Reduction: 12%</h3>
          <p className="text-xs text-indigo-200">Switch 20% of dry fodder to silage for lactating cattle to increase yield.</p>
        </div>
      </div>

      <div className="bg-[#1e293b]/50 border border-slate-700/50 rounded-2xl overflow-hidden backdrop-blur-xl flex-1 flex flex-col">
        <div className="p-6 border-b border-slate-700/50">
          <h3 className="text-lg font-bold text-white">Stock Purchase History</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-slate-800/80 text-slate-400 text-xs uppercase tracking-wider border-b border-slate-700">
              <tr>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Feed Name</th>
                <th className="px-6 py-4">Quantity (kg)</th>
                <th className="px-6 py-4">Cost/kg</th>
                <th className="px-6 py-4">Supplier</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/50">
              {stocks.map((s) => (
                <tr key={s._id} className="hover:bg-slate-800/30 transition-colors">
                  <td className="px-6 py-4 text-slate-300">{new Date(s.purchaseDate).toLocaleDateString()}</td>
                  <td className="px-6 py-4 font-bold text-white">{s.feedName}</td>
                  <td className="px-6 py-4 text-teal-400 font-bold">{s.quantityKg} kg</td>
                  <td className="px-6 py-4 text-slate-300">₹{s.costPerKg}</td>
                  <td className="px-6 py-4 text-slate-500">{s.supplier || "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {stocks.length === 0 && <div className="p-10 text-center text-slate-500">No stock history found.</div>}
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowModal(false)}></div>
          <div className="relative bg-[#1e293b] border border-slate-700 w-full max-w-md rounded-3xl shadow-2xl p-8">
            <h3 className="text-2xl font-black text-white mb-6">Update Feed Stock</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input 
                placeholder="Feed Name (e.g. Silage, Concentrate)" 
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none focus:ring-2 focus:ring-amber-500"
                value={form.feedName} onChange={e => setForm({...form, feedName: e.target.value})} required
              />
              <div className="grid grid-cols-2 gap-4">
                <input 
                  type="number" placeholder="Quantity (kg)" 
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none focus:ring-2 focus:ring-amber-500"
                  value={form.quantityKg} onChange={e => setForm({...form, quantityKg: e.target.value})} required
                />
                <input 
                  type="number" placeholder="Cost/kg (₹)" 
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none focus:ring-2 focus:ring-amber-500"
                  value={form.costPerKg} onChange={e => setForm({...form, costPerKg: e.target.value})}
                />
              </div>
              <input 
                placeholder="Supplier Name" 
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none focus:ring-2 focus:ring-amber-500"
                value={form.supplier} onChange={e => setForm({...form, supplier: e.target.value})}
              />
              <div className="flex gap-3 pt-4">
                <button type="button" onClick={() => setShowModal(false)} className="flex-1 py-3 bg-slate-800 text-slate-400 font-bold rounded-xl">Cancel</button>
                <button type="submit" disabled={loading} className="flex-1 py-3 bg-amber-600 text-white font-bold rounded-xl shadow-lg shadow-amber-500/20">{loading ? "Saving..." : "Update Stock"}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
