"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useAppointments } from "@/context/AppointmentsContext";
import Swal from "sweetalert2";
import Link from "next/link";

const ViewAppointments = () => {
  const { appointments, cancelAppointment } = useAppointments();
  const router = useRouter();
  const latestIndex = appointments.length - 1;
  const latest = appointments[latestIndex];

  if (!latest) {
    return (
      <div className="text-center mt-20 text-xl font-semibold text-gray-700">
        <p>No appointment found.</p>
        <div className="mt-10">
          <Link
            href="/appointments/overview"
            className="bg-blue-950 text-white font-titillium hover:text-black cursor-pointer px-6 py-2 rounded hover:bg-transparent transition border border-transparent hover:border-blue-950 text-sm md:text-base sm:py-3 duration-300"
          >
            Accept Appointment
          </Link>
        </div>
      </div>
    );
  }

  const handleCancel = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to cancel this appointment?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, cancel it!",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        cancelAppointment(latestIndex);
        Swal.fire(
          "Cancelled!",
          "The appointment has been cancelled.",
          "success"
        );
      }
    });
  };

  const handleAccept = () => {
    router.push("/appointments/overview");
  };

  return (
      <div className="max-w-[800px] mx-auto mt-10 p-4 lg:p-6 relative">
        <h1 className="text-2xl md:text-3xl lg:text-4xl text-center mb-12 md:mb-16 font-titillium font-semibold text-blue-950">
          View Appointment
        </h1>

        <div className="bg-white p-4 rounded-lg shadow space-y-4">
          <div className="py-3 sm:py-4 rounded-lg border border-gray-300">
            <div className="flex px-4 justify-between items-center pb-2">
              <div>
                <p className="font-semibold font-titillium text-lg">
                  {latest.date}
                </p>
                <p className="text-gray-600 font-titillium text-lg">
                  {latest.time}
                </p>
              </div>
              <div className="text-right">
                <img
                  src="/assets/images/svg/user.svg"
                  alt="user"
                  className="rounded-full size-[60px] mx-auto cursor-pointer"
                />
                <p className="text-lg capitalize text-center font-titillium font-medium">
                  {latest.vet}
                </p>
              </div>
            </div>

            <p className="px-4 text-lg font-medium border-t border-gray-300 py-3">
              📋 Type: {latest.type}
            </p>
            <p className="px-4 py-3 border-t border-gray-300 text-lg font-medium">
              🐾 Pet: {latest.pet}
            </p>

            <p className="px-4 pt-3 border-t border-gray-300 text-lg font-medium">
              🩺 Concern: {latest.concern}
            </p>
          </div>

          {latest.status === "Cancelled" ? (
            <p className="text-red-500 text-center font-semibold">
              This appointment has been cancelled.
            </p>
          ) : (
            <>
              <button
                onClick={handleAccept}
                className="bg-dark-blue text-white cursor-pointer px-6 py-2 rounded-lg w-full  border hover:bg-dark-blue/90 text-lg transition-all ease-linear duration-300 block text-center font-titillium font-medium"
              >
                Accept Appointment
              </button>
              <button
                onClick={handleCancel}
                className="bg-red-800 text-white cursor-pointer px-6 py-2 rounded-lg w-full hover:bg-red-700/90 border text-lg transition-all ease-linear duration-300 font-titillium font-medium"
              >
                Cancel
              </button>
            </>
          )}
        </div>
      </div>
  );
};

export default ViewAppointments;
