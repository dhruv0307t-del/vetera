"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CustomerSignup() {
  const router = useRouter();

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const res = await fetch("/api/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        role: "PET_OWNER",
        fullName: form.fullName,
        email: form.email,
        phone: form.phone,
        password: form.password,
      }),
    });

    const data = await res.json();

    if (data.success) {
      router.push("/login");
    } else {
      alert(data.message || "Signup failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8">
        
        {/* Heading */}
        <h1 className="text-3xl font-bold text-center text-gray-900">
          Pet Owner
        </h1>
        <p className="text-center text-gray-600 mt-1 mb-8 text-lg">
          Registration
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">

          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={form.fullName}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border rounded-md outline-none focus:border-blue-900"
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border rounded-md outline-none focus:border-blue-900"
          />

          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={form.phone}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border rounded-md outline-none focus:border-blue-900"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border rounded-md outline-none focus:border-blue-900"
          />

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={form.confirmPassword}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border rounded-md outline-none focus:border-blue-900"
          />

          {/* Button */}
          <button
            type="submit"
            className="w-full py-3 mt-2 bg-[#021C3A] text-white text-lg font-medium rounded-md hover:bg-[#032a56] transition"
          >
            Create Account
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-gray-600 mt-6">
          Already have an account?{" "}
          <button
            onClick={() => router.push("/login")}
            className="text-blue-900 font-medium hover:underline"
          >
            Sign In
          </button>
        </p>
      </div>
    </div>
  );
}
