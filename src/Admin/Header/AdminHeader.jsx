// src/Admin/Header/AdminHeader.jsx
import React, { useState, useEffect, useRef } from "react";
import A2F from "../../Images/A2F.png";
import { MdOutlineDashboardCustomize } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { RiArrowDropDownLine } from "react-icons/ri";
import { CiSearch } from "react-icons/ci";
import { Link, useNavigate } from "react-router-dom";
import AdminSidebar from "../Sidebar/AdminSidebar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../../Context/AuthContext"; // Import AuthContext

function AdminHeader() {
  const { user, logout, loading } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const username = user?.username || "";
  const role = user?.role || "";

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const dropdownItems = [
    { id: "logout", text: "Logout", onClick: handleLogout },
  ];

  if (loading) {
    return <div className="text-center p-6">Loading...</div>;
  }

  if (!user || role !== "admin") {
    return null; // Render nothing if not admin (Header.jsx will handle non-admin)
  }

  return (
    <>
      <header className="flex items-center justify-between w-full bg-gray-800 text-white p-4">
        <div className="w-[12%] flex items-center space-x-4">
          <Link to="/admin/home">
            <img
              src={A2F}
              alt="Logo"
              className="h-15 w-auto object-contain cursor-pointer"
            />
          </Link>
          <div className="ml-auto">
            <MdOutlineDashboardCustomize
              className="cursor-pointer hover:text-blue-300 transition-colors"
              size={20}
              onClick={toggleSidebar}
            />
          </div>
        </div>

        <div className="w-[85%] flex items-center justify-between">
          <div className="relative w-full max-w-md transform translate-x-8">
            <input
              type="text"
              placeholder="Search..."
              className="w-full px-4 py-2 pr-10 rounded-4xl bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <CiSearch
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
          </div>

          <div className="flex items-center space-x-6">
            <button className="p-2 rounded-full bg-gray-700 hover:bg-gray-600">
              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14V4a6 6 0 010 12z" />
              </svg>
            </button>

            <div className="flex items-center space-x-2 gap-4">
              <FaUser size={25} />
              <span className="text-sm font-medium">
                <div>{username}</div>
                <div className="flex text-gray-400 items-center cursor-pointer">
                  {role}
                  <RiArrowDropDownLine
                    size={25}
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsDropdownOpen((prev) => !prev);
                    }}
                  />
                </div>

                {isDropdownOpen && (
                  <div
                    ref={dropdownRef}
                    className="absolute bg-gray-700 text-white rounded-lg shadow-lg mt-2 right-0 w-32"
                  >
                    <ul>
                      {dropdownItems.map((item) => (
                        <li
                          key={item.id}
                          className="px-4 py-2 cursor-pointer hover:bg-gray-600"
                          onClick={item.onClick}
                        >
                          {item.text}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </span>
            </div>
          </div>
        </div>
      </header>
      <AdminSidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}

export default AdminHeader;
