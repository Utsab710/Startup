import React, { useState, useRef } from "react";
import { useTheme } from "../ThemeToggle/ThemeContext";
import { motion, useInView } from "framer-motion";

// Reusable Card Component
const Card = ({
  item,
  isDarkMode,
  renderIcon,
  withButton = false,
  className = "",
}) => (
  <motion.div
    className={`rounded-xl p-6 shadow-lg hover:shadow-xl flex flex-col h-full transition-colors duration-300 ${
      isDarkMode ? "bg-gray-800" : "bg-white"
    } ${className}`}
  >
    <div
      className={`rounded-full p-3 w-16 h-16 flex items-center justify-center mb-4 ${
        isDarkMode
          ? "bg-gray-700 text-orange-400"
          : "bg-orange-100 text-orange-600"
      }`}
    >
      {renderIcon(item.icon)}
    </div>
    <div className="flex-grow">
      <h3
        className={`text-xl font-bold mb-2 ${
          isDarkMode ? "text-white" : "text-gray-900"
        }`}
      >
        {item.title}
      </h3>
      <p className={`mb-6 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
        {item.description}
      </p>
    </div>
    {withButton && (
      <div className="mt-auto pt-4">
        <button
          className={`w-full py-3 rounded-lg font-medium transition-all duration-300 ${
            isDarkMode
              ? "bg-gray-700 text-orange-400 hover:bg-gray-600"
              : "bg-orange-50 text-orange-600 hover:bg-orange-100"
          }`}
          aria-label={`Learn more about ${item.title}`}
        >
          Learn More
        </button>
      </div>
    )}
  </motion.div>
);

function Government() {
  const { isDarkMode } = useTheme();
  const [activeTab, setActiveTab] = useState("startups");

  // Refs for animation triggers
  const initiativesSectionRef = useRef(null);
  const initiativesInView = useInView(initiativesSectionRef, {
    once: true,
    amount: 0.3,
  });

  const approachSectionRef = useRef(null);
  const approachInView = useInView(approachSectionRef, {
    once: true,
    amount: 0.3,
  });

  const programsSectionRef = useRef(null);
  const programsInView = useInView(programsSectionRef, {
    once: true,
    amount: 0.3,
  });

  // Data Arrays
  const keyInitiatives = [
    {
      title: "Startup Programs",
      description:
        "Pioneering tailored startup programs for government departments like IDEX and MEITy.",
      icon: "rocket",
    },
    {
      title: "Incubation Centers",
      description:
        "Managing AIC, CII, and DST incubators nurturing groundbreaking ideas.",
      icon: "building",
    },
    {
      title: "Policy Development",
      description:
        "Drafting innovation policies and assisting policymakers in crafting technology regulations under the umbrella of innovation.",
      icon: "file-text",
    },
    {
      title: "Global Partnerships",
      description:
        "Offering innovation consulting to support foreign governments in establishing incubation centers.",
      icon: "globe",
    },
  ];

  const governmentBenefits = [
    {
      title: "Economic Growth",
      description:
        "Stimulate local economies through innovation and job creation in emerging sectors.",
      icon: "chart-line",
    },
    {
      title: "Digital Transformation",
      description:
        "Accelerate the adoption of cutting-edge technologies in public service delivery.",
      icon: "refresh",
    },
    {
      title: "Ecosystem Development",
      description:
        "Build robust innovation ecosystems that connect startups, industry, academia, and government.",
      icon: "users",
    },
  ];

  const strategicApproach = [
    {
      title: "Assessment",
      description:
        "Evaluating needs and opportunities for innovation within government sectors.",
      icon: "search",
    },
    {
      title: "Sensitization",
      description:
        "Raising awareness and understanding of cutting-edge technologies and innovative practices.",
      icon: "lightbulb",
    },
    {
      title: "Engagement",
      description:
        "Actively collaborating with government entities to foster a culture of innovation.",
      icon: "handshake",
    },
    {
      title: "Development",
      description:
        "Creating strategic plans to implement and scale innovative solutions.",
      icon: "tool",
    },
  ];

  const startupPrograms = [
    {
      title: "T-Fund",
      description:
        "A collaboration between T-Hub and the Telangana government, offering INR 25 lakhs to 1 crore for early-stage tech startups.",
      icon: "dollar-sign",
    },
    {
      title: "Startup Nepal Seed Fund",
      description:
        "Supporting tech startups in their initial two years with funding for PoC, prototype development, and market entry.",
      icon: "seedling",
    },
    {
      title: "Sectoral Accelerators",
      description:
        "Targeted programs for healthcare, agriculture, and smart cities in partnership with line ministries.",
      icon: "layers",
    },
  ];

  const governmentServices = [
    {
      title: "Innovation Policy Advisory",
      description:
        "Expert guidance on crafting policy frameworks that enable innovation ecosystems at state and national levels.",
      icon: "clipboard",
    },
    {
      title: "E-Governance Solutions",
      description:
        "Facilitating the adoption of digital solutions for efficient public service delivery and citizen engagement.",
      icon: "server",
    },
    {
      title: "Capacity Building",
      description:
        "Comprehensive training programs for government officials to develop innovation mindsets and technical skills.",
      icon: "users",
    },
  ];

  // Render icon with fallback
  const renderIcon = (iconName) => {
    switch (iconName) {
      case "rocket":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 10V3L4 14h7v7l9-11h-7z"
            />
          </svg>
        );
      case "globe":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        );
      case "lightbulb":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
            />
          </svg>
        );
      case "refresh":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
        );
      case "chart-line":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
            />
          </svg>
        );
      case "shield":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
            />
          </svg>
        );
      case "users":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
            />
          </svg>
        );
      case "building":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
            />
          </svg>
        );
      case "handshake":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 14v6m-3-3h6M6 10h2a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2zm10 0h2a2 2 0 002-2V6a2 2 0 00-2-2h-2a2 2 0 00-2 2v2a2 2 0 002 2zM6 20h2a2 2 0 002-2v-2a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2z"
            />
          </svg>
        );
      case "file-text":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
        );
      case "search":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        );
      case "tool":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        );
      case "dollar-sign":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        );
      case "seedling":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4"
            />
          </svg>
        );
      case "clipboard":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
            />
          </svg>
        );
      case "server":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"
            />
          </svg>
        );
      case "layers":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
            />
          </svg>
        );
      default:
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
        );
    }
  };

  return (
    <div
      className={`w-full py-16 transition-colors duration-300 ${
        isDarkMode ? "bg-gray-900 text-gray-200" : "bg-white text-gray-900"
      }`}
    >
      {/* Hero Section */}
      <div className="px-4 md:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <div className="md:w-1/2 space-y-6">
            <div
              className={`inline-block rounded-full p-2 transition-colors duration-300 ${
                isDarkMode ? "bg-gray-800" : "bg-orange-50"
              }`}
            >
              <span
                className={`font-medium text-base tracking-wide p-2 transition-colors duration-300 ${
                  isDarkMode ? "text-orange-400" : "text-orange-600"
                }`}
              >
                Government Partnerships
              </span>
            </div>
            <h1
              className={`text-4xl md:text-5xl font-black leading-tight transition-colors duration-300 ${
                isDarkMode ? "text-[#3b5998]" : "text-[#3b5998]"
              }`}
            >
              Building
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-orange-400">
                Nation-scale Innovation
              </span>
              Ecosystems
            </h1>
            <p
              className={`text-lg max-w-md leading-relaxed transition-colors duration-300 ${
                isDarkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Fostering Public-Private Partnerships to Drive Innovation in
              Governance and Public Services
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <button
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-bold transition-all duration-300 shadow-lg hover:shadow-xl ${
                  isDarkMode
                    ? "bg-orange-700 text-white hover:bg-orange-600"
                    : "bg-orange-500 text-white hover:bg-orange-600"
                }`}
                aria-label="Get details about government partnerships"
              >
                Get Details
              </button>
              <a
                href="#approach"
                className={`font-semibold transition-colors flex items-center gap-2 ${
                  isDarkMode
                    ? "text-orange-400 hover:text-orange-500"
                    : "text-orange-600 hover:text-orange-700"
                }`}
                aria-label="Learn more about our strategic approach"
              >
                Learn More
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </a>
            </div>
          </div>
          <div className="md:w-1/2 relative">
            <div
              className={`absolute -top-10 -right-10 w-64 h-64 rounded-full blur-2xl opacity-50 transition-colors duration-300 ${
                isDarkMode ? "bg-gray-800" : "bg-orange-100"
              }`}
            ></div>
            <img
              src="https://imgs.search.brave.com/xFV7eiZMzJbc1CUbEwuxtL7gVcmVhYA2PqGDMwV0RHg/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/cHJlbWl1bS1waG90/by9wYXJ0LWNhcGl0/b2wtYnVpbGRpbmct/d2l0aC1jb2x1bW5z/LXN0cmVldC1sYW1w/LWJsdWUtc2t5LWJh/Y2tncm91bmQtd2l0/aC1jb3B5LXNwYWNl/XzEwNDg5NDQtMTAz/Mzg4Ni5qcGc_c2Vt/dD1haXNfY291bnRy/eV9ib29zdCZ3PTc0/MA"
              className="relative w-full h-auto rounded-2xl shadow-2xl z-10"
              alt="Government innovation initiative building"
              loading="lazy"
            />
          </div>
        </div>
      </div>

      {/* Strategic Approach Section */}
      <div
        id="approach"
        ref={approachSectionRef}
        className="mt-24 px-4 md:px-8 max-w-7xl mx-auto"
      >
        <div className="text-center mb-12">
          <h2
            className={`text-3xl font-bold ${
              isDarkMode ? "text-[#3b5998]" : "text-[#3b5998]"
            }`}
          >
            Strategic{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-orange-400">
              Approach
            </span>
          </h2>
          <p
            className={`mt-2 text-lg max-w-2xl mx-auto ${
              isDarkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Our comprehensive framework for partnering with government agencies
            to build sustainable innovation ecosystems
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {strategicApproach.map((area, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -50 }}
              animate={
                approachInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }
              }
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <Card
                item={area}
                isDarkMode={isDarkMode}
                renderIcon={renderIcon}
                withButton
              />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Key Initiatives Section */}
      <div
        ref={initiativesSectionRef}
        className="mt-24 px-4 md:px-8 max-w-7xl mx-auto"
      >
        <div
          className={`rounded-2xl p-8 md:p-12 shadow-lg transition-colors duration-300 ${
            isDarkMode ? "bg-gray-800" : "bg-orange-50"
          }`}
        >
          <div className="text-center mb-12">
            <h2
              className={`text-3xl font-bold ${
                isDarkMode ? "text-[#3b5998]" : "text-[#3b5998]"
              }`}
            >
              Key{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-orange-400">
                Initiatives
              </span>
            </h2>
            <p
              className={`mt-2 text-lg max-w-2xl mx-auto ${
                isDarkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Flagship programs designed to accelerate innovation within
              government and create public value
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {keyInitiatives.map((initiative, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={
                  initiativesInView
                    ? { opacity: 1, y: 0 }
                    : { opacity: 0, y: 30 }
                }
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <Card
                  item={initiative}
                  isDarkMode={isDarkMode}
                  renderIcon={renderIcon}
                  withButton={false}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Government Benefits Section */}
      <div className="mt-24 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2
            className={`text-3xl font-bold ${
              isDarkMode ? "text-[#3b5998]" : "text-[#3b5998]"
            }`}
          >
            Benefits for{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-orange-400">
              Governments
            </span>
          </h2>
          <p
            className={`mt-2 text-lg max-w-2xl mx-auto ${
              isDarkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            How our partnerships empower governments to achieve transformative
            outcomes
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {governmentBenefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={
                initiativesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
              }
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <Card
                item={benefit}
                isDarkMode={isDarkMode}
                renderIcon={renderIcon}
                withButton={false}
              />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Programs and Services Section */}
      <div
        ref={programsSectionRef}
        className="mt-24 px-4 md:px-8 max-w-7xl mx-auto"
      >
        <div className="text-center mb-12">
          <h2
            className={`text-3xl font-bold ${
              isDarkMode ? "text-[#3b5998]" : "text-[#3b5998]"
            }`}
          >
            Programs &{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-orange-400">
              Services
            </span>
          </h2>
          <p
            className={`mt-2 text-lg max-w-2xl mx-auto ${
              isDarkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Explore our tailored offerings for startups and government services
          </p>
        </div>

        {/* Tabs for Programs and Services */}
        <div className="flex justify-center mb-8">
          <div
            className={`inline-flex rounded-lg p-1 transition-colors duration-300 ${
              isDarkMode ? "bg-gray-800" : "bg-orange-50"
            }`}
          >
            <button
              className={`px-6 py-2 rounded-lg font-medium transition-all duration-300 ${
                activeTab === "startups"
                  ? isDarkMode
                    ? "bg-orange-700 text-white"
                    : "bg-orange-500 text-white"
                  : isDarkMode
                  ? "text-gray-400 hover:text-orange-400"
                  : "text-gray-600 hover:text-orange-600"
              }`}
              onClick={() => setActiveTab("startups")}
              aria-label="View startup programs"
            >
              Startup Programs
            </button>
            <button
              className={`px-6 py-2 rounded-lg font-medium transition-all duration-300 ${
                activeTab === "services"
                  ? isDarkMode
                    ? "bg-orange-700 text-white"
                    : "bg-orange-500 text-white"
                  : isDarkMode
                  ? "text-gray-400 hover:text-orange-400"
                  : "text-gray-600 hover:text-orange-600"
              }`}
              onClick={() => setActiveTab("services")}
              aria-label="View government services"
            >
              Government Services
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {activeTab === "startups" &&
            startupPrograms.map((program, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={
                  programsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
                }
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <Card
                  item={program}
                  isDarkMode={isDarkMode}
                  renderIcon={renderIcon}
                  withButton
                />
              </motion.div>
            ))}
          {activeTab === "services" &&
            governmentServices.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={
                  programsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
                }
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <Card
                  item={service}
                  isDarkMode={isDarkMode}
                  renderIcon={renderIcon}
                  withButton
                />
              </motion.div>
            ))}
        </div>
      </div>

      {/* Call to Action Section */}
      <div
        className={`mt-24 px-4 md:px-8 max-w-7xl mx-auto py-16 rounded-2xl transition-colors duration-300 ${
          isDarkMode ? "bg-gray-800" : "bg-orange-50"
        }`}
      >
        <div className="text-center">
          <h2
            className={`text-3xl font-bold ${
              isDarkMode ? "text-[#3b5998]" : "text-[#3b5998]"
            }`}
          >
            Ready to Transform{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-orange-400">
              Governance?
            </span>
          </h2>
          <p
            className={`mt-4 text-lg max-w-2xl mx-auto ${
              isDarkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Partner with us to build innovative ecosystems that empower
            governments and citizens alike.
          </p>
          <button
            className={`mt-8 px-8 py-4 rounded-lg font-bold transition-all duration-300 shadow-lg hover:shadow-xl ${
              isDarkMode
                ? "bg-orange-700 text-white hover:bg-orange-600"
                : "bg-orange-500 text-white hover:bg-orange-600"
            }`}
            aria-label="Contact us to start a partnership"
          >
            Contact Us
          </button>
        </div>
      </div>
    </div>
  );
}

export default Government;
