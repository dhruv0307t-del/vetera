"use client";
import React, { useState, useEffect } from "react";
import { FaUsers, FaUserPlus, FaCalendarCheck, FaPhone, FaCircle } from "react-icons/fa";

export default function StaffManagement() {
  const [staffs, setStaffs] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", role: "", phone: "", salary: "" });

  useEffect(() => { fetchStaffData(); }, []);

  const fetchStaffData = async () => {
    try {
      const res = await fetch("/api/farm/staff");
      const result = await res.json();
      if (result.success) {
        setStaffs(result.data.staffs);
        setAttendance(result.data.attendance);
      }
    } catch (e) { console.error(e); }
  };

  const handleAddStaff = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch("/api/farm/staff", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "ADD_STAFF", data: form })
      });
      setShowModal(false);
      fetchStaffData();
    } catch (e) { alert("Error adding staff"); }
    finally { setLoading(false); }
  };

  const markAttendance = async (staffId, status) => {
    try {
      await fetch("/api/farm/staff", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "MARK_ATTENDANCE", data: { staffId, status, date: new Date() } })
      });
      fetchStaffData();
    } catch (e) { alert("Error marking attendance"); }
  };

  return (
    <div className="space-y-6 pb-12 h-full flex flex-col">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-black text-white">Staff & Labour</h2>
          <p className="text-slate-400 text-sm mt-1">Manage farm workers, shifts, and daily attendance.</p>
        </div>
        <button 
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm rounded-xl transition-colors shadow-lg shadow-indigo-500/20"
        >
          <FaUserPlus /> Add Worker
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Attendance Panel */}
        <div className="bg-[#1e293b]/50 border border-slate-700/50 rounded-2xl p-6 backdrop-blur-xl">
          <div className="flex items-center gap-2 mb-6">
            <FaCalendarCheck className="text-emerald-400" />
            <h3 className="text-lg font-bold text-white">Today&apos;s Attendance</h3>
          </div>
          <div className="space-y-4 max-h-96 overflow-y-auto pr-2 scrollbar-thin">
            {staffs.map((staff) => {
              const record = attendance.find(a => a.staffId === staff._id);
              return (
                <div key={staff._id} className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center text-white font-bold uppercase">{staff.name[0]}</div>
                    <div>
                      <p className="text-sm font-bold text-white">{staff.name}</p>
                      <p className="text-xs text-slate-500">{staff.role}</p>
                    </div>
                  </div>
                  {record ? (
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${record.status === 'PRESENT' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'}`}>
                      {record.status}
                    </span>
                  ) : (
                    <div className="flex gap-2">
                      <button onClick={() => markAttendance(staff._id, "PRESENT")} className="px-3 py-1 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 text-xs font-bold rounded-lg border border-emerald-500/20 transition-all">Present</button>
                      <button onClick={() => markAttendance(staff._id, "ABSENT")} className="px-3 py-1 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 text-xs font-bold rounded-lg border border-rose-500/20 transition-all">Absent</button>
                    </div>
                  )}
                </div>
              );
            })}
            {staffs.length === 0 && <p className="text-center text-slate-500 py-10">No workers added yet.</p>}
          </div>
        </div>

        {/* Worker Profiles */}
        <div className="bg-[#1e293b]/50 border border-slate-700/50 rounded-2xl p-6 backdrop-blur-xl">
          <div className="flex items-center gap-2 mb-6">
            <FaUsers className="text-indigo-400" />
            <h3 className="text-lg font-bold text-white">Worker Profiles</h3>
          </div>
          <div className="space-y-4 max-h-96 overflow-y-auto pr-2 scrollbar-thin">
            {staffs.map((staff) => (
              <div key={staff._id} className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-4 flex items-center justify-between group">
                <div className="flex items-center gap-3">
                  <FaCircle className={`text-[8px] ${staff.status === 'ACTIVE' ? 'text-emerald-500' : 'text-slate-500'}`} />
                  <div>
                    <p className="text-sm font-bold text-white">{staff.name}</p>
                    <div className="flex items-center gap-4 mt-1">
                      <span className="text-xs text-slate-400 flex items-center gap-1"><FaPhone size={10} /> {staff.phone}</span>
                      <span className="text-xs text-indigo-300 font-bold">₹{staff.salary?.toLocaleString()} / mo</span>
                    </div>
                  </div>
                </div>
                <button className="text-xs text-slate-500 hover:text-white transition-colors">Edit</button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowModal(false)}></div>
          <div className="relative bg-[#1e293b] border border-slate-700 w-full max-w-md rounded-3xl shadow-2xl p-8">
            <h3 className="text-2xl font-black text-white mb-6">Add New Worker</h3>
            <form onSubmit={handleAddStaff} className="space-y-4">
              <input 
                placeholder="Full Name" 
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none focus:ring-2 focus:ring-indigo-500"
                value={form.name} onChange={e => setForm({...form, name: e.target.value})} required
              />
              <div className="grid grid-cols-2 gap-4">
                <input 
                  placeholder="Role (e.g. Milker)" 
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none focus:ring-2 focus:ring-indigo-500"
                  value={form.role} onChange={e => setForm({...form, role: e.target.value})} required
                />
                <input 
                  placeholder="Phone Number" 
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none focus:ring-2 focus:ring-indigo-500"
                  value={form.phone} onChange={e => setForm({...form, phone: e.target.value})}
                />
              </div>
              <input 
                type="number" placeholder="Monthly Salary (₹)" 
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none focus:ring-2 focus:ring-indigo-500"
                value={form.salary} onChange={e => setForm({...form, salary: e.target.value})} required
              />
              <div className="flex gap-3 pt-4">
                <button type="button" onClick={() => setShowModal(false)} className="flex-1 py-3 bg-slate-800 text-slate-400 font-bold rounded-xl">Cancel</button>
                <button type="submit" disabled={loading} className="flex-1 py-3 bg-indigo-600 text-white font-bold rounded-xl shadow-lg shadow-indigo-500/20">{loading ? "Adding..." : "Confirm"}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
