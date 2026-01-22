"use client";
import React from "react";
import Link from "next/link";
import CustomInput from "../common/CustomInput";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import "react-toastify/dist/ReactToastify.css";

const LogIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const router = useRouter();

  const onSubmit = (data) => {
    console.log("Login Data:", data);

    // TODO: You can add API login logic here

    toast.success("Login successful!");
    localStorage.setItem("isLoggedIn", "true");
    router.push("/");
  };

  return (
    <div className="py-20 sm:min-h-screen flex justify-center items-center px-5">
      <div className="py-7 p-4 sm:p-6 lg:p-8 rounded-2xl md:rounded-3xl border border-solid border-gray-500 shadow-2xl w-full max-w-[650px] hover:border-transparent transition-all ease-linear duration-300">
        <h1 className="font-titillium text-blue-950 text-5xl lg:text-6xl xl:text-8xl font-semibold tracking-[1px] text-center mb-5 md:mb-7">
          VetEra
        </h1>
        <p className="text-xl typewriter-text sm:text-2xl md:text-3xl lg:text-5xl text-blue-950 font-titillium font-semibold leading-[120%] text-center">
          Welcome Back to VetEra
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-10">
          <CustomInput
            type="email"
            placeholder="Email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Invalid email format",
              },
            })}
          />
          {errors.email && (
            <p className="text-red-600 text-sm">{errors.email.message}</p>
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
            <p className="text-red-600 text-sm">{errors.password.message}</p>
          )}

          <button
            type="submit"
            className="mt-6 w-full py-3 bg-dark-blue cursor-pointer text-white font-medium rounded-md hover:bg-dark-blue/90 font-titillium text-lg sm:text-xl md:text-2xl tracking-[1px] transition"
          >
            Login
          </button>
        </form>

        <p className="mt-6 text-dark-blue font-normal text-center">
          New here?{" "}
          <Link
            href="/signup"
            className="text-dark-blue font-titillium font-semibold"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LogIn;
