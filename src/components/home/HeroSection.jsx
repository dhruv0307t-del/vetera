import Link from "next/link";
import React from "react";

const HeroSection = () => {
  return (
    <div className="relative w-full h-[600px] md:h-[700px] lg:h-[800px] flex items-center bg-transparent mt-[-10px]">
      {/* Background Image Container */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center before:content-[''] before:absolute before:inset-0 before:bg-gradient-to-r before:from-black/10 before:to-black/30 w-full rounded-b-[2rem] md:rounded-b-[3rem] overflow-hidden" 
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1544568100-847a948585b9?q=80&w=2674&auto=format&fit=crop')" }}
      />
      
      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 xl:px-10 flex flex-col md:items-end md:text-right mt-10 md:mt-0">
        
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-[#9BB1D6] font-titillium mb-4 drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
          Welcome to VetEra
        </h1>
        
        <p className="text-xl md:text-3xl text-white font-medium mb-10 drop-shadow-[0_2px_4px_rgba(0,0,0,0.7)] tracking-wide">
          Your all-in-one platform for pet care
        </p>
        
        <div className="flex flex-col sm:flex-row gap-5">
          <Link href="/appointments/create" className="px-8 py-3.5 bg-white/95 text-blue-900 rounded-full font-bold text-lg text-center backdrop-blur-sm shadow-xl hover:bg-white transition-all transform hover:scale-105">
            Schedule Appointment
          </Link>
          <Link href="/appointments" className="px-8 py-3.5 bg-[#8FA7D0]/90 text-white rounded-full font-bold text-lg text-center backdrop-blur-sm shadow-xl hover:bg-[#7D9BC9] transition-all transform hover:scale-105 border border-white/20">
            View Appointments
          </Link>
        </div>

      </div>
    </div>
  );
};

export default HeroSection;
