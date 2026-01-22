"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const FarmSignup = () => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    farmName: "",
    ownerName: "",
    farmType: "",
    location: "",
    latitude: "",
    longitude: "",
    size: "",
    phone: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          role: "FARM_OWNER",
          fullName: form.ownerName,
          email: form.email,
          phone: form.phone,
          password: form.password,
          farmDetails: {
            farmName: form.farmName,
            farmType: form.farmType,
            location: form.location,
            gps: {
              lat: form.latitude,
              lng: form.longitude,
            },
            size: form.size,
          },
        }),
      });

      const data = await res.json();

      if (!data.success) {
        alert("Signup failed");
        return;
      }

      alert("Farm registered successfully!");
      router.push("/login");
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen px-5 flex items-center justify-center bg-gradient-to-b from-white to-gray-100 py-10 mt-6">
      <div className="w-full max-w-[800px] py-7 p-4 sm:p-6 lg:p-8 rounded-2xl md:rounded-3xl border border-solid border-gray-500 shadow-md bg-white">

        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 font-titillium text-center">
          Farm Registration
        </h1>

        <p className="text-gray-600 mb-8 text-lg text-center">
          Please provide your farm details to continue
        </p>

        <form className="space-y-6" onSubmit={handleSubmit}>

          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Basic Farm Information
          </h2>

          <div className="grid sm:grid-cols-2 gap-4">
            <input name="farmName" onChange={handleChange} value={form.farmName}
              placeholder="Farm Name" className="input" required />
            <input name="ownerName" onChange={handleChange} value={form.ownerName}
              placeholder="Owner Name" className="input" required />
          </div>

          <select name="farmType" onChange={handleChange} value={form.farmType}
            className="input bg-white" required>
            <option value="">Select Farm Type</option>
            <option value="dairy">Dairy</option>
            <option value="poultry">Poultry</option>
            <option value="goat_sheep">Goat / Sheep</option>
            <option value="piggery">Piggery</option>
            <option value="mixed">Mixed</option>
          </select>

          <input name="location" onChange={handleChange} value={form.location}
            placeholder="Farm Location" className="input" required />

          <div className="grid sm:grid-cols-2 gap-4">
            <input name="latitude" onChange={handleChange} value={form.latitude}
              placeholder="Latitude" className="input" />
            <input name="longitude" onChange={handleChange} value={form.longitude}
              placeholder="Longitude" className="input" />
          </div>

          <input name="size" onChange={handleChange} value={form.size}
            placeholder="Size of Farm (Area / Acreage)" className="input" required />

          <h2 className="text-xl font-semibold text-gray-800">
            Account Details
          </h2>

          <div className="grid sm:grid-cols-2 gap-4">
            <input name="phone" onChange={handleChange} value={form.phone}
              placeholder="Mobile Number" className="input" required />
            <input name="email" onChange={handleChange} value={form.email}
              placeholder="Email Address" className="input" required />
          </div>

          <input type="password" name="password"
            onChange={handleChange} value={form.password}
            placeholder="Password" className="input" required />

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-dark-blue text-white rounded-md text-lg hover:bg-blue-800"
          >
            {loading ? "Creating Account..." : "Create Farm Account"}
          </button>
        </form>

        <div className="text-center mt-6">
          <button onClick={() => router.push("/login")}
            className="text-dark-blue hover:underline">
            Already have an account? Sign In
          </button>
        </div>

      </div>
    </div>
  );
};

export default FarmSignup;
