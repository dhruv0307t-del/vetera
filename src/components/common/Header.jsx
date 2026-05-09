"use client";
import { NAV_LINKS_LIST } from "@/utils/helper";
import Link from "next/link";
import { useState, useEffect } from "react";
import { FaHeart, FaPaw } from "react-icons/fa";
import { usePathname } from "next/navigation";

const Header = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      document.body.classList.add("max-md:overflow-hidden");
    } else {
      document.body.classList.remove("max-md:overflow-hidden");
    }
  };

  // Hide header on home page - Moved here to follow React Hook rules
  if (pathname === "/") return null;

  return (
    <div
      className={`fixed top-0 left-0 w-full z-[100] transition-all duration-300 ${
        scrolled ? "bg-black/80 backdrop-blur-md shadow-md py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="container xl:max-w-[1140px] 2xl:max-w-[1440px] mx-auto xl:px-0 px-5 w-full">
        <nav className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group transition p-1">
            <div className="relative flex items-center justify-center text-yellow-400 drop-shadow-md">
               <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
               </svg>
               <span className="absolute mt-[2px]">
                 <FaPaw className="text-blue-900 w-4 h-4" />
               </span>
            </div>
            <span className={`text-2xl font-bold font-titillium tracking-wide transition-colors ${scrolled ? 'text-white' : 'text-white drop-shadow-lg'}`}>
              VetEra
            </span>
          </Link>

          <div
            className={`flex items-center md:flex-row flex-col md:static z-50 fixed transition-all ease-linear duration-300 md:h-auto ${
              isOpen
                ? "right-0 top-0 w-screen h-screen justify-center bg-blue-950/95 backdrop-blur-xl"
                : "right-[-100%] top-0"
            }`}
          >
            <ul className="flex items-center md:gap-8 lg:gap-12 gap-8 md:flex-row flex-col">
              {NAV_LINKS_LIST.map((obj, index) => {
                return (
                  <li key={index}>
                    <Link
                      onClick={() => setIsOpen(false)}
                      href={obj.href}
                      className={`font-semibold font-titillium text-base lg:text-lg transition-colors hover:text-yellow-400 ${
                        isOpen ? "text-white text-2xl" : scrolled ? "text-white" : "text-white drop-shadow-md"
                      }`}
                    >
                      {obj.link}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
          
          <button
            onClick={toggleMenu}
            className="flex flex-col items-center z-[60] relative justify-center w-10 h-10 focus:outline-none md:hidden cursor-pointer"
          >
            <span
              className={`block w-6 h-0.5 transition-transform duration-300 ${
                 scrolled || isOpen ? "bg-white" : "bg-white"
              } ${isOpen ? "rotate-45 translate-y-1.5" : ""}`}
            ></span>
            <span
              className={`block w-6 h-0.5 my-1 transition-opacity duration-300 ${
                 scrolled || isOpen ? "bg-white" : "bg-white"
              } ${isOpen ? "opacity-0" : ""}`}
            ></span>
            <span
              className={`block w-6 h-0.5 transition-transform duration-300 ${
                 scrolled || isOpen ? "bg-white" : "bg-white"
              } ${isOpen ? "-rotate-45 -translate-y-1.5" : ""}`}
            ></span>
          </button>
        </nav>
      </div>
    </div>
  );
};

export default Header;
