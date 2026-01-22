"use client";
import { NAV_LINKS_LIST } from "@/utils/helper";
import Link from "next/link";
import { useState } from "react";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      document.body.classList.add("max-md:overflow-hidden");
    } else {
      document.body.classList.remove("max-md:overflow-hidden");
    }
    return;
  };

  return (
    <div className="md:py-5 py-2 shadow">
      <div className="container xl:max-w-[1140px] 2xl:max-w-[1440px] mx-auto xl:px-0 px-5 w-full">
        <nav className="flex items-center justify-between">
          <Link href="/" className="relative">
            <img
              src="/assets/images/png/logo.png"
              alt="logo"
              className="max-w-[60px] w-full h-[50px]"
            />
          </Link>
          <div
            className={`flex items-center md:flex-row flex-col md:static z-50 fixed transition-all ease-linear duration-300 md:h-auto  ${
              isOpen
                ? "right-0 top-0 w-screen h-screen justify-center bg-white"
                : "right-[-100%] top-0"
            }`}
          >
            <ul className="flex items-center md:gap-8 lg:gap-12 gap-6 md:flex-row flex-col">
              {NAV_LINKS_LIST.map((obj, index) => {
                return (
                  <li key={index}>
                    <Link
                      onClick={() => setIsOpen(false)}
                      href={obj.href}
                      className="text-black font-medium font-titillium !leading-[150%] capitalize text-xl md:text-lg relative nav_link"
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
              className={`block w-6 h-0.5 bg-black transition-transform duration-300 ${
                isOpen ? "rotate-45 translate-y-1.5" : ""
              }`}
            ></span>
            <span
              className={`block w-6 h-0.5 bg-black my-1 transition-opacity duration-300 ${
                isOpen ? "opacity-0" : ""
              }`}
            ></span>
            <span
              className={`block w-6 h-0.5 bg-black transition-transform duration-300 ${
                isOpen ? "-rotate-45 -translate-y-1.5" : ""
              }`}
            ></span>
          </button>
        </nav>
      </div>
    </div>
  );
};

export default Header;
