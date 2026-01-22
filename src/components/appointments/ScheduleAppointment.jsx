"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAppointments } from "@/context/AppointmentsContext";
import CustomInput from "../common/CustomInput";

const ScheduleAppointment = () => {
  const { addAppointment } = useAppointments();
  const router = useRouter();

  const [form, setForm] = useState({
    pet: "",
    vet: "",
    date: "",
    time: "",
    concern: "",
    type: "",
  });

  const [errors, setErrors] = useState({});

  const validateField = (name, value) => {
    let error = "";
    if (!value.trim()) {
      switch (name) {
        case "pet":
          error = "Pet name is required.";
          break;
        case "vet":
          error = "Vet name is required.";
          break;
        case "type":
          error = "Appointment type is required.";
          break;
        case "date":
          error = "Date is required.";
          break;
        case "time":
          error = "Time is required.";
          break;
        case "concern":
          error = "Concern is required.";
          break;
        default:
          break;
      }
    }
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    validateField(name, value);
  };

  const validateForm = () => {
    const newErrors = {};
    Object.keys(form).forEach((field) => {
      if (!form[field].trim()) {
        validateField(field, form[field]);
        newErrors[field] = "This field is required.";
      }
    });
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    addAppointment({ ...form, status: "Pending" });
    router.push("/appointments/view");
  };

  return (
    <div className="py-14 sm:pt-16 md:pt-20">
      <div className="container xl:max-w-[1140px] mx-auto w-full xl:px-0 px-5">
        <h1 className="text-2xl md:text-3xl lg:text-4xl text-center mb-24 md:mb-28 font-titillium font-semibold text-blue-950">
          Schedule an Appointment
        </h1>
        <form
          className="max-w-[700px] bg-white p-3 md:p-6 rounded-lg shadow space-y-4 mx-auto"
          onSubmit={handleSubmit}
        >
          <img
            src="/assets/images/png/pet.png"
            alt="pet"
            className="rounded-full size-[110px] mx-auto -mt-20 animate-pulse"
          />
          <div>
            <CustomInput
              name="pet"
              value={form.pet}
              type="text"
              onChange={handleChange}
              placeholder="Enter Pet Name"
              lable="Pet Name"
            />
            {errors.pet && <p className="text-red-500 text-sm">{errors.pet}</p>}
          </div>

          <div>
            <CustomInput
              name="vet"
              value={form.vet}
              onChange={handleChange}
              placeholder="Enter Vet Name"
              lable="Vet Name"
            />
            {errors.vet && <p className="text-red-500 text-sm">{errors.vet}</p>}
          </div>

          <div className="relative w-full">
            <label className="block font-medium text-lg mb-3">
              Appointment
            </label>
            <select
              name="type"
              value={form.type}
              onChange={handleChange}
              className="w-full appearance-none px-4 py-3 pr-12 rounded-md border border-gray-300 text-dark-blue font-medium text-lg focus:outline-none"
            >
              <option value="" disabled>
                Select Appointment Type
              </option>
              <option value="Checkup">Checkup</option>
              <option value="Vaccination">Vaccination</option>
              <option value="Surgery">Surgery</option>
              <option value="Grooming">Grooming</option>
            </select>
            <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 mt-[18px]">
              <img
                src="/assets/images/svg/select-arrow.svg"
                alt="arrow"
                className="rotate-90"
              />
            </div>
            {errors.type && (
              <p className="text-red-500 text-sm mt-1">{errors.type}</p>
            )}
          </div>

          <div className="flex max-sm:flex-col w-full gap-4">
            <div className="w-full">
              <CustomInput
                name="date"
                type="date"
                value={form.date}
                onChange={handleChange}
                lable="Date"
              />
              {errors.date && (
                <p className="text-red-500 text-sm">{errors.date}</p>
              )}
            </div>
            <div className="w-full">
              <CustomInput
                name="time"
                type="time"
                value={form.time}
                onChange={handleChange}
                lable="Time"
              />
              {errors.time && (
                <p className="text-red-500 text-sm">{errors.time}</p>
              )}
            </div>
          </div>

          <div>
            <label className="block font-medium text-lg mb-1">Concern</label>
            <textarea
              name="concern"
              placeholder="Brief description..."
              value={form.concern}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-md border resize-none border-gray-300 text-dark-blue placeholder:text-dark-blue font-medium text-lg focus:outline-none"
            />
            {errors.concern && (
              <p className="text-red-500 text-sm">{errors.concern}</p>
            )}
          </div>

          <button
            type="submit"
            className="bg-dark-blue text-white cursor-pointer px-6 py-2 rounded border hover:border-blue-950 transition-all ease-linear duration-300 hover:bg-dark-blue/90"
          >
            Confirm Appointment
          </button>
        </form>
      </div>
    </div>
  );
};

export default ScheduleAppointment;
