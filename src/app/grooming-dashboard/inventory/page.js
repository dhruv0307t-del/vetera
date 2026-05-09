"use client";
import React from "react";
import { FaBoxOpen, FaExclamationTriangle, FaPlus, FaSearch, FaSyncAlt } from "react-icons/fa";

const InventoryPage = () => {
  const inventory = [
    {
      id: 1,
      item: "Pet Shampoo (Aloe Vera)",
      category: "Shampoos",
      stock: 15,
      unit: "Bottles",
      status: "In Stock",
      lastUpdated: "2026-05-07",
    },
    {
      id: 2,
      item: "Grooming Scissors (Pro)",
      category: "Tools",
      stock: 4,
      unit: "Units",
      status: "Low Stock",
      lastUpdated: "2026-05-05",
    },
    {
      id: 3,
      item: "Flea Treatment Spray",
      category: "Treatments",
      stock: 2,
      unit: "Units",
      status: "Out of Stock",
      lastUpdated: "2026-05-01",
    },
    {
      id: 4,
      item: "Nail Clippers (Large)",
      category: "Tools",
      stock: 8,
      unit: "Units",
      status: "In Stock",
      lastUpdated: "2026-05-08",
    },
  ];

  const getStatusStyle = (status) => {
    switch (status) {
      case "In Stock":
        return "bg-emerald-100 text-emerald-700";
      case "Low Stock":
        return "bg-amber-100 text-amber-700 animate-pulse";
      case "Out of Stock":
        return "bg-rose-100 text-rose-700 font-black";
      default:
        return "bg-slate-100 text-slate-700";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-800">Inventory Tracking</h1>
          <p className="text-slate-500 text-sm">Monitor and manage your grooming shop supplies and tools.</p>
        </div>
        <div className="flex gap-2">
          <button className="bg-slate-100 hover:bg-slate-200 text-slate-600 px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 transition-all">
            <FaSyncAlt /> Update Stock
          </button>
          <button className="bg-pink-500 hover:bg-pink-600 text-white px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-pink-500/20 transition-all">
            <FaPlus /> New Item
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <p className="text-xs font-black text-slate-400 uppercase tracking-wider mb-2">Total Categories</p>
          <h3 className="text-3xl font-black text-slate-800">12</h3>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <p className="text-xs font-black text-slate-400 uppercase tracking-wider mb-2">Items Low on Stock</p>
          <div className="flex items-center gap-2">
            <h3 className="text-3xl font-black text-amber-500">5</h3>
            <FaExclamationTriangle className="text-amber-500 animate-pulse" />
          </div>
        </div>
        <div className="lg:col-span-2 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center">
          <div className="flex-1 relative">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search items, categories or suppliers..."
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-pink-500 outline-none text-sm"
            />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider font-bold">
            <tr>
              <th className="px-6 py-4">Item Details</th>
              <th className="px-6 py-4">Category</th>
              <th className="px-6 py-4">Current Stock</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Last Updated</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {inventory.map((item) => (
              <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400">
                      <FaBoxOpen />
                    </div>
                    <span className="font-bold text-slate-800">{item.item}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-slate-600">{item.category}</td>
                <td className="px-6 py-4">
                  <span className="font-black text-slate-800">{item.stock}</span>
                  <span className="text-xs text-slate-400 ml-1">{item.unit}</span>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${getStatusStyle(item.status)}`}>
                    {item.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-slate-500">{item.lastUpdated}</td>
                <td className="px-6 py-4 text-right">
                  <button className="text-slate-400 hover:text-pink-500 transition-all">Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InventoryPage;
