"use client";
import React, { useState } from "react";
import { FaCalendarAlt, FaClock, FaFilter, FaPlus, FaSearch } from "react-icons/fa";

const BookingsPage = () => {
  const [filter, setFilter] = useState("All");

  const bookings = [
    {
      id: "BK-001",
      customer: "Alice Smith",
      pet: "Buddy (Golden Retriever)",
      service: "Full Grooming",
      date: "2026-05-09",
      time: "10:00 AM",
      status: "Confirmed",
      amount: "₹1,500",
    },
    {
      id: "BK-002",
      customer: "Bob Johnson",
      pet: "Misty (Persian Cat)",
      service: "Bath & Dry",
      date: "2026-05-09",
      time: "11:30 AM",
      status: "In Progress",
      amount: "₹800",
    },
    {
      id: "BK-003",
      customer: "Charlie Brown",
      pet: "Snoopy (Beagle)",
      service: "Nail Trimming",
      date: "2026-05-09",
      time: "02:00 PM",
      status: "Pending",
      amount: "₹300",
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "Confirmed":
        return "bg-emerald-100 text-emerald-700";
      case "In Progress":
        return "bg-blue-100 text-blue-700";
      case "Pending":
        return "bg-amber-100 text-amber-700";
      default:
        return "bg-slate-100 text-slate-700";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-800">Booking Management</h1>
          <p className="text-slate-500 text-sm">Schedule and manage all your grooming appointments.</p>
        </div>
        <button className="bg-pink-500 hover:bg-pink-600 text-white px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-pink-500/20 transition-all">
          <FaPlus /> New Booking
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1 space-y-4">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="font-bold text-slate-800 mb-4">Quick Filters</h3>
            <div className="space-y-2">
              {["All", "Pending", "Confirmed", "In Progress", "Completed"].map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-bold transition-all ${
                    filter === f ? "bg-pink-50 text-pink-600" : "text-slate-500 hover:bg-slate-50"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="font-bold text-slate-800 mb-4">Calendar View</h3>
            <div className="aspect-square bg-slate-50 rounded-xl flex items-center justify-center border border-dashed border-slate-300">
              <FaCalendarAlt className="text-3xl text-slate-300" />
            </div>
          </div>
        </div>

        <div className="lg:col-span-3 space-y-4">
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
            <div className="flex-1 relative">
              <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search by customer, pet or ID..."
                className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none text-sm transition-all"
              />
            </div>
            <button className="bg-slate-100 hover:bg-slate-200 text-slate-600 p-2.5 rounded-xl transition-all">
              <FaFilter />
            </button>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm whitespace-nowrap">
                <thead className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider font-bold">
                  <tr>
                    <th className="px-6 py-4">Booking ID</th>
                    <th className="px-6 py-4">Customer & Pet</th>
                    <th className="px-6 py-4">Service</th>
                    <th className="px-6 py-4">Time</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4">Amount</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {bookings.map((booking) => (
                    <tr key={booking.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4 font-bold text-slate-600">{booking.id}</td>
                      <td className="px-6 py-4">
                        <p className="font-bold text-slate-800">{booking.customer}</p>
                        <p className="text-xs text-slate-500">{booking.pet}</p>
                      </td>
                      <td className="px-6 py-4 text-slate-600">{booking.service}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <FaClock className="text-slate-400" />
                          <span className="font-bold text-slate-700">{booking.time}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${getStatusColor(booking.status)}`}>
                          {booking.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 font-black text-slate-800">{booking.amount}</td>
                      <td className="px-6 py-4 text-right">
                        <button className="text-pink-500 font-bold hover:underline">View</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingsPage;
