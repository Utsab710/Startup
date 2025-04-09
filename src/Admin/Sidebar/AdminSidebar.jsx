import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  MdEvent,
  MdArticle,
  MdFormatQuote,
  MdGroups,
  MdPerson,
  MdHandshake,
  MdContactMail,
} from "react-icons/md";
import { FaPerson } from "react-icons/fa6";

function AdminSidebar({ isOpen, onClose }) {
  const navigate = useNavigate();
  const sidebarRef = useRef(null);

  // Handle outside clicks to close the sidebar
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  // Admin navigation options
  const adminOptions = [
    {
      id: "events",
      text: "Events",
      icon: <MdEvent size={20} />,
      path: "/admin/events",
    },
    {
      id: "blog",
      text: "Blog",
      icon: <MdArticle size={20} />,
      path: "/admin/blog",
    },
    {
      id: "quotes",
      text: "Quotes",
      icon: <MdFormatQuote size={20} />,
      path: "/admin/quotes",
    },
    {
      id: "clients",
      text: "Our Clients",
      icon: <MdGroups size={20} />,
      path: "/admin/clients",
    },
    {
      id: "mentors",
      text: "Mentors",
      icon: <MdPerson size={20} />,
      path: "/admin/mentors",
    },
    {
      id: "partners",
      text: "Partners",
      icon: <MdHandshake size={20} />,
      path: "/admin/partners",
    },
    {
      id: "contact",
      text: "Contact Page",
      icon: <MdContactMail size={20} />,
      path: "/admin/contact",
    },
    {
      id: "investors",
      text: "Investors ",
      icon: <FaPerson size={20} />,
      path: "/admin/investors",
    },
  ];

  const handleNavigation = (path) => {
    navigate(path);
    onClose();
  };

  return (
    <div
      ref={sidebarRef}
      className={`fixed left-0 top-0 h-full bg-gray-800 text-white w-64 z-50 shadow-lg transition-transform duration-300 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="p-4 border-b border-gray-700">
        <h2 className="text-xl font-bold">Admin Dashboard</h2>
      </div>

      <div className="mt-4">
        <ul>
          {adminOptions.map((option) => (
            <li key={option.id}>
              <button
                onClick={() => handleNavigation(option.path)}
                className="flex items-center w-full px-4 py-3 hover:bg-gray-700 transition-colors duration-200"
              >
                <span className="mr-3">{option.icon}</span>
                <span>{option.text}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default AdminSidebar;
