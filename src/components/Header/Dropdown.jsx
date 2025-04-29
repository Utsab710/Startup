import React from "react";
import { IoMdArrowDropdown } from "react-icons/io";

function Dropdown({ className, isDarkMode, isActive, isHovered }) {
  return (
    <div
      className={`inline-flex items-center justify-center transition-transform duration-200 ${
        className || ""
      }`}
    >
      <IoMdArrowDropdown
        className={`text-sm ${
          // Reduced icon size for tighter fit
          isDarkMode
            ? isActive
              ? "text-white"
              : isHovered
              ? "text-gray-200"
              : "text-gray-300"
            : isActive
            ? "text-white"
            : isHovered
            ? "text-orange-600"
            : "text-gray-700"
        }`}
      />
    </div>
  );
}

export default Dropdown;
