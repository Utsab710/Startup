import React, { useState, useEffect } from "react";
import { CiLogin, CiLogout } from "react-icons/ci";
import { FaUserCircle, FaBars, FaTimes, FaHome } from "react-icons/fa";
import ThemeToggle from "../ThemeToggle/ThemeToggle";
import { useTheme } from "../ThemeToggle/ThemeContext";

import { Link, useNavigate } from "react-router-dom";
import AdminHeader from "../../Admin/Header/AdminHeader";
import TopBar from "../TopBar/TopBar"; // Import TopBar
import { useAuth } from "../../Context/AuthContext.jsx";
import axios from "axios";
import Dropdown from "./Dropdown";

function Header() {
  const [activeItem, setActiveItem] = useState(null);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openSubMenus, setOpenSubMenus] = useState({});
  const [navItems, setNavItems] = useState([]);
  const [error, setError] = useState(null);
  const { user, logout, loading } = useAuth();
  const { isDarkMode } = useTheme();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const response = await axios.get(
          "https://a2f-backend.onrender.com/api/header",
          {
            withCredentials: true,
          }
        );
        setNavItems(response.data);
        setError(null);
      } catch (error) {
        setNavItems([]);
        setError("Failed to load menu.");
      }
    };
    if (!loading) fetchMenu();
  }, [loading]);

  const isLoggedIn = !!user;
  const username = user?.username || "";
  const userRole = user?.role || "user";

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      setError("Logout failed. Please try again.");
    }
  };

  const toggleSubMenu = (id) => {
    setOpenSubMenus((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const renderDropdown = (dropdownItems, level = 1, isMobile = false) => (
    <ul
      className={`${
        isMobile
          ? "ml-4 space-y-2"
          : `absolute left-0 top-full z-50 w-44 shadow-md rounded-lg transition-all duration-300 ${
              isDarkMode ? "bg-gray-800 text-gray-200" : "bg-white text-black"
            }`
      }`}
    >
      {dropdownItems.map((item) => (
        <li
          key={item.id}
          className={`${
            isMobile
              ? "text-base"
              : `px-4 py-2 text-base cursor-pointer ${
                  isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"
                }`
          }`}
          onClick={() => isMobile && setIsMenuOpen(false)}
        >
          <div className="flex items-center">
            <Link to={item.url} className="flex-1">
              {item.text}
            </Link>
            {item.hasDropdown && item.dropdownItems?.length > 0 && isMobile && (
              <button
                onClick={() => toggleSubMenu(item.id)}
                className="ml-0.5"
                aria-expanded={openSubMenus[item.id] || false}
                aria-label={`Toggle ${item.text} sub-menu`}
              >
                <Dropdown
                  className={`transition-transform duration-200 ${
                    openSubMenus[item.id] ? "rotate-180" : ""
                  }`}
                  isDarkMode={isDarkMode}
                />
              </button>
            )}
          </div>
          {item.hasDropdown &&
            item.dropdownItems?.length > 0 &&
            (isMobile ? openSubMenus[item.id] : hoveredItem === item.id) && (
              <div
                onMouseEnter={() => !isMobile && setHoveredItem(item.id)}
                onMouseLeave={() => !isMobile && setHoveredItem(null)}
              >
                {renderDropdown(item.dropdownItems, level + 1, isMobile)}
              </div>
            )}
        </li>
      ))}
    </ul>
  );

  const NavItem = React.memo(
    ({ id, text, url, hasDropdown, dropdownItems }) => {
      const isActive = activeItem === id;
      const isHovered = hoveredItem === id;

      return (
        <div
          className={`relative flex items-center cursor-pointer rounded-md transition-all duration-200 ${
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
          <Link to={url} className="flex items-center py-2 px-3">
            <span
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
            </span>
            {hasDropdown && dropdownItems?.length > 0 && !isMenuOpen && (
              <Dropdown
                className="ml-0.5"
                isDarkMode={isDarkMode}
                isActive={isActive}
                isHovered={isHovered}
              />
            )}
          </Link>
          {hasDropdown && dropdownItems?.length > 0 && isMenuOpen && (
            <button
              onClick={() => toggleSubMenu(id)}
              className="ml-0.5"
              aria-expanded={openSubMenus[id] || false}
              aria-label={`Toggle ${text} sub-menu`}
            >
              <Dropdown
                className={`transition-transform duration-200 ${
                  openSubMenus[id] ? "rotate-180" : ""
                }`}
                isDarkMode={isDarkMode}
                isActive={isActive}
                isHovered={isHovered}
              />
            </button>
          )}
          {hasDropdown &&
            dropdownItems?.length > 0 &&
            isHovered &&
            !isMenuOpen &&
            renderDropdown(dropdownItems)}
          {hasDropdown &&
            dropdownItems?.length > 0 &&
            isMenuOpen &&
            openSubMenus[id] &&
            renderDropdown(dropdownItems, 1, true)}
        </div>
      );
    }
  );

  if (loading) {
    return <div className="text-center p-6">Loading...</div>;
  }

  if (userRole === "admin") {
    return <AdminHeader />;
  }

  return (
    <>
      <TopBar />
      <div className="sticky top-0 z-50 w-full">
        {/* Render TopBar for non-admin users */}
        <header
          className={`w-full shadow-md h-18 ${
            isDarkMode ? "bg-gray-900 text-white" : "bg-white"
          }`}
        >
          <div className="flex items-center justify-between h-full px-6 mx-auto max-w-screen-xl">
            <div className="flex items-center h-full">
              <Link to="/" onClick={() => setActiveItem(null)}>
                <FaHome size={30} />
              </Link>
            </div>
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
            <nav
              className={`${
                isMenuOpen ? "flex" : "hidden"
              } md:flex flex-col md:flex-row absolute md:static top-24 left-0 w-full md:w-auto bg-gray-900 md:bg-transparent p-4 md:p-0 md:gap-2 ${
                isDarkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"
              }`}
            >
              {navItems.length === 0 ? (
                <div className="text-gray-500">No menu items available</div>
              ) : (
                navItems.map((item) => (
                  <NavItem
                    key={item.id}
                    id={item.id}
                    text={item.text}
                    url={item.url}
                    hasDropdown={item.hasDropdown}
                    dropdownItems={item.dropdownItems || []}
                  />
                ))
              )}
            </nav>
            <div className="hidden md:flex items-center space-x-4">
              <ThemeToggle />
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
          {error && (
            <div className="text-center p-4 text-red-500 bg-red-100 flex justify-between items-center">
              {error}
              <button onClick={() => setError(null)} className="text-red-700">
                ×
              </button>
            </div>
          )}
        </header>
      </div>
    </>
  );
}

export default Header;
