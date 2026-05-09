"use client";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

export default function AvailabilityPage() {
  const [form, setForm] = useState({
    workingDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    slots: [{ startTime: "09:00", endTime: "10:00" }],
    breakTimes: [{ startTime: "13:00", endTime: "14:00" }],
    isEmergencyAvailable: false,
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    fetch(`/api/vet/availability?userId=${userId}`)
      .then(r => r.json())
      .then(d => { if (d.success && d.data._id) setForm(d.data); });
  }, []);

  const toggleDay = (day) => {
    setForm(f => ({
      ...f,
      workingDays: f.workingDays.includes(day) ? f.workingDays.filter(d => d !== day) : [...f.workingDays, day]
    }));
  };

  const addSlot = () => setForm(f => ({ ...f, slots: [...f.slots, { startTime: "09:00", endTime: "10:00" }] }));
  const removeSlot = (i) => setForm(f => ({ ...f, slots: f.slots.filter((_, idx) => idx !== i) }));

  const handleSave = async () => {
    setSaving(true);
    try {
      const userId = localStorage.getItem("userId");
      const res = await fetch("/api/vet/availability", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, ...form }),
      });
      const d = await res.json();
      if (d.success) toast.success("Availability saved successfully!");
      else toast.error(d.message);
    } catch { toast.error("Failed to save"); }
    finally { setSaving(false); }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-extrabold text-slate-800 mb-2">Availability & Scheduling</h1>
      <p className="text-slate-500 mb-8">Set your working days, time slots and emergency availability.</p>

      <div className="space-y-6">
        {/* Working Days */}
        <div className="bg-white rounded-2xl border p-6 shadow-sm">
          <h2 className="font-bold text-slate-700 mb-4 text-lg">Working Days</h2>
          <div className="flex flex-wrap gap-3">
            {DAYS.map(d => (
              <button key={d} onClick={() => toggleDay(d)}
                className={`px-4 py-2 rounded-full text-sm font-semibold border transition ${form.workingDays.includes(d) ? "bg-blue-600 text-white border-blue-600" : "bg-white text-slate-600 border-slate-200 hover:border-blue-300"}`}>
                {d}
              </button>
            ))}
          </div>
        </div>

        {/* Time Slots */}
        <div className="bg-white rounded-2xl border p-6 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-bold text-slate-700 text-lg">Time Slots</h2>
            <button onClick={addSlot} className="px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg text-sm font-bold hover:bg-blue-100 transition">+ Add Slot</button>
          </div>
          <div className="space-y-3">
            {form.slots.map((slot, i) => (
              <div key={i} className="flex items-center gap-4">
                <input type="time" value={slot.startTime}
                  onChange={e => setForm(f => ({ ...f, slots: f.slots.map((s, si) => si === i ? { ...s, startTime: e.target.value } : s) }))}
                  className="border rounded-lg px-3 py-2 text-sm" />
                <span className="text-slate-400">to</span>
                <input type="time" value={slot.endTime}
                  onChange={e => setForm(f => ({ ...f, slots: f.slots.map((s, si) => si === i ? { ...s, endTime: e.target.value } : s) }))}
                  className="border rounded-lg px-3 py-2 text-sm" />
                <button onClick={() => removeSlot(i)} className="text-red-400 hover:text-red-600 text-sm font-bold">Remove</button>
              </div>
            ))}
          </div>
        </div>

        {/* Emergency Toggle */}
        <div className="bg-white rounded-2xl border p-6 shadow-sm flex justify-between items-center">
          <div>
            <h2 className="font-bold text-slate-700">Emergency Availability</h2>
            <p className="text-sm text-slate-400 mt-1">Allow pet owners to book emergency consultations outside your slot hours.</p>
          </div>
          <button
            onClick={() => setForm(f => ({ ...f, isEmergencyAvailable: !f.isEmergencyAvailable }))}
            className={`w-14 h-7 rounded-full transition relative ${form.isEmergencyAvailable ? "bg-green-500" : "bg-slate-200"}`}>
            <span className={`absolute top-1 transition-all w-5 h-5 rounded-full bg-white shadow ${form.isEmergencyAvailable ? "left-8" : "left-1"}`} />
          </button>
        </div>

        <button onClick={handleSave} disabled={saving}
          className="w-full py-4 bg-blue-600 text-white rounded-2xl font-extrabold text-lg hover:bg-blue-700 transition disabled:opacity-60">
          {saving ? "Saving..." : "Save Availability"}
        </button>
      </div>
    </div>
  );
}
