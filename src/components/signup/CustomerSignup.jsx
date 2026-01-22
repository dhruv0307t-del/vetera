"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import CustomInput from "../common/CustomInput";
import { toast } from "react-toastify";

const CustomerSignup = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const signupData = {
      ...data,
      role: "Customer",
    };

    // Simulate API call
    console.log(signupData);
    toast.success("Customer account created successfully!");
    router.push("/login");
  };

  return (
    <div className="min-h-screen px-5 flex items-center justify-center bg-gradient-to-b from-white to-gray-100 py-10 mt-6">
      <div className="w-full max-w-[650px] py-7 p-4 sm:p-6 lg:p-8 rounded-2xl md:rounded-3xl border border-solid border-gray-500 hover:border-transparent transition-all ease-linear duration-300 shadow-md text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 font-titillium flex flex-col gap-4">
          Customer <br />
          <span className="text-2xl md:text-3xl">Registration</span>
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <CustomInput
            placeholder="Full Name"
            {...register("name", { required: "Name is required" })}
          />
          {errors.name && (
            <p className="text-red-500 text-left text-sm">
              {errors.name.message}
            </p>
          )}

          <CustomInput
            type="email"
            placeholder="Email Address"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Invalid email address",
              },
            })}
          />
          {errors.email && (
            <p className="text-red-500 text-left text-sm">
              {errors.email.message}
            </p>
          )}

          <CustomInput
            type="tel"
            placeholder="Phone Number"
            {...register("phone", { required: "Phone number is required" })}
          />
          {errors.phone && (
            <p className="text-red-500 text-left text-sm">
              {errors.phone.message}
            </p>
          )}

          <CustomInput
            type="password"
            placeholder="Password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
          />
          {errors.password && (
            <p className="text-red-500 text-left text-sm">
              {errors.password.message}
            </p>
          )}

          <CustomInput
            type="password"
            placeholder="Confirm Password"
            {...register("confirmPassword", {
              required: "Please confirm your password",
              validate: (value, { password }) =>
                value === password || "Passwords do not match",
            })}
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-left text-sm">
              {errors.confirmPassword.message}
            </p>
          )}

          <button
            type="submit"
            className="mt-6 w-full py-3 bg-dark-blue cursor-pointer text-white font-medium rounded-md hover:bg-dark-blue/90 font-titillium text-lg sm:text-xl md:text-2xl tracking-[1px] transition"
          >
            Create Account
          </button>
        </form>

        <div className="text-center mt-6">
          <button
            onClick={() => router.push("/signup")}
            className="text-gray-600 hover:text-dark-blue font-medium"
          >
            ← Back to role selection
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomerSignup;
