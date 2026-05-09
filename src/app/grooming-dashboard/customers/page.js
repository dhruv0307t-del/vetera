"use client";
import React from "react";
import { FaHistory, FaPhone, FaPlus, FaSearch, FaUserCircle } from "react-icons/fa";

const CustomersPage = () => {
  const customers = [
    {
      id: "CUST-001",
      name: "Alice Smith",
      email: "alice@example.com",
      phone: "+91 98765 43210",
      pets: ["Buddy (Golden Retriever)", "Luna (Persian Cat)"],
      lastVisit: "2026-04-20",
      totalSpent: "₹4,500",
    },
    {
      id: "CUST-002",
      name: "Bob Johnson",
      email: "bob@example.com",
      phone: "+91 98765 43211",
      pets: ["Misty (Persian Cat)"],
      lastVisit: "2026-05-01",
      totalSpent: "₹1,200",
    },
    {
      id: "CUST-003",
      name: "Charlie Brown",
      email: "charlie@example.com",
      phone: "+91 98765 43212",
      pets: ["Snoopy (Beagle)"],
      lastVisit: "2026-05-05",
      totalSpent: "₹300",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-800">Customer Management</h1>
          <p className="text-slate-500 text-sm">Maintain and view your grooming shop&apos;s client directory.</p>
        </div>
        <button className="bg-pink-500 hover:bg-pink-600 text-white px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-pink-500/20 transition-all">
          <FaPlus /> Add Customer
        </button>
      </div>

      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
        <div className="flex-1 relative">
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search by name, email, phone or pet..."
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none text-sm transition-all"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {customers.map((customer) => (
          <div key={customer.id} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl hover:border-pink-200 transition-all group">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-pink-50 group-hover:text-pink-500 transition-all">
                  <FaUserCircle className="text-2xl" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-800">{customer.name}</h3>
                  <p className="text-xs text-slate-500">{customer.id}</p>
                </div>
              </div>
              <button className="p-2 rounded-xl bg-slate-50 text-slate-400 hover:bg-pink-50 hover:text-pink-500 transition-all">
                <FaPhone className="text-sm" />
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1">Registered Pets</p>
                <div className="flex flex-wrap gap-2">
                  {customer.pets.map((pet, i) => (
                    <span key={i} className="px-2.5 py-1 bg-slate-100 text-slate-600 rounded-lg text-[10px] font-bold">
                      {pet}
                    </span>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-2">
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1">Last Visit</p>
                  <p className="text-xs font-bold text-slate-700 flex items-center gap-1">
                    <FaHistory className="text-[10px]" /> {customer.lastVisit}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1">Total Spent</p>
                  <p className="text-xs font-bold text-emerald-600">{customer.totalSpent}</p>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100">
              <button className="w-full py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-50 transition-all">
                View Full Profile & History
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomersPage;
