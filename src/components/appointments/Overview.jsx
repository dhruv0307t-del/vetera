"use client";
import React from "react";
import { useAppointments } from "@/context/AppointmentsContext";
import { FaClipboardList, FaClock } from "react-icons/fa";
import { BsCalendar2Check, BsCalendarX } from "react-icons/bs";
import Link from "next/link";

const Overview = () => {
  const { appointments } = useAppointments();
  const now = new Date();
  const total = appointments.length;
  const cancelled = appointments.filter((a) => a.status === "Cancelled").length;
  const upcoming = appointments.filter(
    (a) => new Date(a.date) > now && a.status === "Pending"
  ).length;
  const past = appointments.filter(
    (a) => new Date(a.date) < now && a.status !== "Cancelled"
  ).length;

  return (
      <div className="max-w-[760px] rounded-xl mx-auto bg-white py-8 mt-4 lg:mt-20">
        <div className="mb-8 px-5 md:px-10">
          <h1 className="text-3xl md:text-4xl font-bold text-blue-950 mb-6 font-titillium">
            Welcome, Dr. Smith
          </h1>
          <div className="flex flex-wrap gap-4">
            <Link href="/appointments/schedule">
              <button className="bg-blue-950 text-white px-5 py-3 rounded-md flex items-center space-x-2 text-base duration-300 cursor-pointer font-titillium">
                <FaClipboardList />
                <span>New Appointment</span>
              </button>
            </Link>
            <button className="border font-titillium font-medium border-gray-300 px-5 py-2 rounded-md flex items-center space-x-2 text-base hover:bg-gray-100 cursor-pointer transition-all ease-linear duration-300">
              <span className="text-lg font-bold">+</span>
              <span>Add Patient</span>
            </button>
          </div>
        </div>
        <div className="px-5">
          <h2 className="text-xl font-bold text-gray-900 mb-6 font-titillium">
            Appointments Overview
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 mb-6 gap-6">
            <OverviewCard
              title="Past Appointments"
              value={past}
              Icon={BsCalendarX}
            />
            <OverviewCard
              title="Cancellations"
              value={cancelled}
              Icon={FaClock}
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <OverviewCard
              title="Total Appointments"
              value={total}
              Icon={FaClipboardList}
            />
            <OverviewCard
              title="Upcoming Appointments"
              value={upcoming}
              Icon={BsCalendar2Check}
            />
          </div>
        </div>
      </div>
  );
};

const OverviewCard = ({ title, value, Icon }) => (
  <div className="border border-gray-200 rounded-lg p-4 flex items-center space-x-4 shadow-sm hover:shadow-md transition">
    <div className="bg-gray-100 p-3 rounded">
      <Icon className="text-blue-950 text-xl" />
    </div>
    <div>
      <p className="text-lg md:text-xl font-semibold text-gray-800">{title}</p>
      <p className="text-xl md:text-2xl font-bold text-blue-950">{value}</p>
    </div>
  </div>
);

export default Overview;
