"use client";
import React, { useEffect, useState } from "react";
import { FaStar, FaRegStar, FaUserMd } from "react-icons/fa";
import Link from "next/link";
import { toast } from "react-toastify";

export default function VetsDirectory() {
  const [vets, setVets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVets = async () => {
      try {
        const res = await fetch("/api/vets");
        const json = await res.json();
        if (json.success) setVets(json.data);
      } catch {
        toast.error("Failed to load veterinary specialists");
      } finally {
        setLoading(false);
      }
    };
    fetchVets();
  }, []);

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
        stars.push(
          i <= Math.round(rating) 
            ? <FaStar key={i} className="text-yellow-500" />
            : <FaRegStar key={i} className="text-gray-300" />
        );
    }
    return <div className="flex gap-1 items-center">{stars} <span className="ml-2 text-sm text-gray-600 font-semibold">{rating.toFixed(1)}/5.0</span></div>;
  };

  if (loading) return <div className="text-center py-20 text-xl font-bold text-gray-500 animate-pulse">Loading Specialists...</div>;

  return (
    <main className="w-full bg-slate-50 min-h-screen py-16 px-6">
      <div className="max-w-[1200px] mx-auto">
        <div className="mb-12 text-center">
            <h1 className="text-4xl md:text-5xl font-extrabold text-blue-950 mb-4 font-titillium tracking-tight">Our Verified Specialists</h1>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">Book an appointment with top-rated professionals verified rigorously by our administration team.</p>
        </div>

        {vets.length === 0 ? (
          <div className="text-center bg-white p-12 rounded-2xl shadow border text-gray-500 text-lg">No approved specialists found. Please check back later!</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {vets.map((vet) => (
              <div key={vet._id} className="bg-white rounded-3xl p-8 hover:-translate-y-2 transition-transform duration-300 shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-gray-100 flex flex-col justify-between h-full">
                <div>
                    <div className="w-16 h-16 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center mb-6">
                        <FaUserMd size={28} />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-1 font-titillium">{vet.userId?.fullName || "Verified Doctor"}</h2>
                    <p className="text-blue-600 font-semibold text-sm mb-4">{vet.clinicName}</p>

                    <div className="flex items-center gap-4 mb-6">
                        {renderStars(vet.rating || 0)}
                    </div>

                    <div className="space-y-2 text-sm text-gray-600 mb-8 border-t pt-4">
                        <p><span className="font-bold text-gray-800">Experience:</span> {vet.experienceYears} Years</p>
                        <p><span className="font-bold text-gray-800">Consultation:</span> ₹{vet.consultationFee}</p>
                        <p className="flex gap-2 font-bold text-gray-800 flex-wrap">Services: 
                            {vet.services?.map(s => <span key={s} className="px-2 py-0.5 bg-gray-100 text-xs rounded-full font-medium">{s}</span>)}
                        </p>
                    </div>
                </div>

                <Link href={`/appointments/create?vetId=${vet._id}`} className="w-full block text-center py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition shadow hover:shadow-lg">
                  Book Consultation
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
