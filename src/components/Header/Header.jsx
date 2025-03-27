import React, { useState } from "react";
import Dropdown from "./Dropdown";
import { CiLogin } from "react-icons/ci";
import ThemeToggle from "../ThemeToggle/ThemeToggle";
import { useTheme } from "../ThemeToggle/ThemeContext";
import A2F from "../../Images/A2F.png";
import { FaBars, FaTimes } from "react-icons/fa"; // For hamburger menu icon

function Header() {
  const [activeItem, setActiveItem] = useState(null);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State for hamburger menu
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
    {
      id: "investor",
      text: "Investor",
    },
    {
      id: "startup",
      text: "Startup",
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
        onClick={() => {
          setActiveItem(id);
          setIsMenuOpen(false); // Close menu on item click
        }}
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
                  onClick={() => setIsMenuOpen(false)} // Close menu on dropdown item click
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}
        <div className="flex justify-center items-center">
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
    <header
      className={`sticky top-0 z-50 w-full shadow-md h-20 ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-white"
      }`}
    >
      <div className="flex items-center h-full max-w-screen-xl mx-auto ml-8 px-4">
        {/* Logo Section */}
        <div className="flex items-center h-full min-w-[120px]">
          <img src={A2F} className="h-14 w-auto object-contain" alt="Logo" />
        </div>

        {/* Hamburger Menu Icon (Visible on Small Screens) */}
        <div className="md:hidden ml-auto">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? (
              <FaTimes
                size={24}
                className={isDarkMode ? "text-white" : "text-gray-900"}
              />
            ) : (
              <FaBars
                size={24}
                className={isDarkMode ? "text-white" : "text-gray-900"}
              />
            )}
          </button>
        </div>

        {/* Navigation Items (Hidden on Small Screens, Visible on Medium and Up) */}
        <div
          className={`${
            isMenuOpen ? "flex" : "hidden"
          } md:flex flex-col md:flex-row absolute md:static top-20 left-0 w-full md:w-auto bg-gray-900 md:bg-transparent p-4 md:p-0 md:ml-9 md:gap-8 ${
            isDarkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"
          }`}
        >
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

        {/* Right Side (Theme Toggle and Login) */}
        <div className="hidden md:flex ml-auto items-center space-x-4 min-w-[200px]">
          <div className="cursor-pointer">
            <ThemeToggle />
          </div>
          <div className="cursor-pointer">
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
      </div>
    </header>
  );
}

export default Header;
