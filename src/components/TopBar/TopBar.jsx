import React from "react";
import A2F from "../../Images/A2F.png";
import { useTheme } from "../ThemeToggle/ThemeContext";

export default function TopBar() {
  const { isDarkMode } = useTheme();

  return (
    <>
      <div
        className={`relative w-full h-25 ${
          isDarkMode ? "bg-gray-800" : "bg-white"
        } flex items-center justify-between px-8`}
      >
        {/* Logo Position */}
        <div className="w-1/4 relative z-10 ml-16">
          <img
            src={A2F}
            className="h-26 w-auto object-contain cursor-pointer"
            alt="A2F Logo"
          />
        </div>

        {/* Central Text Section */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <h1 className="block font-bold text-3xl mt-2">
            <span className="text-[#485eac]">A2F {""}</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-orange-400">
              Nexus
            </span>
          </h1>
          <h2
            className={`text-base ${
              isDarkMode ? "text-gray-300" : "text-gray-700"
            }`}
          >
            Putalisadak, Kathmandu, Nepal
          </h2>
        </div>
      </div>

      {/* Normal gray divider */}
      <div className="w-full">
        <div
          className={`w-full h-px ${
            isDarkMode ? "bg-gray-500" : "bg-gray-300"
          }`}
        ></div>
      </div>
    </>
  );
}
