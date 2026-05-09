"use client";
import React, { useState, useEffect } from "react";
import { FaFileInvoiceDollar, FaChartLine, FaArrowUp, FaArrowDown } from "react-icons/fa";

export default function FarmFinance() {
  const [transactions, setTransactions] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ type: "INCOME", category: "Milk Sale", amount: "", description: "" });

  useEffect(() => { fetchFinanceData(); }, []);

  const fetchFinanceData = async () => {
    try {
      const res = await fetch("/api/farm/finance");
      const result = await res.json();
      if (result.success) setTransactions(result.data);
    } catch (e) { console.error(e); }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch("/api/farm/finance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      setShowModal(false);
      fetchFinanceData();
    } catch (e) { alert("Error adding transaction"); }
    finally { setLoading(false); }
  };

  const totalIncome = transactions.filter(t => t.type === 'INCOME').reduce((acc, curr) => acc + curr.amount, 0);
  const totalExpense = transactions.filter(t => t.type === 'EXPENSE').reduce((acc, curr) => acc + curr.amount, 0);

  return (
    <div className="space-y-6 pb-12 h-full flex flex-col">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-black text-white">Farm Finance</h2>
          <p className="text-slate-400 text-sm mt-1">Track revenue, expenses, and profitability.</p>
        </div>
        <button 
          onClick={() => setShowModal(true)}
          className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm rounded-xl transition-colors shadow-lg shadow-emerald-500/20"
        >
          + Add Transaction
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#1e293b]/50 border border-slate-700/50 rounded-2xl p-6 backdrop-blur-xl">
          <p className="text-sm text-slate-400 font-bold uppercase tracking-wider mb-2">Total Revenue (All Time)</p>
          <h3 className="text-3xl font-black text-emerald-400">₹{totalIncome.toLocaleString()}</h3>
          <div className="flex items-center gap-2 mt-2 text-xs font-bold text-emerald-400"><FaArrowUp /> Trending Up</div>
        </div>
        <div className="bg-[#1e293b]/50 border border-slate-700/50 rounded-2xl p-6 backdrop-blur-xl">
          <p className="text-sm text-slate-400 font-bold uppercase tracking-wider mb-2">Total Expenses</p>
          <h3 className="text-3xl font-black text-rose-400">₹{totalExpense.toLocaleString()}</h3>
          <div className="flex items-center gap-2 mt-2 text-xs font-bold text-rose-400"><FaArrowDown /> Optimizing</div>
        </div>
        <div className="bg-[#1e293b]/50 border border-slate-700/50 rounded-2xl p-6 backdrop-blur-xl">
          <p className="text-sm text-slate-400 font-bold uppercase tracking-wider mb-2">Net Balance</p>
          <h3 className="text-3xl font-black text-white">₹{(totalIncome - totalExpense).toLocaleString()}</h3>
          <div className="flex items-center gap-2 mt-2 text-xs font-bold text-emerald-400"><FaChartLine /> Healthy</div>
        </div>
      </div>

      <div className="bg-[#1e293b]/50 border border-slate-700/50 rounded-2xl overflow-hidden backdrop-blur-xl flex-1 flex flex-col">
        <div className="p-6 border-b border-slate-700/50">
          <h3 className="text-lg font-bold text-white">Financial Ledger</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-slate-800/80 text-slate-400 text-xs uppercase tracking-wider border-b border-slate-700">
              <tr>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Description</th>
                <th className="px-6 py-4 text-right">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/50">
              {transactions.map((t) => (
                <tr key={t._id} className="hover:bg-slate-800/30 transition-colors">
                  <td className="px-6 py-4 text-slate-300">{new Date(t.date).toLocaleDateString()}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-md text-[10px] font-black uppercase ${t.type === 'INCOME' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'}`}>
                      {t.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-500 italic max-w-xs truncate">{t.description || "—"}</td>
                  <td className={`px-6 py-4 text-right font-bold ${t.type === 'INCOME' ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {t.type === 'INCOME' ? '+' : '-'} ₹{t.amount.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {transactions.length === 0 && <div className="p-10 text-center text-slate-500">No transactions recorded.</div>}
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowModal(false)}></div>
          <div className="relative bg-[#1e293b] border border-slate-700 w-full max-w-md rounded-3xl shadow-2xl p-8">
            <h3 className="text-2xl font-black text-white mb-6">Finance Entry</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex p-1 bg-slate-800 rounded-xl mb-4">
                <button 
                  type="button" onClick={() => setForm({...form, type: 'INCOME'})}
                  className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${form.type === 'INCOME' ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-500/20' : 'text-slate-400'}`}
                >INCOME</button>
                <button 
                  type="button" onClick={() => setForm({...form, type: 'EXPENSE'})}
                  className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${form.type === 'EXPENSE' ? 'bg-rose-600 text-white shadow-lg shadow-rose-500/20' : 'text-slate-400'}`}
                >EXPENSE</button>
              </div>
              <select 
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none focus:ring-2 focus:ring-emerald-500"
                value={form.category} onChange={e => setForm({...form, category: e.target.value})} required
              >
                <option>Milk Sale</option>
                <option>Feed Purchase</option>
                <option>Medicine</option>
                <option>Salary</option>
                <option>Equipment</option>
                <option>Other</option>
              </select>
              <input 
                type="number" placeholder="Amount (₹)" 
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none focus:ring-2 focus:ring-emerald-500"
                value={form.amount} onChange={e => setForm({...form, amount: e.target.value})} required
              />
              <textarea 
                placeholder="Description (Optional)" 
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none focus:ring-2 focus:ring-emerald-500 min-h-[100px]"
                value={form.description} onChange={e => setForm({...form, description: e.target.value})}
              />
              <div className="flex gap-3 pt-4">
                <button type="button" onClick={() => setShowModal(false)} className="flex-1 py-3 bg-slate-800 text-slate-400 font-bold rounded-xl">Cancel</button>
                <button type="submit" disabled={loading} className="flex-1 py-3 bg-emerald-600 text-white font-bold rounded-xl shadow-lg shadow-emerald-500/20">{loading ? "Saving..." : "Add Record"}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
