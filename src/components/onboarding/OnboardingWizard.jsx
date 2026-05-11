"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FaCheckCircle, FaExclamationCircle, FaCloudUploadAlt, FaSave, FaArrowRight, FaArrowLeft } from "react-icons/fa";

export default function OnboardingWizard() {
  const router = useRouter();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [step, setStep] = useState(1);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await fetch("/api/onboard");
      const result = await res.json();
      if (result.success) {
        if (result.data.isUserApproved === true) {
          if (result.data.role === "Veterinary Doctor") {
            router.push("/vet-dashboard");
            return;
          } else if (result.data.role === "Grooming Shop") {
            router.push("/grooming-dashboard");
            return;
          }
        }
        setProfile(result.data);
      }
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  };

  const handleSave = async (statusUpdate = null) => {
    setSaving(true);
    try {
      const payload = { ...profile };
      if (statusUpdate) payload.status = statusUpdate;
      
      const res = await fetch("/api/onboard", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const result = await res.json();
      if (result.success) {
        setProfile(result.data);
        if (statusUpdate === "PENDING") {
          alert("Profile submitted for verification successfully!");
        }
      }
    } catch (e) {
      alert("Error saving progress");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-slate-50"><p>Loading Onboarding Data...</p></div>;

  if (profile?.status === "PENDING" || profile?.status === "UNDER_REVIEW") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
        <div className="bg-white p-8 rounded-2xl shadow-xl max-w-lg text-center">
          <FaCheckCircle className="text-6xl text-emerald-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Profile Under Verification</h2>
          <p className="text-slate-600 mb-6">Your professional profile has been submitted and is currently being reviewed by our administrative team. We will notify you once approved.</p>
          <button onClick={() => router.push("/")} className="px-6 py-2 bg-slate-800 text-white rounded-lg hover:bg-slate-700">Return Home</button>
        </div>
      </div>
    );
  }

  const isVet = profile?.role === "Veterinary Doctor";
  const isGrooming = profile?.role === "Grooming Shop";

  const renderVetFields = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1">Registration Number</label>
          <input className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" 
            value={profile.vetDetails?.registrationNumber || ""}
            onChange={e => setProfile({...profile, vetDetails: {...profile.vetDetails, registrationNumber: e.target.value}})} />
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1">License Number</label>
          <input className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" 
            value={profile.vetDetails?.licenseNumber || ""}
            onChange={e => setProfile({...profile, vetDetails: {...profile.vetDetails, licenseNumber: e.target.value}})} />
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1">Veterinary Council</label>
          <input className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" 
            value={profile.vetDetails?.council || ""}
            onChange={e => setProfile({...profile, vetDetails: {...profile.vetDetails, council: e.target.value}})} />
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1">Experience (Years)</label>
          <input type="number" className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" 
            value={profile.vetDetails?.experience || ""}
            onChange={e => setProfile({...profile, vetDetails: {...profile.vetDetails, experience: e.target.value}})} />
        </div>
      </div>
      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-1">Clinic Name</label>
        <input className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" 
          value={profile.vetDetails?.clinicName || ""}
          onChange={e => setProfile({...profile, vetDetails: {...profile.vetDetails, clinicName: e.target.value}})} />
      </div>
    </div>
  );

  const renderGroomingFields = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1">Shop Name</label>
          <input className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" 
            value={profile.groomingDetails?.shopName || ""}
            onChange={e => setProfile({...profile, groomingDetails: {...profile.groomingDetails, shopName: e.target.value}})} />
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1">Registration Number</label>
          <input className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" 
            value={profile.groomingDetails?.registrationNumber || ""}
            onChange={e => setProfile({...profile, groomingDetails: {...profile.groomingDetails, registrationNumber: e.target.value}})} />
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1">Experience (Years)</label>
          <input type="number" className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" 
            value={profile.groomingDetails?.experience || ""}
            onChange={e => setProfile({...profile, groomingDetails: {...profile.groomingDetails, experience: e.target.value}})} />
        </div>
      </div>
    </div>
  );

  const renderUploads = () => (
    <div className="space-y-6">
      <p className="text-slate-500 text-sm mb-4">Please upload the required documents securely. (Simulated mock uploads for UI)</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="border-2 border-dashed border-slate-300 rounded-xl p-6 text-center hover:bg-slate-50 transition-colors cursor-pointer">
          <FaCloudUploadAlt className="text-4xl text-blue-500 mx-auto mb-2" />
          <p className="text-sm font-semibold text-slate-700">Government ID Proof</p>
          <p className="text-xs text-slate-400">PDF, JPG, PNG up to 5MB</p>
        </div>
        {isVet && (
          <div className="border-2 border-dashed border-slate-300 rounded-xl p-6 text-center hover:bg-slate-50 transition-colors cursor-pointer">
            <FaCloudUploadAlt className="text-4xl text-blue-500 mx-auto mb-2" />
            <p className="text-sm font-semibold text-slate-700">Veterinary License</p>
            <p className="text-xs text-slate-400">PDF, JPG, PNG up to 5MB</p>
          </div>
        )}
        {isGrooming && (
          <div className="border-2 border-dashed border-slate-300 rounded-xl p-6 text-center hover:bg-slate-50 transition-colors cursor-pointer">
            <FaCloudUploadAlt className="text-4xl text-blue-500 mx-auto mb-2" />
            <p className="text-sm font-semibold text-slate-700">Business License</p>
            <p className="text-xs text-slate-400">PDF, JPG, PNG up to 5MB</p>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Header */}
        <div className="bg-dark-blue p-8 text-white">
          <h1 className="text-3xl font-titillium font-bold mb-2">Professional Onboarding</h1>
          <p className="text-blue-200">Complete your {profile?.role} profile to unlock full platform access.</p>
          
          <div className="mt-8 flex items-center justify-between">
            <div className="flex gap-2">
              <div className={`h-2 w-16 rounded-full ${step >= 1 ? 'bg-blue-400' : 'bg-blue-900'}`}></div>
              <div className={`h-2 w-16 rounded-full ${step >= 2 ? 'bg-blue-400' : 'bg-blue-900'}`}></div>
              <div className={`h-2 w-16 rounded-full ${step >= 3 ? 'bg-blue-400' : 'bg-blue-900'}`}></div>
            </div>
            <span className="text-sm font-bold">{Math.round((step / 3) * 100)}% Complete</span>
          </div>
        </div>

        {/* Content */}
        <div className="p-8">
          {step === 1 && (
            <div>
              <h2 className="text-xl font-bold text-slate-800 mb-6">Step 1: Professional Details</h2>
              {isVet && renderVetFields()}
              {isGrooming && renderGroomingFields()}
            </div>
          )}
          {step === 2 && (
            <div>
              <h2 className="text-xl font-bold text-slate-800 mb-6">Step 2: Document Verification</h2>
              {renderUploads()}
            </div>
          )}
          {step === 3 && (
            <div>
              <h2 className="text-xl font-bold text-slate-800 mb-6">Step 3: Review & Submit</h2>
              <div className="bg-amber-50 border border-amber-200 p-4 rounded-lg flex items-start gap-3">
                <FaExclamationCircle className="text-amber-500 text-xl flex-shrink-0 mt-0.5" />
                <p className="text-sm text-amber-800">Please verify all information is accurate. False information or invalid documents may lead to account suspension. Once submitted, changes cannot be made until admin review is complete.</p>
              </div>
            </div>
          )}

          {/* Footer Navigation */}
          <div className="mt-10 pt-6 border-t border-slate-100 flex items-center justify-between">
            <button onClick={() => handleSave()} disabled={saving} className="flex items-center gap-2 text-slate-500 hover:text-slate-800 font-medium">
              <FaSave /> {saving ? "Saving..." : "Save Draft"}
            </button>
            
            <div className="flex gap-4">
              {step > 1 && (
                <button onClick={() => setStep(s => s - 1)} className="px-6 py-2.5 border border-slate-300 text-slate-700 font-bold rounded-xl hover:bg-slate-50 flex items-center gap-2">
                  <FaArrowLeft /> Back
                </button>
              )}
              {step < 3 ? (
                <button onClick={() => setStep(s => s + 1)} className="px-6 py-2.5 bg-dark-blue text-white font-bold rounded-xl hover:bg-blue-900 flex items-center gap-2">
                  Next <FaArrowRight />
                </button>
              ) : (
                <button onClick={() => handleSave("PENDING")} className="px-6 py-2.5 bg-emerald-600 text-white font-bold rounded-xl hover:bg-emerald-500 shadow-lg shadow-emerald-500/20">
                  Submit for Verification
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
