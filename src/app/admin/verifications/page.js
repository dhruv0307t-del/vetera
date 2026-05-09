"use client";
import React, { useState, useEffect } from "react";
import { FaCheckCircle, FaTimesCircle, FaEye, FaSearch } from "react-icons/fa";

export default function AdminVerifications() {
  const [verifications, setVerifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("ALL");
  const [selected, setSelected] = useState(null);
  const [remarks, setRemarks] = useState("");

  useEffect(() => { fetchVerifications(); }, []);

  const fetchVerifications = async () => {
    try {
      const res = await fetch("/api/admin/verifications");
      const result = await res.json();
      if (result.success) setVerifications(result.data);
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  };

  const handleUpdate = async (id, userId, status) => {
    try {
      await fetch("/api/admin/verifications", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, userId, status, adminRemarks: remarks })
      });
      setSelected(null);
      setRemarks("");
      fetchVerifications();
    } catch (e) { alert("Update failed"); }
  };

  const filtered = filter === "ALL" ? verifications : verifications.filter(v => v.status === filter);

  if (loading) return <div className="text-white p-8">Loading verifications...</div>;

  return (
    <div className="p-8 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-white">Professional Verifications</h1>
          <p className="text-slate-400 text-sm mt-1">Review and manage onboarding submissions for Vets and Groomers.</p>
        </div>
        <div className="flex gap-2 bg-[#1e293b] p-1 rounded-lg border border-slate-800">
          {["ALL", "PENDING", "APPROVED", "REJECTED"].map(f => (
            <button key={f} onClick={() => setFilter(f)} 
              className={`px-4 py-1.5 rounded-md text-xs font-bold transition-all ${filter === f ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'}`}>
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-[#1e293b]/50 border border-slate-800 rounded-2xl overflow-hidden">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead className="bg-[#0f172a] text-slate-400 text-xs uppercase tracking-wider border-b border-slate-800">
            <tr>
              <th className="px-6 py-4">User</th>
              <th className="px-6 py-4">Role</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Submitted At</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800 text-slate-300">
            {filtered.map(v => (
              <tr key={v._id} className="hover:bg-slate-800/30 transition-colors">
                <td className="px-6 py-4">
                  <p className="font-bold text-white">{v.userId?.fullName}</p>
                  <p className="text-xs text-slate-500">{v.userId?.email}</p>
                </td>
                <td className="px-6 py-4 font-semibold text-blue-400">{v.role}</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider
                    ${v.status === 'PENDING' ? 'bg-amber-500/10 text-amber-500 border border-amber-500/20' : 
                      v.status === 'APPROVED' ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20' : 
                      'bg-rose-500/10 text-rose-500 border border-rose-500/20'}`}>
                    {v.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-slate-500">{new Date(v.createdAt).toLocaleDateString()}</td>
                <td className="px-6 py-4 text-right">
                  <button onClick={() => setSelected(v)} className="px-4 py-2 bg-blue-600/10 hover:bg-blue-600/20 text-blue-400 rounded-lg text-xs font-bold transition-colors">
                    Review Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && <div className="p-10 text-center text-slate-500">No verifications found.</div>}
      </div>

      {selected && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setSelected(null)}></div>
          <div className="relative bg-[#0f172a] border border-slate-700 w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl p-8">
            <div className="flex justify-between items-start mb-6 border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-2xl font-black text-white">{selected.userId?.fullName}</h3>
                <p className="text-slate-400">{selected.role} Verification</p>
              </div>
              <button onClick={() => setSelected(null)} className="text-slate-500 hover:text-white">✕</button>
            </div>

            <div className="grid grid-cols-2 gap-6 mb-8 text-sm">
              {selected.role === "Veterinary Doctor" && (
                <>
                  <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700">
                    <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Registration #</p>
                    <p className="font-bold text-white">{selected.vetDetails?.registrationNumber || "N/A"}</p>
                  </div>
                  <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700">
                    <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">License #</p>
                    <p className="font-bold text-white">{selected.vetDetails?.licenseNumber || "N/A"}</p>
                  </div>
                  <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700">
                    <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Clinic Name</p>
                    <p className="font-bold text-white">{selected.vetDetails?.clinicName || "N/A"}</p>
                  </div>
                  <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700">
                    <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Experience</p>
                    <p className="font-bold text-white">{selected.vetDetails?.experience || "0"} Years</p>
                  </div>
                </>
              )}
              {selected.role === "Grooming Shop" && (
                <>
                  <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700">
                    <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Shop Name</p>
                    <p className="font-bold text-white">{selected.groomingDetails?.shopName || "N/A"}</p>
                  </div>
                  <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700">
                    <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Registration #</p>
                    <p className="font-bold text-white">{selected.groomingDetails?.registrationNumber || "N/A"}</p>
                  </div>
                </>
              )}
            </div>

            <div className="mb-8">
              <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-b border-slate-800 pb-2">Admin Actions</h4>
              <textarea 
                placeholder="Add remarks or rejection reasons..." 
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none focus:ring-2 focus:ring-blue-500 min-h-[100px] mb-4"
                value={remarks} onChange={e => setRemarks(e.target.value)}
              />
              <div className="flex gap-4">
                <button onClick={() => handleUpdate(selected._id, selected.userId._id, 'REJECTED')} className="flex-1 py-3 bg-rose-500/10 text-rose-500 hover:bg-rose-500/20 font-bold rounded-xl border border-rose-500/20 transition-all flex items-center justify-center gap-2">
                  <FaTimesCircle /> Reject
                </button>
                <button onClick={() => handleUpdate(selected._id, selected.userId._id, 'RESUBMISSION_REQUIRED')} className="flex-1 py-3 bg-amber-500/10 text-amber-500 hover:bg-amber-500/20 font-bold rounded-xl border border-amber-500/20 transition-all flex items-center justify-center gap-2">
                  Request Resubmission
                </button>
                <button onClick={() => handleUpdate(selected._id, selected.userId._id, 'APPROVED')} className="flex-1 py-3 bg-emerald-600 text-white hover:bg-emerald-500 font-bold rounded-xl shadow-lg shadow-emerald-500/20 transition-all flex items-center justify-center gap-2">
                  <FaCheckCircle /> Approve Profile
                </button>
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
