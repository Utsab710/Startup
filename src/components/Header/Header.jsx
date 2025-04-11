// src/components/Header.jsx
import React, { useState, useEffect } from "react";
import Dropdown from "./Dropdown";
import { CiLogin, CiLogout } from "react-icons/ci";
import { FaUserCircle } from "react-icons/fa";
import ThemeToggle from "../ThemeToggle/ThemeToggle";
import { useTheme } from "../ThemeToggle/ThemeContext";
import A2F from "../../Images/A2F.png";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import AdminHeader from "../../Admin/Header/AdminHeader";
import { useAuth } from "../../Context/AuthContext"; // Import AuthContext

function Header() {
  const [activeItem, setActiveItem] = useState(null);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout, loading } = useAuth(); // Use AuthContext
  const { isDarkMode } = useTheme();
  const navigate = useNavigate();

  // Update login state and role based on AuthContext
  const isLoggedIn = !!user;
  const username = user?.username || "";
  const userRole = user?.role || "user";

  // Logout handler
  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  const navItems = [
    {
      id: "about",
      text: "About",
      hasDropdown: true,
      dropdownItems: ["Our Team", "Mission", "Vision"],
    },
    { id: "startup", text: "Startup" },
    { id: "investor", text: "Investor" },
    { id: "corporate", text: "Corporate" },
    { id: "government", text: "Government" },
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
    { id: "Blog", text: "Blog", hasDropdown: false },
    { id: "contactus", text: "Contact" },
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
          className="flex justify-center items-center py-2 px-3 w-full"
        >
          <h1
            className={`text-base font-medium ${
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

        {hasDropdown && dropdownItems.length > 0 && isHovered && (
          <div
            className={`absolute left-0 top-full z-50 w-44 shadow-md rounded-lg opacity-100 visible transition-all duration-300 ${
              isDarkMode ? "bg-gray-800 text-gray-200" : "text-black bg-white"
            }`}
            onMouseEnter={() => setHoveredItem(id)}
            onMouseLeave={() => setHoveredItem(null)}
          >
            <ul className="py-1">
              {dropdownItems.map((item, index) => (
                <li
                  key={index}
                  className={`px-4 py-2 text-base cursor-pointer ${
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

  if (loading) {
    return <div className="text-center p-6">Loading...</div>;
  }

  return userRole === "admin" ? (
    <AdminHeader />
  ) : (
    <header
      className={`sticky top-0 z-50 w-full shadow-md h-24 ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-white"
      }`}
    >
      <div className="flex items-center justify-between h-full px-6 mx-auto max-w-screen-xl">
        {/* Logo Section */}
        <div className="flex items-center h-full">
          <Link to="/" onClick={() => setActiveItem(null)}>
            <img
              src={A2F}
              className="h-16 w-auto object-contain cursor-pointer"
              alt="Logo"
            />
          </Link>
        </div>

        {/* Hamburger Menu Icon */}
        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? (
              <FaTimes
                size={28}
                className={isDarkMode ? "text-white" : "text-gray-900"}
              />
            ) : (
              <FaBars
                size={28}
                className={isDarkMode ? "text-white" : "text-gray-900"}
              />
            )}
          </button>
        </div>

        {/* Navigation Items */}
        <nav
          className={`${
            isMenuOpen ? "flex" : "hidden"
          } md:flex flex-col md:flex-row absolute md:static top-24 left-0 w-full md:w-auto bg-gray-900 md:bg-transparent p-4 md:p-0 md:gap-2 ${
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

        {/* Right Side */}
        <div className="hidden md:flex items-center space-x-4">
          <div className="cursor-pointer">
            <ThemeToggle />
          </div>
          <div className="cursor-pointer">
            {isLoggedIn ? (
              <div className="flex items-center gap-3">
                <FaUserCircle
                  size={30}
                  className={isDarkMode ? "text-white" : "text-gray-700"}
                />
                <span
                  className={`text-base font-medium ${
                    isDarkMode ? "text-white" : "text-gray-700"
                  }`}
                >
                  {username}
                </span>
                <button
                  onClick={handleLogout}
                  className={`text-base font-medium px-5 py-2 rounded-lg shadow-md transition-all duration-300 ${
                    isDarkMode
                      ? "bg-gray-700 text-white hover:bg-gray-600"
                      : "bg-orange-500 text-white hover:bg-orange-700"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span>Logout</span>
                    <CiLogout size={20} />
                  </div>
                </button>
              </div>
            ) : (
              <button
                className={`text-base font-medium px-5 py-2 rounded-lg shadow-md transition-all duration-300 ${
                  isDarkMode
                    ? "bg-gray-700 text-white hover:bg-gray-600"
                    : "bg-orange-500 text-white hover:bg-orange-700"
                }`}
              >
                <Link to="/login" className="flex items-center gap-2">
                  <span>Login</span>
                  <CiLogin size={20} />
                </Link>
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
