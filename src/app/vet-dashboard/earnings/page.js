"use client";
import { useEffect, useState } from "react";
import { FaMoneyBillWave, FaArrowUp } from "react-icons/fa";
import { toast } from "react-toastify";

const statusBadge = (status) => {
  const s = { PENDING: "bg-yellow-100 text-yellow-700", PAID: "bg-green-100 text-green-700", WITHDRAWN: "bg-blue-100 text-blue-700" };
  return <span className={`px-3 py-1 rounded-full text-xs font-bold ${s[status] || "bg-gray-100 text-gray-700"}`}>{status}</span>;
};

export default function EarningsPage() {
  const [data, setData] = useState({ earnings: [], total: 0, monthly: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    fetch(`/api/vet/earnings?userId=${userId}`)
      .then(r => r.json())
      .then(d => { if (d.success) setData(d.data); })
      .catch(() => toast.error("Failed to load earnings"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="p-10 text-center animate-pulse text-slate-400">Loading earnings...</div>;

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <h1 className="text-3xl font-extrabold text-slate-800 mb-2">Earnings & Payments</h1>
      <p className="text-slate-500 mb-8">Track your consultation income and payment status.</p>

      {/* Summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-2xl shadow-sm border p-6">
          <div className="flex items-center gap-3 mb-2">
            <span className="w-10 h-10 rounded-xl bg-green-100 text-green-600 flex items-center justify-center"><FaMoneyBillWave /></span>
            <span className="text-sm text-slate-500 font-semibold">Total Earnings</span>
          </div>
          <p className="text-4xl font-extrabold text-slate-800">₹{data.total.toLocaleString()}</p>
        </div>
        <div className="bg-white rounded-2xl shadow-sm border p-6">
          <div className="flex items-center gap-3 mb-2">
            <span className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center"><FaArrowUp /></span>
            <span className="text-sm text-slate-500 font-semibold">This Month</span>
          </div>
          <p className="text-4xl font-extrabold text-slate-800">₹{data.monthly.toLocaleString()}</p>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-50 border-b">
            <tr className="text-left text-xs font-bold text-slate-500 uppercase">
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4">Type</th>
              <th className="px-6 py-4">Amount</th>
              <th className="px-6 py-4">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {data.earnings.length === 0 ? (
              <tr><td colSpan={4} className="text-center py-12 text-slate-400">No earnings yet.</td></tr>
            ) : data.earnings.map(e => (
              <tr key={e._id} className="hover:bg-slate-50 transition">
                <td className="px-6 py-4 text-sm text-slate-700">{new Date(e.createdAt).toLocaleDateString()}</td>
                <td className="px-6 py-4 text-sm font-medium text-slate-700">{e.type}</td>
                <td className="px-6 py-4 text-sm font-bold text-green-700">₹{e.amount}</td>
                <td className="px-6 py-4">{statusBadge(e.status)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
