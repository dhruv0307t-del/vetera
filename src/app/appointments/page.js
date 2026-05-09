"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { FaCalendarPlus, FaStethoscope, FaCut, FaMapMarkerAlt, FaClock, FaCheckCircle, FaExclamationCircle } from "react-icons/fa";

export default function AppointmentsDashboard() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const res = await fetch("/api/appointments");
      const data = await res.json();
      if (data.success) {
        setAppointments(data.data);
      }
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const upcoming = appointments.filter(a => new Date(a.dateTime) >= new Date() && a.status !== "CANCELLED");
  const past = appointments.filter(a => new Date(a.dateTime) < new Date() || a.status === "CANCELLED");

  return (
    <div className="min-h-screen bg-slate-50 font-titillium pt-20 px-6 pb-20">
      <div className="max-w-[1200px] mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-blue-950 mb-2">My Appointments</h1>
            <p className="text-gray-500">Manage your upcoming and past bookings.</p>
          </div>
          <Link
            href="/appointments/booking"
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-bold rounded-xl shadow hover:bg-blue-700 transition-colors"
          >
            <FaCalendarPlus /> Book New Appointment
          </Link>
        </div>

        {loading ? (
          <div className="text-center py-20 text-gray-500">Loading appointments...</div>
        ) : appointments.length === 0 ? (
          <div className="bg-white rounded-2xl p-10 text-center shadow-sm border border-gray-100">
            <div className="w-20 h-20 bg-blue-50 text-blue-300 rounded-full flex items-center justify-center text-3xl mx-auto mb-4">
              <FaCalendarPlus />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">No Appointments Yet</h3>
            <p className="text-gray-500 mb-6">You haven&apos;t booked any appointments for your pets.</p>
            <Link
              href="/appointments/booking"
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-bold rounded-xl shadow hover:bg-blue-700 transition-colors"
            >
              Book Now
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Upcoming */}
            <div>
              <h2 className="text-xl font-bold text-blue-900 mb-6 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500"></span> Upcoming
              </h2>
              {upcoming.length === 0 ? (
                <p className="text-gray-500 bg-white p-6 rounded-2xl border border-gray-100">No upcoming appointments.</p>
              ) : (
                <div className="space-y-4">
                  {upcoming.map(app => <AppointmentCard key={app._id} app={app} />)}
                </div>
              )}
            </div>

            {/* Past */}
            <div>
              <h2 className="text-xl font-bold text-gray-600 mb-6 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-gray-400"></span> Past & Cancelled
              </h2>
              {past.length === 0 ? (
                <p className="text-gray-500 bg-white p-6 rounded-2xl border border-gray-100">No past appointments.</p>
              ) : (
                <div className="space-y-4">
                  {past.map(app => <AppointmentCard key={app._id} app={app} past />)}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function AppointmentCard({ app, past }) {
  const isGrooming = app.serviceType === "GROOMING";
  const Icon = isGrooming ? FaCut : FaStethoscope;
  const colorClass = isGrooming ? "text-purple-600 bg-purple-100" : "text-blue-600 bg-blue-100";
  
  const providerName = isGrooming 
    ? (app.shopId?.businessName || app.shopId?.fullName || "Grooming Shop")
    : `Dr. ${app.doctorId?.userId?.fullName || "Vet"}`;

  return (
    <div className={`p-6 rounded-2xl border transition-all ${past ? 'bg-gray-50 border-gray-200' : 'bg-white border-blue-100 shadow-sm hover:shadow-md'}`}>
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl ${colorClass}`}>
            <Icon />
          </div>
          <div>
            <h3 className="font-bold text-gray-900">{isGrooming ? "Grooming Session" : "Vet Checkup"}</h3>
            <p className="text-sm text-gray-500">{providerName}</p>
          </div>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
          app.status === "REQUESTED" ? "bg-yellow-100 text-yellow-700" :
          app.status === "CONFIRMED" ? "bg-green-100 text-green-700" :
          app.status === "COMPLETED" ? "bg-blue-100 text-blue-700" :
          "bg-red-100 text-red-700"
        }`}>
          {app.status}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4 text-sm mb-4">
        <div className="flex items-center gap-2 text-gray-600">
          <FaClock className="text-gray-400" />
          <span>{new Date(app.dateTime).toLocaleDateString()} {app.timeSlot}</span>
        </div>
        <div className="flex items-center gap-2 text-gray-600">
          <FaMapMarkerAlt className="text-gray-400" />
          <span className="capitalize">{app.visitType?.toLowerCase() || "Clinic"}</span>
        </div>
      </div>

      <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
        <p className="text-sm">
          <span className="font-semibold text-gray-700">Pet:</span> {app.petName || "Unknown"} ({app.petType || "N/A"})
        </p>
        {app.concern && (
          <p className="text-sm mt-1">
            <span className="font-semibold text-gray-700">Concern:</span> {app.concern}
          </p>
        )}
      </div>
    </div>
  );
}
