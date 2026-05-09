"use client";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function VetSettingsPage() {
  const [form, setForm] = useState({
    bio: "", clinicName: "", clinicAddress: "",
    consultationFee: "", homeVisitFee: "",
    isProfileVisible: true,
    availableConsultationTypes: ["ONLINE", "OFFLINE"],
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    fetch(`/api/vet/documents?userId=${userId}`)
      .then(r => r.json())
      .then(d => {
        if (d.success) setForm(prev => ({ ...prev, ...d.data }));
      });
  }, []);

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setForm(f => ({ ...f, [name]: type === "checkbox" ? checked : value }));
  };

  const toggleConsultType = (type) => {
    setForm(f => ({
      ...f,
      availableConsultationTypes: f.availableConsultationTypes.includes(type)
        ? f.availableConsultationTypes.filter(t => t !== type)
        : [...f.availableConsultationTypes, type]
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const userId = localStorage.getItem("userId");
      const res = await fetch("/api/vet/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, ...form }),
      });
      const d = await res.json();
      if (d.success) toast.success("Profile updated successfully!");
      else toast.error(d.message);
    } catch { toast.error("Failed to save settings"); }
    finally { setSaving(false); }
  };

  const Field = ({ label, name, type = "text", placeholder }) => (
    <div>
      <label className="block text-sm font-semibold text-slate-600 mb-2">{label}</label>
      <input type={type} name={name} value={form[name] || ""} onChange={handleChange} placeholder={placeholder}
        className="w-full px-4 py-3 border rounded-xl bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300 text-sm" />
    </div>
  );

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h1 className="text-3xl font-extrabold text-slate-800 mb-2">Profile & Settings</h1>
      <p className="text-slate-500 mb-8">Update your public profile, fees, and consultation preferences.</p>

      <div className="space-y-6">
        {/* Bio */}
        <div className="bg-white rounded-2xl border p-6 shadow-sm space-y-4">
          <h2 className="font-bold text-slate-700 text-lg">Practice Details</h2>
          <Field label="Clinic Name" name="clinicName" placeholder="e.g. Happy Paws Clinic" />
          <Field label="Clinic Address" name="clinicAddress" placeholder="Full address" />
          <div>
            <label className="block text-sm font-semibold text-slate-600 mb-2">Bio / About</label>
            <textarea name="bio" value={form.bio || ""} onChange={handleChange} rows={4}
              placeholder="Tell pet owners about your specialization and experience..."
              className="w-full px-4 py-3 border rounded-xl bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300 text-sm" />
          </div>
        </div>

        {/* Fees */}
        <div className="bg-white rounded-2xl border p-6 shadow-sm space-y-4">
          <h2 className="font-bold text-slate-700 text-lg">Consultation Fees (₹)</h2>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Standard Fee" name="consultationFee" type="number" placeholder="500" />
            <Field label="Home Visit Fee" name="homeVisitFee" type="number" placeholder="1000" />
          </div>
        </div>

        {/* Consultation Types */}
        <div className="bg-white rounded-2xl border p-6 shadow-sm">
          <h2 className="font-bold text-slate-700 text-lg mb-4">Consultation Types</h2>
          <div className="flex gap-3">
            {["ONLINE", "OFFLINE", "HOME_VISIT"].map(type => (
              <button key={type} onClick={() => toggleConsultType(type)}
                className={`px-4 py-2 rounded-full text-sm font-semibold border transition ${form.availableConsultationTypes?.includes(type) ? "bg-blue-600 text-white border-blue-600" : "bg-white text-slate-600 border-slate-200 hover:border-blue-300"}`}>
                {type.replace("_", " ")}
              </button>
            ))}
          </div>
        </div>

        {/* Visibility */}
        <div className="bg-white rounded-2xl border p-6 shadow-sm flex items-center justify-between">
          <div>
            <h2 className="font-bold text-slate-700">Profile Visibility</h2>
            <p className="text-sm text-slate-400 mt-1">Show your profile in the public vet directory.</p>
          </div>
          <button onClick={() => setForm(f => ({ ...f, isProfileVisible: !f.isProfileVisible }))}
            className={`w-14 h-7 rounded-full transition relative ${form.isProfileVisible ? "bg-green-500" : "bg-slate-200"}`}>
            <span className={`absolute top-1 transition-all w-5 h-5 rounded-full bg-white shadow ${form.isProfileVisible ? "left-8" : "left-1"}`} />
          </button>
        </div>

        <button onClick={handleSave} disabled={saving}
          className="w-full py-4 bg-blue-600 text-white rounded-2xl font-extrabold text-lg hover:bg-blue-700 transition disabled:opacity-60">
          {saving ? "Saving..." : "Save Settings"}
        </button>
      </div>
    </div>
  );
}
