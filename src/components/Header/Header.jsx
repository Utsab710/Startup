import React, { useState } from "react";
import Dropdown from "./Dropdown";
import { CiLogin } from "react-icons/ci";
import ThemeToggle from "../ThemeToggle/ThemeToggle";
import { useTheme } from "../ThemeToggle/ThemeContext";
import A2F from "../../Images/A2F.png";

function Header() {
  const [activeItem, setActiveItem] = useState(null);
  const [hoveredItem, setHoveredItem] = useState(null);
  const { isDarkMode } = useTheme();

  const navItems = [
    {
      id: "about",
      text: "About",
      hasDropdown: true,
      dropdownItems: ["Our Team", "Mission", "Vision"],
    },
    {
      id: "corporate",
      text: "Corporate",
    },
    {
      id: "government",
      text: "Government",
    },
    {
      id: "review",
      text: "Review",
    },
    {
      id: "internship",
      text: "Internship",
      hasDropdown: true,
      dropdownItems: ["Frontend", "Backend", "Fullstack", "Others"],
    },
    {
      id: "event",
      text: "Event",
      hasDropdown: true,
      dropdownItems: ["StartupProgram", "GovernmentProgram"],
    },
    {
      id: "contact",
      text: "Contact",
    },
  ];

  const NavItem = ({ id, text, hasDropdown = false, dropdownItems = [] }) => {
    const isActive = activeItem === id;
    const isHovered = hoveredItem === id;

    return (
      <div
        className={`relative flex cursor-pointer rounded-md transition-all duration-200 ${
          isDarkMode
            ? isActive
              ? "bg-gray-700 text-white"
              : isHovered
              ? "bg-gray-800 text-gray-200"
              : "bg-transparent text-gray-300"
            : isActive
            ? "bg-orange-500/75 text-white shadow-lg"
            : isHovered
            ? "bg-orange-50 text-orange-600"
            : "bg-transparent text-gray-700"
        }`}
        onMouseEnter={() => setHoveredItem(id)}
        onMouseLeave={() => setHoveredItem(null)}
        onClick={() => setActiveItem(id)}
      >
        <div className="flex justify-center items-center py-2 px-4">
          <h1
            className={`font-semibold ${
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
          >
            {text}
          </h1>
        </div>

        {/* Dropdown Menu */}
        {hasDropdown && dropdownItems.length > 0 && isHovered && (
          <div
            className={`absolute left-0 top-full z-50 w-40 shadow-md rounded-lg opacity-100 visible transition-all duration-300 ${
              isDarkMode ? "bg-gray-800 text-gray-200" : "text-black bg-white"
            }`}
            onMouseEnter={() => setHoveredItem(id)}
            onMouseLeave={() => setHoveredItem(null)}
          >
            <ul className="py-2">
              {dropdownItems.map((item, index) => (
                <li
                  key={index}
                  className={`px-4 py-2 cursor-pointer ${
                    isDarkMode
                      ? "hover:bg-gray-700 text-gray-300"
                      : "hover:bg-gray-100"
                  }`}
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}
        <div className="flex justify-center items-center ">
          {hasDropdown && dropdownItems.length > 0 && (
            <div className="ml-[-15px]">
              <Dropdown />
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div>
      <section className=" ">
        <div
          className={`flex w-full py-3 shadow-md h-16 ${
            isDarkMode ? "bg-gray-900 text-white" : "bg-white"
          }`}
        >
          <div className="ml-4 flex items-center h-full">
            <img src={A2F} className="h-14 w-auto object-contain" alt="Logo" />
          </div>
          <div className="flex ml-9 justify-center gap-8 items-center">
            {navItems.map((item) => (
              <NavItem
                key={item.id}
                id={item.id}
                text={item.text}
                hasDropdown={item.hasDropdown}
                dropdownItems={item.dropdownItems || []}
              />
            ))}
          </div>
          <div className="cursor-pointer ml-80 flex items-center ">
            <ThemeToggle />
          </div>
          <div className="cursor-pointer ml-auto flex items-center mr-10">
            <button
              className={`font-semibold px-5 py-2 rounded-lg shadow-md transition-all duration-300 ${
                isDarkMode
                  ? "bg-gray-700 text-white hover:bg-gray-600"
                  : "bg-orange-500 text-white hover:bg-orange-700"
              }`}
            >
              <div className="flex items-center">
                <span>Login</span>
                <CiLogin size={20} />
              </div>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Header;
