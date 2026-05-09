"use client";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { FaCheckCircle, FaTimesCircle, FaClock, FaShieldAlt, FaUpload } from "react-icons/fa";

const DocCard = ({ title, url, onReupload }) => (
  <div className="bg-white rounded-2xl border p-5 shadow-sm hover:shadow-md transition">
    <h3 className="font-bold text-slate-700 mb-3">{title}</h3>
    {url ? (
      <a href={url} target="_blank" className="text-blue-600 hover:underline text-sm font-medium">View Document →</a>
    ) : (
      <p className="text-sm text-slate-400">No document uploaded</p>
    )}
    <button
      onClick={() => onReupload(title)}
      className="mt-4 w-full flex items-center justify-center gap-2 py-2 border-2 border-dashed border-blue-300 text-blue-500 rounded-xl text-sm hover:bg-blue-50 transition"
    >
      <FaUpload /> Re-upload
    </button>
  </div>
);

export default function DocumentsPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    fetch(`/api/vet/documents?userId=${userId}`)
      .then(r => r.json())
      .then(d => { if (d.success) setData(d.data); })
      .catch(() => toast.error("Failed to load documents"))
      .finally(() => setLoading(false));
  }, []);

  const handleReupload = (docTitle) => {
    toast.info(`Re-upload flow for "${docTitle}" — integrate Cloudinary widget here.`);
  };

  const statusConfig = {
    APPROVED: { icon: <FaCheckCircle className="text-green-500 text-2xl" />, label: "Verified", color: "bg-green-50 border-green-200 text-green-700" },
    PENDING: { icon: <FaClock className="text-yellow-500 text-2xl" />, label: "Under Review", color: "bg-yellow-50 border-yellow-200 text-yellow-700" },
    REJECTED: { icon: <FaTimesCircle className="text-red-500 text-2xl" />, label: "Rejected", color: "bg-red-50 border-red-200 text-red-700" },
  };

  const s = statusConfig[data?.verificationStatus] || statusConfig.PENDING;

  if (loading) return <div className="p-10 text-center animate-pulse text-slate-400">Loading...</div>;

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <h1 className="text-3xl font-extrabold text-slate-800 mb-2">Documents & Verification</h1>
      <p className="text-slate-500 mb-8">Manage your uploaded credentials and KYC status.</p>

      {/* Status Banner */}
      <div className={`flex items-center gap-4 p-5 rounded-2xl border mb-8 ${s.color}`}>
        {s.icon}
        <div>
          <p className="font-bold text-lg">KYC Status: {s.label}</p>
          {data?.verificationStatus === "APPROVED" && (
            <p className="text-sm flex items-center gap-1 mt-1"><FaShieldAlt /> Your profile is publicly visible.</p>
          )}
          {data?.adminRemarks && (
            <p className="text-sm mt-1"><strong>Admin Note:</strong> {data.adminRemarks}</p>
          )}
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <DocCard title="Degree Certificate" url={data?.documents?.degreeCertificate} onReupload={handleReupload} />
        <DocCard title="License Certificate" url={data?.documents?.licenseCertificate} onReupload={handleReupload} />
        <DocCard title="Government ID" url={data?.documents?.governmentId} onReupload={handleReupload} />
      </div>
    </div>
  );
}
