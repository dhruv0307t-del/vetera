import { SERVICES_LIST } from "@/utils/helper";
import Link from "next/link";
import React from "react";

const Services = () => {
  return (
    <div className="md:my-20 my-10">
      <div className="container xl:max-w-[1140px] 2xl:max-w-[1440px] w-full xl:px-0 px-5 mx-auto">
        <h1 className="text-4xl sm:text-5xl lg:text-5xl xl:text-6xl font-semibold mb-2 text-center text-blue-950 font-titillium">
          Welcome to VetEra
        </h1>
        <p className="text-gray-600 mb-6 text-center text-base md:text-lg xl:text-xl">
          Your all-in-one platform for pet care
        </p>

        <div className="flex gap-4 md:mb-12 mb-8 justify-center flex-wrap">
          <Link
            href="/appointments/schedule"
            className="bg-blue-950 text-white font-titillium cursor-pointer px-6 py-3 rounded transition-all ease-linear border border-transparent hover:bg-dark-blue/90 text-base md:text-xl duration-300"
          >
            Schedule Appointment
          </Link>
          <Link
            href="/appointments/view"
            className="bg-white text-black border border-solid border-black font-titillium hover:text-white px-6 py-3 rounded cursor-pointer hover:bg-blue-950 transition-all ease-linear text-base md:text-xl duration-300"
          >
            View Appointments
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {SERVICES_LIST.map((item) => (
            <div
              key={item.title}
              className="bg-white md:p-5 p-6 rounded shadow hover:shadow-md transition cursor-pointer"
            >
              <h3 className="font-semibold md:text-xl text-lg mb-4 text-center text-blue-950">
                {item.title}
              </h3>
              <p className="text-gray-600 md:text-base text-sm text-center">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;
