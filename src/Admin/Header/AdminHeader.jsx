import React, { useState, useEffect, useRef } from "react";
import A2F from "../../Images/A2F.png";
import { MdOutlineDashboardCustomize } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { RiArrowDropDownLine } from "react-icons/ri";
import { CiSearch } from "react-icons/ci";
import { Link, useNavigate } from "react-router-dom";
import AdminSidebar from "../Sidebar/AdminSidebar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../../Context/AuthContext";
import axios from "axios";
import io from "socket.io-client";

function AdminHeader() {
  const { user, logout, loading } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const dropdownRef = useRef(null);
  const notificationRef = useRef(null);
  const socketRef = useRef(null);
  const navigate = useNavigate();

  const username = user?.username || "";
  const role = user?.role || "";

  // Fetch unread messages
  const fetchUnreadMessages = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_RENDER}/api/contact/unread`,
        {
          withCredentials: true,
        }
      );
      setNotifications(response.data.messages);
      setUnreadCount(response.data.unreadCount);
    } catch (error) {
      console.error("Error fetching unread messages:", error);
      toast.error("Failed to fetch notifications");
    }
  };

  // Initialize WebSocket
  useEffect(() => {
    if (user && role === "admin") {
      // Connect to WebSocket
      socketRef.current = io(`${import.meta.env.VITE_RENDER}`, {
        withCredentials: true,
        query: { token: localStorage.getItem("token") || "" }, // Send JWT for auth
      });

      // Join admin room
      socketRef.current.emit("joinAdmin", localStorage.getItem("token") || "");

      // Listen for new contact messages
      socketRef.current.on("newContact", (newContact) => {
        setNotifications((prev) => {
          const updated = [newContact, ...prev].slice(0, 5); // Keep latest 5
          return updated;
        });
        setUnreadCount((prev) => prev + 1);
        toast.info("New contact message received!");
      });

      // Fetch initial unread messages
      fetchUnreadMessages();

      // Cleanup on unmount
      return () => {
        socketRef.current.disconnect();
      };
    }
  }, [user, role]);

  // Handle clicks outside dropdowns
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setIsNotificationOpen(false);
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
      console.error("Logout failed:", error);
      toast.error("Logout failed");
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const dropdownItems = [
    // {
    //   id: "profile",
    //   text: "My Profile",
    //   onClick: () => navigate("/admin/profile"),
    // },
    // {
    //   id: "settings",
    //   text: "Settings",
    //   onClick: () => navigate("/admin/settings"),
    // },
    { id: "logout", text: "Logout", onClick: handleLogout },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (!user || role !== "admin") {
    return null;
  }

  return (
    <>
      <header className="flex items-center justify-between w-full bg-gradient-to-r from-gray-900 to-gray-800 text-white shadow-lg py-3 px-6 sticky top-0 z-50">
        <div className="flex items-center space-x-4 w-[15%]">
          <Link to="/admin/home" className="flex items-center">
            <img
              src={A2F}
              alt="Logo"
              className="h-10 w-auto object-contain cursor-pointer transition-transform hover:scale-105"
            />
          </Link>
          <div className="ml-auto">
            <button
              className="p-2 rounded-full hover:bg-gray-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-orange-400"
              onClick={toggleSidebar}
              aria-label="Toggle Sidebar"
            >
              <MdOutlineDashboardCustomize
                className="text-orange-400"
                size={22}
              />
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between flex-1 mx-8">
          <div className="relative w-full max-w-lg">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <CiSearch className="text-gray-400" size={20} />
            </div>
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-700/60 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all duration-200"
            />
          </div>

          <div className="flex items-center space-x-6 ml-4">
            {/* Theme toggle button */}
            <button
              className="p-2 rounded-full bg-gray-700/60 hover:bg-gray-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-orange-400"
              aria-label="Toggle Theme"
            >
              <svg
                className="w-5 h-5 text-orange-400"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14V4a6 6 0 010 12z" />
              </svg>
            </button>

            {/* Notification bell */}
            <div className="relative" ref={notificationRef}>
              <button
                className="p-2 rounded-full bg-gray-700/60 hover:bg-gray-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-orange-400"
                onClick={() => setIsNotificationOpen(!isNotificationOpen)}
                aria-label="Notifications"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-orange-400"
                >
                  <path d="M10.268 21a2 2 0 0 0 3.464 0" />
                  <path d="M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326" />
                </svg>
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                    {unreadCount}
                  </span>
                )}
              </button>

              {isNotificationOpen && (
                <div className="absolute right-0 mt-3 w-80 bg-gray-800 text-white rounded-lg shadow-2xl z-10 border border-gray-700 overflow-hidden transform origin-top-right transition-all duration-200">
                  <div className="border-b border-gray-700 px-4 py-3 bg-gray-900">
                    <h3 className="text-lg font-semibold flex items-center">
                      <span className="text-orange-400 mr-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M10.268 21a2 2 0 0 0 3.464 0" />
                          <path d="M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326" />
                        </svg>
                      </span>
                      Notifications
                    </h3>
                  </div>

                  <div className="max-h-64 overflow-y-auto">
                    {notifications.length === 0 ? (
                      <div className="flex flex-col items-center justify-center py-6 px-4 text-gray-400">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="40"
                          height="40"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="mb-2"
                        >
                          <path d="M10.268 21a2 2 0 0 0 3.464 0" />
                          <path d="M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326" />
                        </svg>
                        <p>No new messages</p>
                      </div>
                    ) : (
                      notifications.map((notification) => (
                        <div
                          key={notification._id}
                          className="px-4 py-3 border-b border-gray-700 cursor-pointer hover:bg-gray-700 transition-colors duration-150"
                          onClick={async () => {
                            try {
                              await axios.patch(
                                `${import.meta.env.VITE_RENDER}/api/contact/${
                                  notification._id
                                }/read`,
                                {},
                                { withCredentials: true }
                              );
                              setNotifications((prev) =>
                                prev.filter((n) => n._id !== notification._id)
                              );
                              setUnreadCount((prev) => prev - 1);
                            } catch (error) {
                              console.error(
                                "Error marking message as read:",
                                error
                              );
                              toast.error("Failed to mark message as read");
                            }
                          }}
                        >
                          <div className="flex items-start">
                            <div className="h-2 w-2 mt-1.5 bg-orange-500 rounded-full mr-2"></div>
                            <div className="flex-1">
                              <p className="text-sm font-medium text-white">
                                {notification.Subject}
                              </p>
                              <p className="text-xs text-gray-300 line-clamp-2 mt-1">
                                {notification.Message}
                              </p>
                              <p className="text-xs text-gray-400 mt-1.5">
                                {new Date(
                                  notification.createdAt
                                ).toLocaleString()}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>

                  <div className="p-3 bg-gray-900">
                    <button
                      onClick={() => {
                        setIsNotificationOpen(false);
                        navigate("/admin/contact");
                      }}
                      className="w-full py-2 bg-orange-600 hover:bg-orange-500 text-white rounded-md text-sm font-medium transition-colors duration-200 flex items-center justify-center"
                    >
                      View All Messages
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="ml-1"
                      >
                        <path d="M5 12h14"></path>
                        <path d="m12 5 7 7-7 7"></path>
                      </svg>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* User profile section */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsDropdownOpen((prev) => !prev);
                }}
                className="flex items-center space-x-3 px-3 py-2 rounded-lg bg-gray-700/60 hover:bg-gray-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-orange-400"
              >
                <div className="flex items-center justify-center h-8 w-8 rounded-full bg-orange-500 text-white">
                  <FaUser size={15} />
                </div>
                <div className="text-left hidden sm:block">
                  <p className="text-sm font-medium leading-tight">
                    {username}
                  </p>
                  <p className="text-xs text-gray-400 flex items-center">
                    {role}
                    <RiArrowDropDownLine
                      size={20}
                      className="text-orange-400"
                    />
                  </p>
                </div>
              </button>

              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-gray-800 text-white rounded-lg shadow-2xl z-10 border border-gray-700 overflow-hidden transform origin-top-right transition-all duration-200">
                  <div className="border-b border-gray-700 px-4 py-3 bg-gray-900">
                    <p className="font-medium text-sm">{username}</p>
                    <p className="text-xs text-gray-400">{role}</p>
                  </div>
                  <ul>
                    {dropdownItems.map((item) => (
                      <li
                        key={item.id}
                        className="px-4 py-2 cursor-pointer hover:bg-gray-700 transition-colors duration-150 flex items-center"
                        onClick={item.onClick}
                      >
                        {item.id === "profile" && (
                          <span className="mr-2 text-orange-400">
                            <FaUser size={14} />
                          </span>
                        )}
                        {item.id === "settings" && (
                          <span className="mr-2 text-orange-400">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="14"
                              height="14"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path>
                              <circle cx="12" cy="12" r="3"></circle>
                            </svg>
                          </span>
                        )}
                        {item.id === "logout" && (
                          <span className="mr-2 text-orange-400">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="14"
                              height="14"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                              <polyline points="16 17 21 12 16 7"></polyline>
                              <line x1="21" y1="12" x2="9" y2="12"></line>
                            </svg>
                          </span>
                        )}
                        {item.text}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
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
