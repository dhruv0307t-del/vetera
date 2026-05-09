"use client";
import React from "react";
import { FaClock, FaEdit, FaPlus, FaTag, FaTrashAlt } from "react-icons/fa";

const ServicesPage = () => {
  const services = [
    {
      id: 1,
      name: "Full Grooming",
      description: "Complete styling, bath, blow dry, nail trimming, and ear cleaning.",
      duration: "120 min",
      price: "₹1,500",
      category: "Styling",
    },
    {
      id: 2,
      name: "Bath & Dry",
      description: "Thorough cleaning with pet-safe shampoo and professional blow dry.",
      duration: "45 min",
      price: "₹800",
      category: "Hygiene",
    },
    {
      id: 3,
      name: "Nail Trimming",
      description: "Professional trimming and filing of pet's nails.",
      duration: "15 min",
      price: "₹300",
      category: "Maintenance",
    },
    {
      id: 4,
      name: "De-shedding Treatment",
      description: "Special treatment to reduce shedding and remove loose undercoat.",
      duration: "60 min",
      price: "₹1,200",
      category: "Specialized",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-800">Services Catalog</h1>
          <p className="text-slate-500 text-sm">Configure and manage the grooming services you offer.</p>
        </div>
        <button className="bg-pink-500 hover:bg-pink-600 text-white px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-pink-500/20 transition-all">
          <FaPlus /> Add Service
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {services.map((service) => (
          <div key={service.id} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-lg transition-all group">
            <div className="flex items-start justify-between mb-4">
              <div>
                <span className="px-2.5 py-1 bg-slate-100 text-slate-500 rounded-lg text-[10px] font-black uppercase tracking-wider mb-2 inline-block">
                  {service.category}
                </span>
                <h3 className="text-lg font-black text-slate-800">{service.name}</h3>
              </div>
              <div className="flex gap-2">
                <button className="p-2 rounded-xl bg-slate-50 text-slate-400 hover:bg-blue-50 hover:text-blue-500 transition-all">
                  <FaEdit size={14} />
                </button>
                <button className="p-2 rounded-xl bg-slate-50 text-slate-400 hover:bg-rose-50 hover:text-rose-500 transition-all">
                  <FaTrashAlt size={14} />
                </button>
              </div>
            </div>

            <p className="text-sm text-slate-500 mb-6 leading-relaxed">
              {service.description}
            </p>

            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <FaClock className="text-slate-300" />
                  <span className="text-sm font-bold text-slate-700">{service.duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaTag className="text-slate-300 rotate-90" />
                  <span className="text-lg font-black text-emerald-600">{service.price}</span>
                </div>
              </div>
              <div className="flex -space-x-2">
                {[1, 2].map((i) => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-slate-200 flex items-center justify-center text-[10px] font-bold text-slate-500">
                    S{i}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServicesPage;
