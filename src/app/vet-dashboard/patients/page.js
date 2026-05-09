"use client";
import { useEffect, useState } from "react";
import { FaSearch, FaChevronDown, FaChevronUp } from "react-icons/fa";
import { toast } from "react-toastify";

export default function PatientsPage() {
  const [patients, setPatients] = useState([]);
  const [search, setSearch] = useState("");
  const [expanded, setExpanded] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (!userId) return;
    fetch(`/api/vet/patients?userId=${userId}`)
      .then(r => r.json())
      .then(d => { if (d.success) setPatients(d.data); })
      .catch(() => toast.error("Failed to load patients"))
      .finally(() => setLoading(false));
  }, []);

  const filtered = patients.filter(p =>
    p.pet?.name?.toLowerCase().includes(search.toLowerCase()) ||
    p.pet?.species?.toLowerCase().includes(search.toLowerCase()) ||
    p.owner?.fullName?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <h1 className="text-3xl font-extrabold text-slate-800 mb-2">Patient Records</h1>
      <p className="text-slate-500 mb-8">All pets you have treated and their consultation history.</p>

      <div className="relative mb-6 max-w-md">
        <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          value={search} onChange={e => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-3 border rounded-xl bg-white shadow-sm"
          placeholder="Search by pet name, species or owner..."
        />
      </div>

      {loading ? (
        <div className="text-center animate-pulse text-slate-400 py-20">Loading patients...</div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl border text-slate-400">No patient records found.</div>
      ) : (
        <div className="space-y-4">
          {filtered.map((p, i) => (
            <div key={i} className="bg-white rounded-2xl border shadow-sm overflow-hidden">
              <div
                className="p-5 flex justify-between items-center cursor-pointer hover:bg-slate-50 transition"
                onClick={() => setExpanded(expanded === i ? null : i)}
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center text-2xl">🐾</div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-800">{p.pet?.name}</h3>
                    <p className="text-sm text-slate-500">{p.pet?.species} · {p.pet?.breed} · {p.pet?.age} yrs · {p.pet?.weight} kg</p>
                    <p className="text-xs text-slate-400 mt-0.5">Owner: {p.owner?.fullName}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-bold">
                    {p.consultations?.length} Visits
                  </span>
                  {expanded === i ? <FaChevronUp className="text-slate-400" /> : <FaChevronDown className="text-slate-400" />}
                </div>
              </div>

              {expanded === i && (
                <div className="border-t p-5 bg-slate-50">
                  <h4 className="font-semibold text-slate-700 mb-3">Consultation Timeline</h4>
                  <div className="relative pl-6 border-l-2 border-blue-200 space-y-4">
                    {p.consultations.map((c, ci) => (
                      <div key={ci} className="relative">
                        <div className="absolute -left-[27px] w-4 h-4 bg-blue-500 rounded-full border-2 border-white" />
                        <div className="bg-white rounded-xl p-4 shadow-sm border">
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-sm font-bold text-slate-700">{new Date(c.date).toLocaleDateString()}</span>
                            <span className={`px-2 py-0.5 rounded-full text-xs ${c.status === "COMPLETED" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>{c.status}</span>
                          </div>
                          <p className="text-xs text-slate-500">Visit: {c.visitType}</p>
                          {c.symptoms?.length > 0 && (
                            <div className="flex gap-2 mt-2 flex-wrap">
                              {c.symptoms.map(s => <span key={s} className="px-2 py-0.5 bg-red-50 text-red-600 rounded-full text-xs">{s}</span>)}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
