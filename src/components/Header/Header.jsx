import React, { useState } from "react";
import Dropdown from "./Dropdown";
import { CiLogin } from "react-icons/ci";
import ThemeToggle from "../ThemeToggle/ThemeToggle";
import { useTheme } from "../ThemeToggle/ThemeContext";
import A2F from "../../Images/A2F.png";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

function Header() {
  const [activeItem, setActiveItem] = useState(null);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isDarkMode } = useTheme();
  const navigate = useNavigate();

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
          setIsMenuOpen(false);
        }}
      >
        <Link
          to={`/${id}`}
          className="flex justify-center items-center py-1.5 px-2 w-full"
        >
          <h1
            className={`text-sm font-medium ${
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
        </Link>

        {/* Dropdown Menu */}
        {hasDropdown && dropdownItems.length > 0 && isHovered && (
          <div
            className={`absolute left-0 top-full z-50 w-40 shadow-md rounded-lg opacity-100 visible transition-all duration-300 ${
              isDarkMode ? "bg-gray-800 text-gray-200" : "text-black bg-white"
            }`}
            onMouseEnter={() => setHoveredItem(id)}
            onMouseLeave={() => setHoveredItem(null)}
          >
            <ul className="py-1">
              {dropdownItems.map((item, index) => (
                <li
                  key={index}
                  className={`px-4 py-1.5 text-sm cursor-pointer ${
                    isDarkMode
                      ? "hover:bg-gray-700 text-gray-300"
                      : "hover:bg-gray-100"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}
        {hasDropdown && dropdownItems.length > 0 && (
          <div className="flex items-center ml-0">
            <Dropdown />
          </div>
        )}
      </div>
    );
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full shadow-md h-16 ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-white"
      }`}
    >
      <div className="flex items-center justify-between h-full px-4 mx-auto max-w-screen-xl">
        {/* Logo Section */}
        <div className="flex items-center h-full">
          <Link
            to="/"
            onClick={() => {
              setActiveItem(null);
              navigate("/");
            }}
          >
            <img
              src={A2F}
              className="h-10 w-auto object-contain cursor-pointer"
              alt="Logo"
            />
          </Link>
        </div>

        {/* Hamburger Menu Icon (Visible on Small Screens) */}
        <div className="md:hidden">
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

        {/* Navigation Items */}
        <nav
          className={`${
            isMenuOpen ? "flex" : "hidden"
          } md:flex flex-col md:flex-row absolute md:static top-16 left-0 w-full md:w-auto bg-gray-900 md:bg-transparent p-4 md:p-0 md:gap-1 ${
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
        </nav>

        {/* Right Side (Theme Toggle and Login) */}
        <div className="hidden md:flex items-center space-x-3">
          <div className="cursor-pointer">
            <ThemeToggle />
          </div>
          <div className="cursor-pointer">
            <button
              className={`text-sm font-medium px-4 py-1.5 rounded-lg shadow-md transition-all duration-300 ${
                isDarkMode
                  ? "bg-gray-700 text-white hover:bg-gray-600"
                  : "bg-orange-500 text-white hover:bg-orange-700"
              }`}
            >
              <div className="flex items-center gap-1">
                <span>Login</span>
                <CiLogin size={18} />
              </div>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
