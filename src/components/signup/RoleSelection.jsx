"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { ROLES_DATA } from "@/utils/helper";

const RoleSelection = () => {
  const router = useRouter();

  const handleRoleSelect = (role) => {
    if (role === "Pet Owner") {
      router.push("/signup/pet-owner");
    } else if (role === "Veterinary Doctor") {
      router.push("/signup/veterinary-doctor");
    } else if (role === "Grooming Shop") {
      router.push("/signup/grooming-shop");
    } else if (role === "Farm") {
      router.push("/signup/farm"); // ✅ NEW
    }
  };

  return (
    <div className="min-h-screen px-5 flex items-center justify-center bg-gradient-to-b from-white to-gray-100 py-10 mt-6">
      <div className="w-full max-w-[650px] py-7 p-4 sm:p-6 lg:p-8 rounded-2xl md:rounded-3xl border border-solid border-gray-500 hover:border-transparent transition-all ease-linear duration-300 shadow-md text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 font-titillium flex flex-col gap-4">
          Create your <br />
          <span className="text-2xl md:text-3xl">VetEra Account</span>
        </h1>

        <p className="text-gray-600 mb-8 text-lg">
          Choose your account type to get started
        </p>

        {/* Role Selection Buttons */}
        <div className="grid min-[576px]:grid-cols-2 gap-4 mb-6">
          {ROLES_DATA.map((role) => (
            <button
              key={role}
              onClick={() => handleRoleSelect(role)}
              className="py-4 px-6 border cursor-pointer hover:bg-dark-blue hover:text-white transition-colors ease-linear duration-300 rounded-md text-lg font-titillium font-medium bg-white text-gray-800 border-gray-300 hover:border-dark-blue"
            >
              {role}
            </button>
          ))}
        </div>

        <div className="text-center mt-6">
          <p className="text-gray-600">
            Already have an account?{" "}
            <button
              onClick={() => router.push("/login")}
              className="text-dark-blue cursor-pointer hover:underline font-medium"
            >
              Sign In
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RoleSelection;
