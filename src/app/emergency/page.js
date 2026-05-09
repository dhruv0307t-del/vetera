"use client";
import { useState } from "react";
import Link from "next/link";

const EMERGENCY_TYPES = [
  { value: "INJURY",    label: "Injury / Wound",     icon: "🩹", color: "#ef4444" },
  { value: "ILLNESS",   label: "Sudden Illness",      icon: "🤒", color: "#f97316" },
  { value: "ACCIDENT",  label: "Accident / Hit",      icon: "🚗", color: "#dc2626" },
  { value: "POISONING", label: "Poisoning / Toxin",   icon: "☠️", color: "#7c3aed" },
  { value: "BREATHING", label: "Breathing Problem",   icon: "😮‍💨", color: "#2563eb" },
  { value: "LOST_PET",  label: "Lost Pet",            icon: "🔍", color: "#0891b2" },
  { value: "STRAY",     label: "Stray / Abandoned",   icon: "🐾", color: "#059669" },
  { value: "OTHER",     label: "Other Emergency",     icon: "🆘", color: "#64748b" },
];

const SYMPTOMS = ["Vomiting", "Diarrhea", "Seizures", "Unconscious", "Bleeding", "Limping", "Not eating", "Difficulty breathing", "Swollen body", "Pale gums", "Eye discharge", "Crying in pain"];
const PET_TYPES = ["Dog", "Cat", "Bird", "Rabbit", "Fish", "Turtle", "Hamster", "Other"];
const SEVERITY = [
  { value: "MILD",     label: "Mild",     desc: "Uncomfortable but stable",  color: "#f59e0b", bg: "#fef3c7" },
  { value: "MODERATE", label: "Moderate", desc: "Needs attention soon",      color: "#f97316", bg: "#ffedd5" },
  { value: "CRITICAL", label: "Critical", desc: "Life-threatening, urgent!", color: "#ef4444", bg: "#fee2e2" },
];

const HELPLINE_NUMBERS = [
  { name: "Animal Welfare Board of India", number: "1962", icon: "🏛️" },
  { name: "Wildlife SOS Emergency", number: "9871963535", icon: "🦁" },
  { name: "Blue Cross of India", number: "044-22354959", icon: "🐕" },
  { name: "PETA India", number: "1800-2000-247", icon: "🐾" },
];

const FIRST_AID_TIPS = [
  { title: "Stay Calm", desc: "Keep yourself and the pet calm. Panicking worsens the situation.", icon: "🧘" },
  { title: "Don't Move", desc: "If spinal injury is suspected, avoid moving the animal.", icon: "🛑" },
  { title: "Control Bleeding", desc: "Apply gentle pressure with a clean cloth.", icon: "🩸" },
  { title: "No Human Meds", desc: "Never give human medicines to pets — they can be toxic.", icon: "⚠️" },
  { title: "Keep Warm", desc: "Cover with a blanket to prevent shock.", icon: "🌡️" },
  { title: "Call a Vet", desc: "Call a vet immediately — don't wait for symptoms to worsen.", icon: "📞" },
];

export default function EmergencyPage() {
  const [step, setStep] = useState(1); // 1=type, 2=pet, 3=details, 4=contact, 5=success
  const [form, setForm] = useState({
    emergencyType: "", severity: "MODERATE", petName: "", petType: "", petBreed: "", petAge: "", petColor: "",
    description: "", symptoms: [], address: "", city: "", state: "", pinCode: "",
    reporterName: "", reporterPhone: "", reporterEmail: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const set = (k, v) => setForm(p => ({ ...p, [k]: v }));
  const toggleSymptom = (s) => set("symptoms", form.symptoms.includes(s) ? form.symptoms.filter(x => x !== s) : [...form.symptoms, s]);

  const submit = async () => {
    if (!form.reporterName || !form.reporterPhone || !form.city) return;
    setSubmitting(true);
    try {
      await fetch("/api/emergency", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    } catch {}
    setSubmitting(false);
    setStep(5);
  };

  const selType = EMERGENCY_TYPES.find(t => t.value === form.emergencyType);
  const selSev = SEVERITY.find(s => s.value === form.severity);

  if (step === 5) return (
    <div style={{ minHeight: "100vh", background: "#fff5f5", paddingTop: 72, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ textAlign: "center", padding: "48px 32px", maxWidth: 480 }}>
        <div style={{ fontSize: 80, marginBottom: 16 }}>✅</div>
        <h2 style={{ color: "#15803d", fontSize: 28, fontWeight: 800, marginBottom: 8 }}>Report Submitted!</h2>
        <p style={{ color: "#475569", fontSize: 15, lineHeight: 1.7, marginBottom: 24 }}>Your emergency report has been received. Our team will contact you at <b>{form.reporterPhone}</b> shortly. Please keep your phone reachable.</p>
        <div style={{ background: "#fef2f2", border: "1px solid #fecaca", borderRadius: 12, padding: "16px 20px", marginBottom: 24, textAlign: "left" }}>
          <div style={{ color: "#dc2626", fontWeight: 700, marginBottom: 8 }}>📞 Call a helpline now:</div>
          {HELPLINE_NUMBERS.slice(0, 2).map(h => (
            <div key={h.number} style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", borderBottom: "1px solid #fee2e2", color: "#374151", fontSize: 13 }}>
              <span>{h.icon} {h.name}</span><b style={{ color: "#dc2626" }}>{h.number}</b>
            </div>
          ))}
        </div>
        <Link href="/" style={{ display: "inline-block", padding: "12px 28px", background: "#dc2626", color: "#fff", borderRadius: 12, fontWeight: 700, textDecoration: "none", fontSize: 14 }}>← Back to Home</Link>
      </div>
    </div>
  );

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #fff5f5 0%, #fef2f2 50%, #fff7ed 100%)", paddingTop: 72, fontFamily: "Inter, sans-serif" }}>
      {/* Hero */}
      <div style={{ background: "linear-gradient(135deg, #dc2626, #b91c1c)", color: "#fff", padding: "40px 20px", textAlign: "center" }}>
        <div style={{ fontSize: 56, marginBottom: 8 }}>🚨</div>
        <h1 style={{ fontSize: "clamp(24px, 5vw, 40px)", fontWeight: 900, margin: "0 0 8px", letterSpacing: "-0.02em" }}>Pet Emergency Help</h1>
        <p style={{ color: "#fecaca", fontSize: 15, margin: "0 0 24px" }}>Report a pet emergency instantly. Trained vets will respond ASAP.</p>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 10 }}>
          {HELPLINE_NUMBERS.map(h => (
            <a key={h.number} href={`tel:${h.number}`} style={{ background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.3)", borderRadius: 10, padding: "8px 16px", color: "#fff", textDecoration: "none", fontSize: 13, fontWeight: 600, backdropFilter: "blur(4px)" }}>
              {h.icon} {h.number}
            </a>
          ))}
        </div>
      </div>

      <div className="emergGrid" style={{ maxWidth: 1160, margin: "0 auto", padding: "32px 16px", display: "grid", gridTemplateColumns: "1fr 340px", gap: 24, alignItems: "start" }}>
        {/* Form card */}
        <div style={{ background: "#fff", borderRadius: 20, border: "1.5px solid #fee2e2", boxShadow: "0 4px 24px rgba(220,38,38,0.08)", overflow: "hidden" }}>
          {/* Progress */}
          <div style={{ background: "#fef2f2", padding: "16px 24px", borderBottom: "1px solid #fee2e2", display: "flex", alignItems: "center", gap: 8 }}>
            {[1,2,3,4].map(n => (
              <div key={n} style={{ display: "flex", alignItems: "center", gap: 6, flex: n < 4 ? 1 : 0 }}>
                <div style={{ width: 28, height: 28, borderRadius: "50%", background: step > n ? "#16a34a" : step === n ? "#dc2626" : "#e5e7eb", color: step >= n ? "#fff" : "#9ca3af", fontWeight: 700, fontSize: 12, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  {step > n ? "✓" : n}
                </div>
                <span style={{ fontSize: 12, color: step === n ? "#dc2626" : "#9ca3af", fontWeight: step === n ? 700 : 400, display: n < 4 ? "block" : "none" }}>
                  {["Emergency Type","Pet Info","Details","Your Contact"][n-1]}
                </span>
                {n < 4 && <div style={{ flex: 1, height: 2, background: step > n ? "#16a34a" : "#e5e7eb", borderRadius: 2 }} />}
              </div>
            ))}
          </div>

          <div style={{ padding: 28 }}>
            {/* STEP 1 — Emergency Type */}
            {step === 1 && (
              <div>
                <h2 style={{ color: "#1e293b", fontSize: 20, fontWeight: 800, marginBottom: 6 }}>What is the emergency?</h2>
                <p style={{ color: "#64748b", fontSize: 14, marginBottom: 20 }}>Select the type of emergency your pet is facing.</p>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: 12, marginBottom: 24 }}>
                  {EMERGENCY_TYPES.map(t => (
                    <button key={t.value} onClick={() => set("emergencyType", t.value)} style={{
                      padding: "16px 12px", borderRadius: 14, border: `2px solid ${form.emergencyType === t.value ? t.color : "#e5e7eb"}`,
                      background: form.emergencyType === t.value ? `${t.color}12` : "#fafafa",
                      cursor: "pointer", textAlign: "center", transition: "all 0.2s",
                      transform: form.emergencyType === t.value ? "scale(1.03)" : "scale(1)",
                    }}>
                      <div style={{ fontSize: 28, marginBottom: 6 }}>{t.icon}</div>
                      <div style={{ color: form.emergencyType === t.value ? t.color : "#374151", fontWeight: 700, fontSize: 13 }}>{t.label}</div>
                    </button>
                  ))}
                </div>
                <div style={{ marginBottom: 20 }}>
                  <div style={{ color: "#374151", fontWeight: 700, marginBottom: 12, fontSize: 14 }}>Severity Level</div>
                  <div style={{ display: "flex", gap: 10 }}>
                    {SEVERITY.map(s => (
                      <button key={s.value} onClick={() => set("severity", s.value)} style={{
                        flex: 1, padding: "14px 10px", borderRadius: 12,
                        border: `2px solid ${form.severity === s.value ? s.color : "#e5e7eb"}`,
                        background: form.severity === s.value ? s.bg : "#fafafa",
                        cursor: "pointer", textAlign: "center", transition: "all 0.2s",
                      }}>
                        <div style={{ color: s.color, fontWeight: 800, fontSize: 14 }}>{s.label}</div>
                        <div style={{ color: "#64748b", fontSize: 11, marginTop: 4 }}>{s.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>
                <button onClick={() => form.emergencyType && setStep(2)} style={{ width: "100%", padding: 14, borderRadius: 12, background: form.emergencyType ? "#dc2626" : "#e5e7eb", color: form.emergencyType ? "#fff" : "#9ca3af", fontWeight: 700, fontSize: 15, border: "none", cursor: form.emergencyType ? "pointer" : "not-allowed" }}>
                  Next: Pet Information →
                </button>
              </div>
            )}

            {/* STEP 2 — Pet Info */}
            {step === 2 && (
              <div>
                <h2 style={{ color: "#1e293b", fontSize: 20, fontWeight: 800, marginBottom: 6 }}>Tell us about your pet</h2>
                <p style={{ color: "#64748b", fontSize: 14, marginBottom: 20 }}>This helps the vet prepare before arriving.</p>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 }}>
                  {[["petName","Pet's Name *","e.g. Bruno"],["petBreed","Breed","e.g. Labrador"],["petAge","Age","e.g. 3 years"],["petColor","Color / Markings","e.g. Golden Brown"]].map(([k,label,ph]) => (
                    <div key={k}>
                      <label style={{ color: "#374151", fontSize: 12, fontWeight: 700, display: "block", marginBottom: 6 }}>{label}</label>
                      <input value={form[k]} onChange={e => set(k, e.target.value)} placeholder={ph} style={{ width: "100%", padding: "10px 14px", borderRadius: 10, border: "1.5px solid #e5e7eb", background: "#fafafa", color: "#1e293b", fontSize: 13, outline: "none", boxSizing: "border-box" }} />
                    </div>
                  ))}
                </div>
                <div style={{ marginBottom: 20 }}>
                  <label style={{ color: "#374151", fontSize: 12, fontWeight: 700, display: "block", marginBottom: 8 }}>Pet Type *</label>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {PET_TYPES.map(t => (
                      <button key={t} onClick={() => set("petType", t)} style={{ padding: "7px 16px", borderRadius: 20, border: `1.5px solid ${form.petType === t ? "#dc2626" : "#e5e7eb"}`, background: form.petType === t ? "#fef2f2" : "#fafafa", color: form.petType === t ? "#dc2626" : "#374151", fontWeight: 600, fontSize: 13, cursor: "pointer" }}>{t}</button>
                    ))}
                  </div>
                </div>
                <div style={{ display: "flex", gap: 10 }}>
                  <button onClick={() => setStep(1)} style={{ flex: 1, padding: 14, borderRadius: 12, background: "#f1f5f9", color: "#475569", fontWeight: 700, fontSize: 14, border: "none", cursor: "pointer" }}>← Back</button>
                  <button onClick={() => form.petName && form.petType && setStep(3)} style={{ flex: 2, padding: 14, borderRadius: 12, background: form.petName && form.petType ? "#dc2626" : "#e5e7eb", color: form.petName && form.petType ? "#fff" : "#9ca3af", fontWeight: 700, fontSize: 15, border: "none", cursor: form.petName && form.petType ? "pointer" : "not-allowed" }}>
                    Next: Emergency Details →
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3 — Details */}
            {step === 3 && (
              <div>
                <h2 style={{ color: "#1e293b", fontSize: 20, fontWeight: 800, marginBottom: 6 }}>Describe the situation</h2>
                <p style={{ color: "#64748b", fontSize: 14, marginBottom: 20 }}>Be as detailed as possible. Every detail helps.</p>
                <div style={{ marginBottom: 16 }}>
                  <label style={{ color: "#374151", fontSize: 12, fontWeight: 700, display: "block", marginBottom: 6 }}>What happened? *</label>
                  <textarea value={form.description} onChange={e => set("description", e.target.value)} placeholder="Describe what happened, when it started, any recent changes in behaviour..." rows={4} style={{ width: "100%", padding: "12px 14px", borderRadius: 12, border: "1.5px solid #e5e7eb", background: "#fafafa", color: "#1e293b", fontSize: 14, outline: "none", resize: "vertical", boxSizing: "border-box", fontFamily: "inherit", lineHeight: 1.6 }} />
                </div>
                <div style={{ marginBottom: 16 }}>
                  <label style={{ color: "#374151", fontSize: 12, fontWeight: 700, display: "block", marginBottom: 8 }}>Symptoms observed (select all that apply)</label>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {SYMPTOMS.map(s => (
                      <button key={s} onClick={() => toggleSymptom(s)} style={{ padding: "6px 14px", borderRadius: 20, border: `1.5px solid ${form.symptoms.includes(s) ? "#dc2626" : "#e5e7eb"}`, background: form.symptoms.includes(s) ? "#fef2f2" : "#fafafa", color: form.symptoms.includes(s) ? "#dc2626" : "#374151", fontWeight: 600, fontSize: 12, cursor: "pointer" }}>{s}</button>
                    ))}
                  </div>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 20 }}>
                  {[["address","Address / Landmark","e.g. Near City Hospital"],["city","City *","e.g. Mumbai"],["state","State","e.g. Maharashtra"],["pinCode","PIN Code","e.g. 400001"]].map(([k,label,ph]) => (
                    <div key={k}>
                      <label style={{ color: "#374151", fontSize: 12, fontWeight: 700, display: "block", marginBottom: 6 }}>{label}</label>
                      <input value={form[k]} onChange={e => set(k, e.target.value)} placeholder={ph} style={{ width: "100%", padding: "10px 14px", borderRadius: 10, border: "1.5px solid #e5e7eb", background: "#fafafa", color: "#1e293b", fontSize: 13, outline: "none", boxSizing: "border-box" }} />
                    </div>
                  ))}
                </div>
                <div style={{ display: "flex", gap: 10 }}>
                  <button onClick={() => setStep(2)} style={{ flex: 1, padding: 14, borderRadius: 12, background: "#f1f5f9", color: "#475569", fontWeight: 700, fontSize: 14, border: "none", cursor: "pointer" }}>← Back</button>
                  <button onClick={() => form.description && form.city && setStep(4)} style={{ flex: 2, padding: 14, borderRadius: 12, background: form.description && form.city ? "#dc2626" : "#e5e7eb", color: form.description && form.city ? "#fff" : "#9ca3af", fontWeight: 700, fontSize: 15, border: "none", cursor: form.description && form.city ? "pointer" : "not-allowed" }}>
                    Next: Your Contact →
                  </button>
                </div>
              </div>
            )}

            {/* STEP 4 — Contact */}
            {step === 4 && (
              <div>
                <h2 style={{ color: "#1e293b", fontSize: 20, fontWeight: 800, marginBottom: 6 }}>Your contact details</h2>
                <p style={{ color: "#64748b", fontSize: 14, marginBottom: 20 }}>A vet will call you on this number within minutes.</p>
                <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 20 }}>
                  {[["reporterName","Your Full Name *","e.g. Rahul Sharma"],["reporterPhone","Phone Number *","e.g. 9876543210"],["reporterEmail","Email (optional)","e.g. you@email.com"]].map(([k,label,ph]) => (
                    <div key={k}>
                      <label style={{ color: "#374151", fontSize: 12, fontWeight: 700, display: "block", marginBottom: 6 }}>{label}</label>
                      <input value={form[k]} onChange={e => set(k, e.target.value)} placeholder={ph} type={k === "reporterEmail" ? "email" : k === "reporterPhone" ? "tel" : "text"} style={{ width: "100%", padding: "12px 16px", borderRadius: 12, border: "1.5px solid #e5e7eb", background: "#fafafa", color: "#1e293b", fontSize: 14, outline: "none", boxSizing: "border-box" }} />
                    </div>
                  ))}
                </div>

                {/* Summary */}
                <div style={{ background: "#fef2f2", border: "1px solid #fecaca", borderRadius: 14, padding: "16px 18px", marginBottom: 20 }}>
                  <div style={{ color: "#dc2626", fontWeight: 700, fontSize: 13, marginBottom: 10 }}>📋 Report Summary</div>
                  {[["Emergency", `${selType?.icon} ${selType?.label}`],["Severity", selSev?.label],["Pet", `${form.petName} (${form.petType})`],["Location", form.city],["Symptoms", form.symptoms.length > 0 ? form.symptoms.join(", ") : "None selected"]].map(([k,v]) => (
                    <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: "5px 0", borderBottom: "1px solid #fee2e2", fontSize: 12 }}>
                      <span style={{ color: "#94a3b8" }}>{k}</span>
                      <span style={{ color: "#1e293b", fontWeight: 600, maxWidth: "60%", textAlign: "right" }}>{v}</span>
                    </div>
                  ))}
                </div>

                <div style={{ display: "flex", gap: 10 }}>
                  <button onClick={() => setStep(3)} style={{ flex: 1, padding: 14, borderRadius: 12, background: "#f1f5f9", color: "#475569", fontWeight: 700, fontSize: 14, border: "none", cursor: "pointer" }}>← Back</button>
                  <button onClick={submit} disabled={submitting || !form.reporterName || !form.reporterPhone} style={{
                    flex: 2, padding: 14, borderRadius: 12, fontSize: 15, fontWeight: 800, border: "none",
                    background: form.reporterName && form.reporterPhone ? "linear-gradient(135deg,#dc2626,#b91c1c)" : "#e5e7eb",
                    color: form.reporterName && form.reporterPhone ? "#fff" : "#9ca3af",
                    cursor: form.reporterName && form.reporterPhone ? "pointer" : "not-allowed",
                    boxShadow: form.reporterName && form.reporterPhone ? "0 4px 14px rgba(220,38,38,0.4)" : "none",
                  }}>
                    {submitting ? "Submitting..." : "🚨 Submit Emergency Report"}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right info panel */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {/* Helplines */}
          <div style={{ background: "#fff", border: "1.5px solid #fecaca", borderRadius: 16, padding: 20, boxShadow: "0 2px 12px rgba(220,38,38,0.08)" }}>
            <div style={{ color: "#dc2626", fontWeight: 800, fontSize: 14, marginBottom: 14 }}>📞 Emergency Helplines</div>
            {HELPLINE_NUMBERS.map(h => (
              <a key={h.number} href={`tel:${h.number}`} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: "1px solid #fee2e2", textDecoration: "none" }}>
                <span style={{ color: "#374151", fontSize: 13 }}>{h.icon} {h.name}</span>
                <span style={{ color: "#dc2626", fontWeight: 800, fontSize: 14 }}>{h.number}</span>
              </a>
            ))}
          </div>

          {/* First Aid */}
          <div style={{ background: "#fff", border: "1.5px solid #e2e8f0", borderRadius: 16, padding: 20, boxShadow: "0 2px 12px rgba(0,0,0,0.05)" }}>
            <div style={{ color: "#1e293b", fontWeight: 800, fontSize: 14, marginBottom: 14 }}>🩺 Pet First Aid Tips</div>
            {FIRST_AID_TIPS.map(t => (
              <div key={t.title} style={{ display: "flex", gap: 10, padding: "8px 0", borderBottom: "1px solid #f1f5f9" }}>
                <div style={{ fontSize: 20, flexShrink: 0 }}>{t.icon}</div>
                <div>
                  <div style={{ color: "#1e293b", fontWeight: 700, fontSize: 12 }}>{t.title}</div>
                  <div style={{ color: "#64748b", fontSize: 11, marginTop: 2 }}>{t.desc}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Nearby vets CTA */}
          <Link href="/vets" style={{ display: "block", background: "linear-gradient(135deg,#1d4ed8,#3b82f6)", borderRadius: 14, padding: "18px 20px", textDecoration: "none", textAlign: "center", boxShadow: "0 4px 14px rgba(59,130,246,0.3)" }}>
            <div style={{ color: "#fff", fontSize: 18, fontWeight: 800, marginBottom: 4 }}>🏥 Find Nearby Vets</div>
            <div style={{ color: "#bfdbfe", fontSize: 12 }}>Browse verified veterinarians near you</div>
          </Link>
        </div>
      </div>

      <style>{`
        @media(max-width:900px){
          .emergGrid { grid-template-columns: 1fr !important; }
        }
        input:focus, textarea:focus { border-color: #fca5a5 !important; background: #fff !important; box-shadow: 0 0 0 3px rgba(220,38,38,0.08); }
      `}</style>
    </div>
  );
}
