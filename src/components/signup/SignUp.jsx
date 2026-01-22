"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import CustomInput from "../common/CustomInput";
import { ROLES_DATA } from "@/utils/helper";
import { toast } from "react-toastify";

const SignUp = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm();

  const selectedRole = watch("role");

  const onSubmit = (data) => {
    if (!data.role) {
      toast.error("Please select a role.");
      return;
    }

    // Simulate API call
    console.log(data);
    toast.success("Account created successfully!");
    router.push("/login");
  };

  return (
    <div className="min-h-screen px-5 flex items-center justify-center bg-gradient-to-b from-white to-gray-100">
      <div className="w-full max-w-[650px] py-7 p-4 sm:p-6 lg:p-8 rounded-2xl md:rounded-3xl border border-solid border-gray-500 hover:border-transparent transition-all ease-linear duration-300 shadow-md text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 font-titillium flex flex-col gap-4">
          Create your <br />
          <span className="text-2xl md:text-3xl">VetEra Account</span>
        </h1>

        {/* Role Buttons */}
        <div className="grid min-[576px]:grid-cols-2 gap-3 mb-6">
          {ROLES_DATA.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setValue("role", item, { shouldValidate: true })}
              className={`py-2 px-3 border cursor-pointer hover:bg-dark-blue hover:text-white transition-colors ease-linear duration-300 rounded-md text-lg font-titillium font-medium ${
                selectedRole === item
                  ? "bg-dark-blue text-white border-dark-blue"
                  : "bg-white text-gray-800 border-gray-300"
              }`}
            >
              {item}
            </button>
          ))}
          {errors.role && (
            <p className="text-red-500 text-left text-sm">Role is required</p>
          )}
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <CustomInput
            placeholder="Name"
            {...register("name", { required: true })}
          />
          {errors.name && (
            <p className="text-red-500 text-left text-sm">Name is required</p>
          )}

          <CustomInput
            type="email"
            placeholder="Email"
            {...register("email", { required: true })}
          />
          {errors.email && (
            <p className="text-red-500 text-left text-sm">Email is required</p>
          )}

          <CustomInput
            type="password"
            placeholder="Password"
            {...register("password", { required: true })}
          />
          {errors.password && (
            <p className="text-red-500 text-left text-sm">
              Password is required
            </p>
          )}

          <input type="hidden" {...register("role", { required: true })} />

          <button
            type="submit"
            className="mt-6 w-full py-3 bg-dark-blue cursor-pointer text-white font-medium rounded-md hover:bg-dark-blue/90 font-titillium text-lg sm:text-xl md:text-2xl tracking-[1px] transition"
          >
            Continue
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
