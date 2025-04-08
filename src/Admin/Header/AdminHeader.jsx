import React, { useEffect, useState } from "react";
import A2F from "../../Images/A2F.png";
import { MdOutlineDashboardCustomize } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { RiArrowDropDownLine } from "react-icons/ri";
import { CiSearch } from "react-icons/ci";
import { useNavigate } from "react-router-dom";

function AdminHeader() {
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State to handle dropdown visibility
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      const { username, role } = JSON.parse(userData);
      setUsername(username);
      setRole(role);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUsername("");
    setRole("");
    navigate("/login");
  };

  // Dropdown menu items
  const dropdownItems = [
    {
      id: "logout",
      text: "Logout",
      onClick: handleLogout, // Trigger the logout function
    },
  ];
  return (
    <header className="flex items-center justify-between w-full bg-gray-800 text-white p-4">
      {/* First Grid (15%) - Logo and Icon */}
      <div className="w-[12%] flex items-center space-x-4">
        <img
          src={A2F}
          alt="Logo"
          className="h-15 w-auto object-contain cursor-pointer"
        />
        <div className="ml-auto">
          {" "}
          <MdOutlineDashboardCustomize className="cursor-pointer" size={20} />
        </div>
      </div>

      {/* Second Grid (85%) - Search, Theme Button, User Info */}
      <div className="w-[85%] flex items-center justify-between">
        {/* Search Bar */}
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

        {/* Right Side (Theme Button + User Info) */}
        <div className="flex items-center space-x-6 tranform -translate-x-4">
          {/* Theme Button */}
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

          {/* Avatar and User Info */}
          <div className="flex items-center space-x-2 gap-4">
            <FaUser size={25} />
            <span className="text-sm font-medium">
              <div>{username}</div>
              <div className="flex text-gray-400 items-center">
                {role}
                <RiArrowDropDownLine
                  size={25}
                  onClick={() => setIsDropdownOpen((prev) => !prev)}
                />
              </div>
              {isDropdownOpen && (
                <div className="absolute bg-gray-700 text-white rounded-lg shadow-lg mt-2 right-0 w-32">
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
  );
}

export default AdminHeader;
