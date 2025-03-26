import React from "react";
import { FaRegLightbulb } from "react-icons/fa";
import { MdOutlineNightlight } from "react-icons/md";
import { useTheme } from "./ThemeContext";

const ThemeToggle = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <button
      className={`p-3 cursor-pointer rounded-full shadow-md transition duration-300 ${
        isDarkMode
          ? "bg-gray-700 hover:bg-gray-600 text-white"
          : "bg-orange-200 hover:bg-orange-300"
      }`}
      onClick={toggleTheme}
    >
      {isDarkMode ? <MdOutlineNightlight /> : <FaRegLightbulb />}
    </button>
  );
};

export default ThemeToggle;
