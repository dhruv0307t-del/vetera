"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  FaCalendarCheck,
  FaPaw,
  FaStethoscope,
  FaChevronLeft,
  FaCheckCircle,
  FaClock,
  FaMapMarkerAlt,
  FaUser,
  FaPhoneAlt,
  FaEnvelope,
  FaExternalLinkAlt
} from "react-icons/fa";

const SERVICE_TYPES = [
  { value: "checkup", label: "Vet Checkup", emoji: "🩺", duration: "30 min" },
  { value: "grooming", label: "Grooming", emoji: "✂️", duration: "60 min" },
];

const PET_TYPES = ["Dog", "Cat", "Bird", "Rabbit", "Fish", "Other"];

const TIME_SLOTS = [
  "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM",
  "11:00 AM", "11:30 AM", "12:00 PM", "02:00 PM",
  "02:30 PM", "03:00 PM", "03:30 PM", "04:00 PM",
  "04:30 PM", "05:00 PM", "05:30 PM", "06:00 PM",
];

const STEPS = ["Service", "Details & Provider", "Schedule", "Confirm"];

const AppointmentBookingPage = () => {
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  
  const [vets, setVets] = useState([]);
  const [shops, setShops] = useState([]);
  const [loadingProviders, setLoadingProviders] = useState(false);

  const [form, setForm] = useState({
    serviceType: "",
    petName: "",
    petType: "",
    petAge: "",
    petBreed: "",
    ownerName: "",
    ownerPhone: "",
    ownerEmail: "",
    providerId: "",
    date: "",
    timeSlot: "",
    location: "clinic",
    concern: "",
    // Grooming specific
    coatCondition: "",
    groomingInstructions: "",
  });

  useEffect(() => {
    // Parse URL params
    const searchParams = new URLSearchParams(window.location.search);
    const serviceParam = searchParams.get("service");
    const concernParam = searchParams.get("concern");

    if (serviceParam === "grooming") {
      setForm(prev => ({ ...prev, serviceType: "grooming" }));
      setStep(1);
    } else if (concernParam) {
      setForm(prev => ({ ...prev, serviceType: "checkup", concern: concernParam }));
      setStep(1);
    }

    // Fetch user details for autofill
    const fetchUser = async () => {
      if (localStorage.getItem("isLoggedIn") === "true") {
        try {
          const res = await fetch("/api/me");
          const data = await res.json();
          if (data.success && data.user) {
            setForm((prev) => ({
              ...prev,
              ownerName: data.user.fullName || prev.ownerName,
              ownerEmail: data.user.email || prev.ownerEmail,
              ownerPhone: data.user.phone || prev.ownerPhone,
            }));
          }
        } catch (error) {
          console.error("Error fetching user", error);
        }
      }
    };

    const fetchProviders = async () => {
      setLoadingProviders(true);
      try {
        const [vetsRes, shopsRes] = await Promise.all([
          fetch("/api/vets").then((res) => res.json()),
          fetch("/api/grooming-shops").then((res) => res.json())
        ]);
        if (vetsRes.success) setVets(vetsRes.data);
        if (shopsRes.success) setShops(shopsRes.data);
      } catch (error) {
        console.error("Error fetching providers", error);
      }
      setLoadingProviders(false);
    };

    fetchUser();
    fetchProviders();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const nextStep = () => setStep((s) => Math.min(s + 1, 3));
  const prevStep = () => setStep((s) => Math.max(s - 1, 0));

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if (data.success) {
        setSubmitted(true);
      } else {
        alert("Failed to book appointment: " + data.message);
      }
    } catch (err) {
      alert("Error booking appointment");
    }
  };

  /* ── Step completion check ── */
  const isStep0Done = !!form.serviceType;
  const isStep1Done =
    form.petName && form.petType && form.ownerName && form.ownerPhone && form.providerId;
  const isStep2Done = form.date && form.timeSlot;

  /* ── Selected service info ── */
  const selectedService = SERVICE_TYPES.find((s) => s.value === form.serviceType);
  const providersList = form.serviceType === "checkup" ? vets : shops;
  
  const getProviderId = (p) => {
    return form.serviceType === "checkup" ? (p._id || p.userId?._id) : p._id;
  };

  const getProviderName = (p) => {
    if (form.serviceType === "checkup") {
      return `Dr. ${p.userId?.fullName || "Unknown Vet"}`;
    }
    return p.fullName || p.businessName || "Grooming Shop";
  };

  const selectedProvider = providersList.find(p => getProviderId(p) === form.providerId);

  /* ─────────── SUCCESS ─────────── */
  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-950 via-blue-900 to-blue-700 flex items-center justify-center p-6">
        <div className="bg-white rounded-3xl shadow-2xl p-10 max-w-md w-full text-center">
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <FaCheckCircle className="text-green-500 text-5xl" />
          </div>
          <h2 className="text-3xl font-extrabold text-blue-950 font-titillium mb-3">
            Appointment Confirmed!
          </h2>
          <p className="text-gray-500 mb-6 leading-relaxed">
            Your appointment for <strong className="text-blue-700">{form.petName}</strong> has
            been successfully booked for{" "}
            <strong className="text-blue-700">{form.date}</strong> at{" "}
            <strong className="text-blue-700">{form.timeSlot}</strong>.
          </p>

          <div className="bg-blue-50 rounded-2xl p-5 text-left space-y-2 mb-8">
            <p className="text-sm text-blue-700">
              <span className="font-semibold">Service:</span>{" "}
              {selectedService?.label}
            </p>
            <p className="text-sm text-blue-700">
              <span className="font-semibold">Provider:</span>{" "}
              {selectedProvider ? getProviderName(selectedProvider) : "N/A"}
            </p>
            <p className="text-sm text-blue-700">
              <span className="font-semibold">Pet:</span> {form.petName} ({form.petType})
            </p>
            <p className="text-sm text-blue-700">
              <span className="font-semibold">Contact:</span> {form.ownerPhone}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href="/pet-services"
              className="flex-1 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors text-center"
            >
              Back to Services
            </Link>
            <button
              onClick={() => {
                setSubmitted(false);
                setStep(0);
                setForm({
                  serviceType: "", petName: "", petType: "", petAge: "",
                  petBreed: "", ownerName: "", ownerPhone: "", ownerEmail: "",
                  providerId: "", date: "", timeSlot: "", location: "clinic", 
                  concern: "", coatCondition: "", groomingInstructions: "",
                });
              }}
              className="flex-1 py-3 border-2 border-blue-600 text-blue-600 font-bold rounded-xl hover:bg-blue-50 transition-colors"
            >
              Book Another
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-950 via-blue-900 to-blue-700 font-titillium">
      {/* Top bar */}
      <div className="max-w-[1000px] mx-auto px-6 pt-24 pb-6">
        <Link
          href="/pet-services"
          className="inline-flex items-center gap-2 text-blue-300 hover:text-white transition-colors mb-6"
        >
          <FaChevronLeft /> Back to Pet Services
        </Link>

        {/* Page title */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-700/50 rounded-full text-blue-200 text-sm mb-4">
            <FaCalendarCheck /> Schedule with ease
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white font-titillium mb-3">
            Book an Appointment
          </h1>
          <p className="text-blue-200 text-lg max-w-xl mx-auto">
            Complete the form below to reserve your spot with our expert vets
            and groomers.
          </p>
        </div>

        {/* Stepper */}
        <div className="flex items-center justify-center mb-10 gap-0">
          {STEPS.map((label, i) => (
            <React.Fragment key={i}>
              <div className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all ${
                    i < step
                      ? "bg-green-400 text-white shadow-lg shadow-green-400/30"
                      : i === step
                      ? "bg-white text-blue-800 shadow-lg shadow-white/20 ring-4 ring-white/30"
                      : "bg-blue-800/50 text-blue-400 border border-blue-600"
                  }`}
                >
                  {i < step ? "✓" : i + 1}
                </div>
                <span
                  className={`text-xs mt-1.5 font-semibold hidden sm:block ${
                    i === step ? "text-white" : "text-blue-400"
                  }`}
                >
                  {label}
                </span>
              </div>
              {i < STEPS.length - 1 && (
                <div
                  className={`h-0.5 w-12 sm:w-20 mx-1 transition-colors ${
                    i < step ? "bg-green-400" : "bg-blue-700"
                  }`}
                />
              )}
            </React.Fragment>
          ))}
        </div>

        {/* FORM CARD */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          {/* ─── Step 0: Service type ─── */}
          {step === 0 && (
            <div className="p-8 md:p-12">
              <h2 className="text-2xl font-bold text-blue-950 mb-2">
                What service do you need?
              </h2>
              <p className="text-gray-400 mb-8">
                Pick the type of appointment you'd like to schedule.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10 max-w-2xl mx-auto">
                {SERVICE_TYPES.map((s) => (
                  <button
                    key={s.value}
                    type="button"
                    onClick={() => {
                      setForm((prev) => ({ ...prev, serviceType: s.value, providerId: "" }));
                    }}
                    className={`flex items-start gap-4 p-5 rounded-2xl border-2 text-left transition-all hover:border-blue-400 ${
                      form.serviceType === s.value
                        ? "border-blue-600 bg-blue-50 shadow-md shadow-blue-100"
                        : "border-gray-100 bg-gray-50"
                    }`}
                  >
                    <span className="text-3xl">{s.emoji}</span>
                    <div>
                      <p className="font-bold text-blue-900">{s.label}</p>
                      <p className="text-xs text-gray-400 flex items-center gap-1 mt-0.5">
                        <FaClock className="text-blue-400" /> {s.duration}
                      </p>
                    </div>
                    {form.serviceType === s.value && (
                      <FaCheckCircle className="ml-auto text-blue-600 text-xl flex-shrink-0" />
                    )}
                  </button>
                ))}
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  disabled={!isStep0Done}
                  onClick={nextStep}
                  className="px-8 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  Next →
                </button>
              </div>
            </div>
          )}

          {/* ─── Step 1: Pet + Owner Details + Provider ─── */}
          {step === 1 && (
            <div className="p-8 md:p-12">
              <h2 className="text-2xl font-bold text-blue-950 mb-2">
                Details & Provider
              </h2>
              <p className="text-gray-400 mb-8">
                Tell us about your pet and choose your preferred provider.
              </p>

              {/* Provider Selection */}
              <div className="mb-8 p-6 bg-blue-50 rounded-2xl border border-blue-100">
                <label className="block text-sm font-semibold text-blue-800 mb-3">
                  Select {form.serviceType === "checkup" ? "Veterinarian" : "Grooming Shop"} *
                </label>
                {loadingProviders ? (
                  <div className="text-blue-600 text-sm py-2">Loading nearby providers...</div>
                ) : (
                  <div>
                    <select
                      name="providerId"
                      value={form.providerId}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all appearance-none bg-white"
                    >
                      <option value="">
                        Select a {form.serviceType === "checkup" ? "Vet" : "Shop"}
                      </option>
                      {providersList.map((p) => {
                        const id = getProviderId(p);
                        return (
                          <option key={id} value={id}>
                            {getProviderName(p)} {p.city ? `- ${p.city}` : ""}
                          </option>
                        );
                      })}
                    </select>

                    {form.providerId && selectedProvider && (
                      <div className="mt-3 flex items-center justify-between bg-white p-3 rounded-lg border border-blue-200 shadow-sm">
                        <div className="flex flex-col">
                          <span className="font-bold text-blue-900">{getProviderName(selectedProvider)}</span>
                          <span className="text-xs text-gray-500">
                            {selectedProvider.address || selectedProvider.city || "Address not available"}
                          </span>
                        </div>
                        <Link
                          href={form.serviceType === "checkup" ? `/vets` : "#"}
                          className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800 font-semibold"
                        >
                          View Profile <FaExternalLinkAlt className="text-xs" />
                        </Link>
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Pet Name */}
                <div>
                  <label className="block text-sm font-semibold text-blue-800 mb-1.5">
                    Pet Name *
                  </label>
                  <div className="relative">
                    <FaPaw className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-400" />
                    <input
                      name="petName"
                      value={form.petName}
                      onChange={handleChange}
                      placeholder="e.g. Buddy"
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all"
                    />
                  </div>
                </div>

                {/* Pet Type */}
                <div>
                  <label className="block text-sm font-semibold text-blue-800 mb-1.5">
                    Pet Type *
                  </label>
                  <select
                    name="petType"
                    value={form.petType}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all appearance-none bg-white"
                  >
                    <option value="">Select pet type</option>
                    {PET_TYPES.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Pet Breed */}
                <div>
                  <label className="block text-sm font-semibold text-blue-800 mb-1.5">
                    Breed
                  </label>
                  <input
                    name="petBreed"
                    value={form.petBreed}
                    onChange={handleChange}
                    placeholder="e.g. Golden Retriever"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all"
                  />
                </div>

                {/* Pet Age */}
                <div>
                  <label className="block text-sm font-semibold text-blue-800 mb-1.5">
                    Pet Age (years)
                  </label>
                  <input
                    name="petAge"
                    type="number"
                    value={form.petAge}
                    onChange={handleChange}
                    placeholder="e.g. 3"
                    min={0}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all"
                  />
                </div>
              </div>

              {/* Grooming Specific Fields */}
              {form.serviceType === "grooming" && (
                <div className="mt-8 p-6 bg-purple-50 rounded-2xl border border-purple-100">
                  <h3 className="text-purple-900 font-bold mb-4 flex items-center gap-2">
                    <span className="text-xl">✂️</span> Grooming Preferences
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="sm:col-span-2">
                      <label className="block text-sm font-semibold text-purple-800 mb-1.5">
                        Coat Condition
                      </label>
                      <select
                        name="coatCondition"
                        value={form.coatCondition}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-purple-200 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-100 transition-all appearance-none bg-white"
                      >
                        <option value="">Select Condition</option>
                        <option value="Normal">Normal</option>
                        <option value="Matted">Matted / Tangled</option>
                        <option value="Shedding heavily">Shedding Heavily</option>
                        <option value="Skin issues">Skin Issues / Allergies</option>
                      </select>
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-sm font-semibold text-purple-800 mb-1.5">
                        Special Instructions
                      </label>
                      <textarea
                        name="groomingInstructions"
                        value={form.groomingInstructions}
                        onChange={handleChange}
                        placeholder="Any specific cuts or shampoo requests?"
                        rows={3}
                        className="w-full px-4 py-3 rounded-xl border border-purple-200 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-100 transition-all resize-none"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Divider */}
              <div className="my-8 flex items-center gap-3">
                <div className="flex-1 h-px bg-gray-100" />
                <span className="text-xs text-gray-400 font-semibold uppercase tracking-wider">
                  Owner Info
                </span>
                <div className="flex-1 h-px bg-gray-100" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Owner name */}
                <div>
                  <label className="block text-sm font-semibold text-blue-800 mb-1.5">
                    Your Name *
                  </label>
                  <div className="relative">
                    <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-400" />
                    <input
                      name="ownerName"
                      value={form.ownerName}
                      onChange={handleChange}
                      placeholder="Full name"
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all"
                    />
                  </div>
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-semibold text-blue-800 mb-1.5">
                    Phone Number *
                  </label>
                  <div className="relative">
                    <FaPhoneAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-400" />
                    <input
                      name="ownerPhone"
                      value={form.ownerPhone}
                      onChange={handleChange}
                      placeholder="+91 98765 43210"
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all"
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="sm:col-span-2">
                  <label className="block text-sm font-semibold text-blue-800 mb-1.5">
                    Email Address
                  </label>
                  <div className="relative">
                    <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-400" />
                    <input
                      name="ownerEmail"
                      type="email"
                      value={form.ownerEmail}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-between mt-10">
                <button
                  type="button"
                  onClick={prevStep}
                  className="px-8 py-3 border-2 border-blue-200 text-blue-700 font-bold rounded-xl hover:bg-blue-50 transition-colors"
                >
                  ← Back
                </button>
                <button
                  type="button"
                  disabled={!isStep1Done}
                  onClick={nextStep}
                  className="px-8 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  Next →
                </button>
              </div>
            </div>
          )}

          {/* ─── Step 2: Schedule ─── */}
          {step === 2 && (
            <div className="p-8 md:p-12">
              <h2 className="text-2xl font-bold text-blue-950 mb-2">
                Pick your schedule
              </h2>
              <p className="text-gray-400 mb-8">
                Choose a date, time slot, and visit type.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                {/* Date */}
                <div>
                  <label className="block text-sm font-semibold text-blue-800 mb-1.5">
                    Date *
                  </label>
                  <input
                    name="date"
                    type="date"
                    value={form.date}
                    onChange={handleChange}
                    min={new Date().toISOString().split("T")[0]}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all"
                  />
                </div>

                {/* Visit location */}
                <div>
                  <label className="block text-sm font-semibold text-blue-800 mb-1.5">
                    Visit Type
                  </label>
                  <div className="flex gap-3">
                    {[
                      { value: "clinic", label: "🏥 Clinic", desc: "In-person" },
                      { value: "home", label: "🏠 Home", desc: "Home visit" },
                      { value: "online", label: "💻 Online", desc: "Video call" },
                    ].map((opt) => (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() =>
                          setForm((p) => ({ ...p, location: opt.value }))
                        }
                        className={`flex-1 py-3 rounded-xl border-2 text-center transition-all text-sm font-semibold ${
                          form.location === opt.value
                            ? "border-blue-600 bg-blue-50 text-blue-700"
                            : "border-gray-200 text-gray-500 hover:border-blue-300"
                        }`}
                      >
                        <div>{opt.label}</div>
                        <div className="text-xs font-normal text-gray-400 mt-0.5">
                          {opt.desc}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Time slots */}
              <div className="mb-8">
                <label className="block text-sm font-semibold text-blue-800 mb-3">
                  Available Time Slots *
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-8 gap-2">
                  {TIME_SLOTS.map((slot) => (
                    <button
                      key={slot}
                      type="button"
                      onClick={() =>
                        setForm((p) => ({ ...p, timeSlot: slot }))
                      }
                      className={`py-2 px-2 rounded-xl text-xs font-semibold border-2 transition-all ${
                        form.timeSlot === slot
                          ? "border-blue-600 bg-blue-600 text-white shadow-md"
                          : "border-gray-200 text-gray-600 hover:border-blue-300 hover:text-blue-600"
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>

              {/* Concern */}
              <div>
                <label className="block text-sm font-semibold text-blue-800 mb-1.5">
                  Describe your concern (optional)
                </label>
                <textarea
                  name="concern"
                  value={form.concern}
                  onChange={handleChange}
                  placeholder="Briefly describe the symptoms or reason for the appointment..."
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all resize-none"
                />
              </div>

              <div className="flex justify-between mt-10">
                <button
                  type="button"
                  onClick={prevStep}
                  className="px-8 py-3 border-2 border-blue-200 text-blue-700 font-bold rounded-xl hover:bg-blue-50 transition-colors"
                >
                  ← Back
                </button>
                <button
                  type="button"
                  disabled={!isStep2Done}
                  onClick={nextStep}
                  className="px-8 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  Review →
                </button>
              </div>
            </div>
          )}

          {/* ─── Step 3: Confirm ─── */}
          {step === 3 && (
            <div className="p-8 md:p-12">
              <h2 className="text-2xl font-bold text-blue-950 mb-2">
                Confirm your booking
              </h2>
              <p className="text-gray-400 mb-8">
                Review your details before confirming.
              </p>

              {/* Summary card */}
              <div className="bg-gradient-to-br from-blue-950 to-blue-800 rounded-2xl p-6 text-white mb-8 relative overflow-hidden">
                <div className="absolute -top-6 -right-6 w-36 h-36 rounded-full bg-blue-600/20" />
                <div className="absolute bottom-2 left-2 w-20 h-20 rounded-full bg-blue-400/10" />
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-blue-500/40 rounded-xl flex items-center justify-center text-2xl">
                      {selectedService?.emoji}
                    </div>
                    <div>
                      <p className="font-bold text-lg">{selectedService?.label}</p>
                      <p className="text-blue-300 text-sm">
                        Duration: {selectedService?.duration}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                    {[
                      { label: "Provider", value: selectedProvider ? getProviderName(selectedProvider) : "N/A" },
                      { label: "Pet", value: `${form.petName} (${form.petType})` },
                      { label: "Owner", value: form.ownerName },
                      { label: "Phone", value: form.ownerPhone },
                      { label: "Date", value: form.date },
                      { label: "Time", value: form.timeSlot },
                      {
                        label: "Visit Type",
                        value:
                          form.location === "clinic"
                            ? "🏥 Clinic"
                            : form.location === "home"
                            ? "🏠 Home Visit"
                            : "💻 Online",
                      },
                    ].map((row) => (
                      <div key={row.label}>
                        <p className="text-blue-300 text-xs uppercase tracking-wide mb-0.5">
                          {row.label}
                        </p>
                        <p className="font-semibold">{row.value || "—"}</p>
                      </div>
                    ))}
                  </div>

                  {form.serviceType === "grooming" && (form.coatCondition || form.groomingInstructions) && (
                     <div className="mt-4 pt-4 border-t border-blue-700 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-purple-300 text-xs uppercase tracking-wide mb-0.5">Coat Condition</p>
                          <p className="font-semibold">{form.coatCondition || "N/A"}</p>
                        </div>
                        <div>
                          <p className="text-purple-300 text-xs uppercase tracking-wide mb-0.5">Instructions</p>
                          <p className="font-semibold">{form.groomingInstructions || "N/A"}</p>
                        </div>
                     </div>
                  )}

                  {form.concern && (
                    <div className="mt-4 pt-4 border-t border-blue-700">
                      <p className="text-blue-300 text-xs uppercase tracking-wide mb-1">
                        Concern
                      </p>
                      <p className="text-sm leading-relaxed">{form.concern}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Policy notice */}
              <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-xl mb-8 text-sm text-blue-700">
                <FaStethoscope className="text-blue-500 mt-0.5 flex-shrink-0" />
                <p>
                  By confirming this appointment, you agree to VetEra's{" "}
                  <span className="underline cursor-pointer font-semibold">
                    cancellation policy
                  </span>
                  . You can reschedule up to 2 hours before the appointment time.
                </p>
              </div>

              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={prevStep}
                  className="px-8 py-3 border-2 border-blue-200 text-blue-700 font-bold rounded-xl hover:bg-blue-50 transition-colors"
                >
                  ← Back
                </button>
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="flex items-center gap-2 px-10 py-3 bg-gradient-to-r from-blue-600 to-blue-800 text-white font-bold rounded-xl hover:from-blue-700 hover:to-blue-900 shadow-lg hover:shadow-blue-900/30 transition-all"
                >
                  <FaCalendarCheck /> Confirm Booking
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default AppointmentBookingPage;
