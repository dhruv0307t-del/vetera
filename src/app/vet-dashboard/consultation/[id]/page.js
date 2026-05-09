"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { toast } from "react-toastify";

export default function ConsultationPanel() {
  const params = useParams();
  const appointmentId = params?.id;
  const [form, setForm] = useState({ notes: "", diagnosis: "", recommendations: "" });
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!appointmentId) return;
    fetch(`/api/vet/consultation/${appointmentId}`)
      .then(r => r.json())
      .then(d => { if (d.success && d.data?.notes) setForm(d.data); });
  }, [appointmentId]);

  const handleSave = async () => {
    setSaving(true);
    try {
      const doctorId = localStorage.getItem("doctorId");
      const res = await fetch(`/api/vet/consultation/${appointmentId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ doctorId, ...form }),
      });
      const d = await res.json();
      if (d.success) { toast.success("Consultation notes saved!"); setSaved(true); }
      else toast.error(d.message);
    } catch { toast.error("Save failed"); }
    finally { setSaving(false); }
  };

  const Field = ({ label, name, rows = 5 }) => (
    <div>
      <label className="block text-sm font-semibold text-slate-600 mb-2">{label}</label>
      <textarea name={name} value={form[name] || ""} rows={rows}
        onChange={e => setForm(f => ({ ...f, [name]: e.target.value }))}
        className="w-full px-4 py-3 border rounded-xl bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-300 text-sm resize-none"
        placeholder={`Enter ${label.toLowerCase()}...`} />
    </div>
  );

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <div className="flex items-center gap-3 mb-2">
        <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-bold">Consultation Panel</span>
        {saved && <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold">✓ Report Saved</span>}
      </div>
      <h1 className="text-3xl font-extrabold text-slate-800 mb-2">Active Consultation</h1>
      <p className="text-slate-500 mb-8">Document your notes, diagnosis and prescription for this appointment.</p>

      <div className="bg-white rounded-2xl border shadow-sm p-8 space-y-6">
        <Field label="Doctor Notes" name="notes" rows={4} />
        <Field label="Diagnosis" name="diagnosis" rows={4} />
        <Field label="Recommendations & Prescription" name="recommendations" rows={5} />

        <div>
          <label className="block text-sm font-semibold text-slate-600 mb-2">Prescription PDF URL</label>
          <input type="url" value={form.prescriptionUrl || ""} placeholder="https://cloudinary.com/..."
            onChange={e => setForm(f => ({ ...f, prescriptionUrl: e.target.value }))}
            className="w-full px-4 py-3 border rounded-xl bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-300 text-sm" />
          <p className="text-xs text-slate-400 mt-1">Paste a Cloudinary or S3 link to the PDF prescription.</p>
        </div>

        <button onClick={handleSave} disabled={saving}
          className="w-full py-4 bg-purple-600 text-white rounded-2xl font-extrabold text-lg hover:bg-purple-700 transition disabled:opacity-60">
          {saving ? "Saving..." : "Save & Generate Report"}
        </button>
      </div>
    </div>
  );
}
