"use client";
import React from "react";
import { FaDownload, FaFileInvoice, FaMoneyBillWave, FaPlus, FaSearch } from "react-icons/fa";

const BillingPage = () => {
  const invoices = [
    {
      id: "INV-2026-001",
      customer: "Alice Smith",
      amount: "₹1,500",
      date: "2026-05-09",
      method: "UPI",
      status: "Paid",
    },
    {
      id: "INV-2026-002",
      customer: "Emily Rose",
      amount: "₹800",
      date: "2026-05-08",
      method: "Cash",
      status: "Paid",
    },
    {
      id: "INV-2026-003",
      customer: "John Doe",
      amount: "₹300",
      date: "2026-05-08",
      method: "Card",
      status: "Unpaid",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-800">Billing & Invoices</h1>
          <p className="text-slate-500 text-sm">Manage transactions, generate invoices and track payments.</p>
        </div>
        <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-emerald-500/20 transition-all">
          <FaPlus /> Create Invoice
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-500 flex items-center justify-center text-xl">
              <FaMoneyBillWave />
            </div>
            <div>
              <p className="text-xs font-black text-slate-400 uppercase tracking-wider">Net Revenue</p>
              <h3 className="text-2xl font-black text-slate-800">₹142,500</h3>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-500 flex items-center justify-center text-xl">
              <FaFileInvoice />
            </div>
            <div>
              <p className="text-xs font-black text-slate-400 uppercase tracking-wider">Unpaid Amount</p>
              <h3 className="text-2xl font-black text-slate-800">₹3,400</h3>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-3xl border border-slate-200 shadow-sm flex items-center">
          <div className="flex-1 relative">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search invoices by ID or customer..."
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none text-sm"
            />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
          <h3 className="font-bold text-slate-800">Recent Transactions</h3>
          <div className="flex gap-2">
            <button className="text-xs font-black text-slate-400 uppercase hover:text-slate-600 px-3 py-1 bg-slate-50 rounded-lg">Month</button>
            <button className="text-xs font-black text-slate-400 uppercase hover:text-slate-600 px-3 py-1 bg-slate-50 rounded-lg">Quarter</button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider font-bold">
              <tr>
                <th className="px-6 py-4">Invoice ID</th>
                <th className="px-6 py-4">Customer</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Amount</th>
                <th className="px-6 py-4">Method</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Download</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {invoices.map((inv) => (
                <tr key={inv.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 font-bold text-slate-600">{inv.id}</td>
                  <td className="px-6 py-4 font-bold text-slate-800">{inv.customer}</td>
                  <td className="px-6 py-4 text-slate-500">{inv.date}</td>
                  <td className="px-6 py-4 font-black text-slate-800">{inv.amount}</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-slate-100 text-slate-500 rounded text-[10px] font-bold uppercase tracking-widest">{inv.method}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${inv.status === 'Paid' ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}`}>
                      {inv.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-slate-400 hover:text-emerald-600 transition-all">
                      <FaDownload />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BillingPage;
