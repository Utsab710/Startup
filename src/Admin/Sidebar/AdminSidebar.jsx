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
  MdOutlineViewHeadline,
} from "react-icons/md";
import { FaPerson } from "react-icons/fa6";
import { CiLink } from "react-icons/ci";
import { IoChevronDown, IoChevronUp } from "react-icons/io5"; // For toggle icons

function AdminSidebar({ isOpen, onClose }) {
  const navigate = useNavigate();
  const sidebarRef = useRef(null);

  // State to track which sections are expanded
  const [expandedSections, setExpandedSections] = useState({});

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

  // Toggle the expanded state of a section
  const toggleSection = (id) => {
    setExpandedSections((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Admin navigation options with nested structure
  const adminOptions = [
    {
      id: "about-us",
      text: "About Us",
      icon: <MdGroups size={20} />,
      children: [
        {
          id: "mentors",
          text: "Mentors",
          icon: <MdPerson size={20} />,
          path: "/admin/mentors",
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
          id: "partners",
          text: "Partners",
          icon: <MdHandshake size={20} />,
          path: "/admin/partners",
        },

        {
          id: "link",
          text: "link",
          icon: <CiLink size={20} />,
          path: "/admin/link",
        },
      ],
    },
    {
      id: "blog",
      text: "Blog",
      icon: <MdArticle size={20} />,
      path: "/admin/blogs",
    },
    {
      id: "investors",
      text: "Investors",
      icon: <FaPerson size={20} />,
      path: "/admin/investors",
    },

    {
      id: "contact",
      text: "Contact Page",
      icon: <MdContactMail size={20} />,
      path: "/admin/contact",
    },
    {
      id: "events",
      text: "Events",
      icon: <MdEvent size={20} />,
      path: "/admin/events",
    },

    {
      id: "header",
      text: "Header",
      icon: <MdOutlineViewHeadline size={20} />,
      path: "/admin/reorderheader",
    },
  ];

  // Handle navigation
  const handleNavigation = (path) => {
    if (path) {
      navigate(path);
      onClose();
    }
  };

  // Recursive component to render menu items
  const renderMenuItem = (item) => {
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expandedSections[item.id];

    const handleClick = () => {
      if (hasChildren) {
        toggleSection(item.id);
      } else {
        handleNavigation(item.path);
      }
    };

    return (
      <li key={item.id}>
        <button
          onClick={handleClick}
          className="flex items-center w-full px-4 py-2 hover:bg-gray-700"
        >
          <span className="mr-2">{item.icon}</span>
          <span className="flex-1 text-left">{item.text}</span>
          {hasChildren && (
            <span>{isExpanded ? <IoChevronUp /> : <IoChevronDown />}</span>
          )}
        </button>

        {/* Show child items if expanded */}
        {hasChildren && isExpanded && (
          <ul className="ml-4 bg-gray-900">
            {item.children.map((child) => (
              <li key={child.id}>
                <button
                  onClick={() => handleNavigation(child.path)}
                  className="flex items-center w-full px-4 py-2 hover:bg-gray-600"
                >
                  <span className="mr-2">{child.icon}</span>
                  <span>{child.text}</span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </li>
    );
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
        <ul>{adminOptions.map((option) => renderMenuItem(option))}</ul>
      </div>
    </div>
  );
}

export default AdminSidebar;
