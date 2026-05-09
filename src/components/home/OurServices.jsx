"use client";
import React from "react";
import Link from "next/link";
import {
  FaStethoscope,
  FaPaw,
  FaDog,
  FaAmbulance,
  FaArrowRight,
} from "react-icons/fa";

const servicesDetails = [
  {
    title: "Health Monitoring",
    icon: <FaStethoscope className="w-12 h-12 text-blue-700" />,
    desc: "Track vitals, health records, and wellness trends for your pet.",
    href: "/health-monitoring",
    color: "from-blue-50 to-sky-50",
    borderColor: "hover:border-blue-300",
  },
  {
    title: "Pet Services",
    icon: <FaPaw className="w-12 h-12 text-blue-700" />,
    desc: "Book appointments, find grooming studios & shop pet products.",
    href: "/pet-services",
    color: "from-blue-50 to-indigo-50",
    borderColor: "hover:border-blue-400",
    highlight: true,
  },
  {
    title: "Community",
    icon: <FaDog className="w-12 h-12 text-blue-700" />,
    desc: "Adopt, buy & sell pets, share photos, and chat with pet lovers.",
    href: "/community",
    color: "from-sky-50 to-blue-50",
    borderColor: "hover:border-sky-300",
  },
  {
    title: "Emergency",
    icon: <FaAmbulance className="w-12 h-12 text-red-600" />,
    desc: "Get instant access to emergency vet help, report a sick pet or accident.",
    href: "/emergency",
    color: "from-red-50 to-orange-50",
    borderColor: "hover:border-red-300",
  },
];

const OurServices = () => {
  return (
    <section className="w-full py-20 bg-[#F0F6FF]">
      <div className="max-w-[1200px] mx-auto px-6">
        {/* Section heading */}
        <div className="text-center mb-14">
          <span className="inline-block px-5 py-1.5 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold mb-4 tracking-wide">
            Everything Your Pet Needs
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-blue-950 font-titillium tracking-wide">
            Our Services
          </h2>
          <p className="text-gray-500 mt-3 max-w-lg mx-auto">
            VetEra brings all pet care services under one roof — accessible anytime, anywhere.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {servicesDetails.map((service, index) => (
            <Link
              key={index}
              href={service.href}
              className={`bg-gradient-to-br ${service.color} rounded-3xl shadow-md hover:shadow-xl p-8 flex flex-col items-center text-center transition-all duration-300 transform hover:-translate-y-2 border-2 border-transparent ${service.borderColor} group relative overflow-hidden`}
            >
              {service.highlight && (
                <span className="absolute top-3 right-3 bg-blue-600 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                  NEW
                </span>
              )}
              <div className="w-20 h-20 rounded-2xl bg-white shadow-md flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                {service.icon}
              </div>
              <h3 className="text-lg font-bold text-blue-900 mb-2 font-titillium">
                {service.title}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-4">
                {service.desc}
              </p>
              <div className="flex items-center gap-1 text-blue-600 text-sm font-semibold group-hover:gap-2 transition-all">
                Explore <FaArrowRight className="text-xs" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurServices;
