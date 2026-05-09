"use client";
import React from "react";
import { FaCalendarAlt, FaEnvelope, FaPhone, FaPlus, FaStar, FaUserTie } from "react-icons/fa";

const StaffPage = () => {
  const staffMembers = [
    {
      id: 1,
      name: "Sarah Miller",
      role: "Senior Groomer",
      specialization: "Styling & Spa",
      experience: "5 Years",
      rating: 4.9,
      phone: "+91 98765 43220",
      status: "Active",
    },
    {
      id: 2,
      name: "Mike Wilson",
      role: "Groomer",
      specialization: "Large Breeds",
      experience: "3 Years",
      rating: 4.7,
      phone: "+91 98765 43221",
      status: "On Leave",
    },
    {
      id: 3,
      name: "Jessica Chen",
      role: "Junior Groomer",
      specialization: "Cat Grooming",
      experience: "1 Year",
      rating: 4.5,
      phone: "+91 98765 43222",
      status: "Active",
    },
  ];

  const getStatusColor = (status) => {
    return status === "Active" ? "bg-emerald-500" : "bg-amber-500";
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-800">Team Management</h1>
          <p className="text-slate-500 text-sm">Manage your grooming staff, roles and schedules.</p>
        </div>
        <button className="bg-pink-500 hover:bg-pink-600 text-white px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-pink-500/20 transition-all">
          <FaPlus /> Add Member
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {staffMembers.map((staff) => (
          <div key={staff.id} className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden group hover:shadow-xl transition-all">
            <div className="h-24 bg-gradient-to-r from-slate-800 to-slate-700 relative">
              <div className="absolute -bottom-10 left-6">
                <div className="w-20 h-20 rounded-2xl bg-white p-1 shadow-lg">
                  <div className="w-full h-full rounded-xl bg-slate-100 flex items-center justify-center text-slate-400">
                    <FaUserTie className="text-3xl" />
                  </div>
                </div>
              </div>
              <div className="absolute top-4 right-4">
                <span className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black text-white uppercase tracking-wider ${getStatusColor(staff.status)}`}>
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
                  {staff.status}
                </span>
              </div>
            </div>

            <div className="pt-12 p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-black text-slate-800">{staff.name}</h3>
                  <p className="text-xs font-bold text-pink-500 uppercase tracking-wider">{staff.role}</p>
                </div>
                <div className="flex items-center gap-1 bg-amber-50 px-2 py-1 rounded-lg text-amber-600 text-xs font-bold">
                  <FaStar className="text-[10px]" /> {staff.rating}
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3 text-slate-500 text-sm">
                  <FaCalendarAlt className="text-slate-300" />
                  <span>{staff.experience} Experience</span>
                </div>
                <div className="flex items-center gap-3 text-slate-500 text-sm">
                  <FaPhone className="text-slate-300" />
                  <span>{staff.phone}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-4 border-t border-slate-50">
                <button className="py-2.5 rounded-xl text-xs font-bold text-slate-600 bg-slate-50 hover:bg-slate-100 transition-all flex items-center justify-center gap-2">
                  <FaEnvelope /> Email
                </button>
                <button className="py-2.5 rounded-xl text-xs font-bold text-blue-600 bg-blue-50 hover:bg-blue-100 transition-all">
                  Schedule
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StaffPage;
