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

function Corporate() {
  const { isDarkMode } = useTheme();
  const [activeTab, setActiveTab] = useState("corporates");

  // Refs for animation triggers
  const featuresSectionRef = useRef(null);
  const featuresInView = useInView(featuresSectionRef, {
    once: true,
    amount: 0.3,
  });

  const focusSectionRef = useRef(null);
  const focusInView = useInView(focusSectionRef, { once: true, amount: 0.3 });

  const benefitsSectionRef = useRef(null);
  const benefitsInView = useInView(benefitsSectionRef, {
    once: true,
    amount: 0.3,
  });

  // Data Arrays
  const keyFeatures = [
    {
      title: "High-Impact Programs",
      description:
        "Our curated programs are geared to accelerate your innovation journey.",
      icon: "rocket",
    },
    {
      title: "Create a Global Network",
      description:
        "Forge alliances with industry peers to build innovative solutions.",
      icon: "globe",
    },
    {
      title: "Adopt an Innovation Mindset",
      description:
        "We foster intrapreneurship and serve as a gateway for startups with our state-of-the-art initiatives.",
      icon: "lightbulb",
    },
    {
      title: "Amplify Digital Transformation",
      description:
        "Connect with innovative startups to transform your innovation model.",
      icon: "refresh",
    },
  ];

  const corporateBenefits = [
    {
      title: "Accelerated Growth",
      description:
        "Fast-track your innovation initiatives and reduce time-to-market for new solutions.",
      icon: "chart-line",
    },
    {
      title: "Risk Mitigation",
      description:
        "Test new ideas in a controlled environment before full-scale implementation.",
      icon: "shield",
    },
    {
      title: "Talent Development",
      description:
        "Foster an innovation mindset within your team and attract top talent.",
      icon: "users",
    },
  ];

  const focusAreas = [
    {
      title: "Incubation",
      description:
        "Our state-of-the-art incubation program provides startups with workspace, resources, and mentorship.",
      icon: "building",
    },
    {
      title: "Mentorship",
      description:
        "Connect with industry experts and seasoned entrepreneurs for guidance and strategic advice.",
      icon: "user-tie",
    },
    {
      title: "Collaboration",
      description:
        "We facilitate partnerships between startups, corporates, investors, and government agencies.",
      icon: "handshake",
    },
    {
      title: "Placement",
      description:
        "Our placement initiatives connect promising talent with innovative companies.",
      icon: "briefcase",
    },
  ];

  const corporateSolutions = [
    {
      title: "Innovation Labs",
      description:
        "Build dedicated innovation spaces to foster creativity and problem-solving within your organization.",
      icon: "building",
    },
    {
      title: "Startup Partnerships",
      description:
        "Collaborate with high-potential startups to co-create solutions and drive digital transformation.",
      icon: "handshake",
    },
    {
      title: "Intrapreneurship Programs",
      description:
        "Empower your employees to innovate from within through structured intrapreneurship initiatives.",
      icon: "lightbulb",
    },
  ];

  const startupSolutions = [
    {
      title: "Accelerator Programs",
      description:
        "Join our accelerator to gain access to funding, mentorship, and corporate partnerships.",
      icon: "rocket",
    },
    {
      title: "Market Access",
      description:
        "Leverage our network to connect with corporates and expand your market reach.",
      icon: "globe",
    },
    {
      title: "Resource Support",
      description:
        "Access workspaces, tools, and expertise to scale your startup efficiently.",
      icon: "briefcase",
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
      case "user-tie":
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
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 14l0 7m-2 -4l2 1l2 -1"
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
      case "briefcase":
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
              d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
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
                Corporate Solutions
              </span>
            </div>
            <h1
              className={`text-4xl md:text-5xl font-black leading-tight transition-colors duration-300 ${
                isDarkMode ? "text-[#485eac]" : "text-[#485eac]"
              }`}
            >
              Bridge your
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-orange-400">
                Innovation Gap
              </span>
              and Stay Ahead
            </h1>
            <p
              className={`text-lg max-w-md leading-relaxed transition-colors duration-300 ${
                isDarkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              We Help Corporates Stay Agile Through Our High-Impact Partnerships
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <button
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-bold transition-all duration-300 shadow-lg hover:shadow-xl ${
                  isDarkMode
                    ? "bg-orange-700 text-white hover:bg-orange-600"
                    : "bg-orange-500 text-white hover:bg-orange-600"
                }`}
                aria-label="Get details about corporate solutions"
              >
                Get Details
              </button>
              <a
                href="#focus"
                className={`font-semibold transition-colors flex items-center gap-2 ${
                  isDarkMode
                    ? "text-orange-400 hover:text-orange-500"
                    : "text-orange-600 hover:text-orange-700"
                }`}
                aria-label="Learn more about our focus areas"
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
              src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400"
              className="relative w-full h-auto rounded-2xl shadow-2xl z-10"
              alt="Corporate innovation team collaborating"
              loading="lazy"
            />
          </div>
        </div>
      </div>

      {/* We Focus On Section */}
      <div
        id="focus"
        ref={focusSectionRef}
        className="mt-24 px-4 md:px-8 max-w-7xl mx-auto"
      >
        <div className="text-center mb-12">
          <h2
            className={`text-3xl font-bold ${
              isDarkMode ? "text-[#485eac]" : "text-[#485eac]"
            }`}
          >
            We Focus{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-orange-400">
              On
            </span>
          </h2>
          <p
            className={`mt-2 text-lg max-w-2xl mx-auto ${
              isDarkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Our comprehensive approach to corporate innovation drives
            sustainable growth and keeps you ahead of the competition
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {focusAreas.map((area, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -50 }}
              animate={
                focusInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }
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

      {/* Key Features Section */}
      <div
        ref={featuresSectionRef}
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
                isDarkMode ? "text-[#485eac]" : "text-[#485eac]"
              }`}
            >
              Key{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-orange-400">
                Features
              </span>
            </h2>
            <p
              className={`mt-2 text-lg max-w-2xl mx-auto ${
                isDarkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Drive innovation and strategic growth with our comprehensive
              corporate solutions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {keyFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={
                  featuresInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
                }
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className={`p-6 rounded-lg transition-colors duration-300 ${
                  isDarkMode ? "bg-gray-700" : "bg-white"
                } shadow-md`}
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`p-3 rounded-full ${
                      isDarkMode
                        ? "bg-gray-600 text-orange-400"
                        : "bg-orange-100 text-orange-600"
                    }`}
                  >
                    {renderIcon(feature.icon)}
                  </div>
                  <div>
                    <h3
                      className={`text-xl font-bold mb-2 ${
                        isDarkMode ? "text-gray-100" : "text-gray-900"
                      }`}
                    >
                      {feature.title}
                    </h3>
                    <p
                      className={`${
                        isDarkMode ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      {feature.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Corporate Benefits Section */}
      <div
        ref={benefitsSectionRef}
        className="mt-24 px-4 md:px-8 max-w-7xl mx-auto"
      >
        <div className="text-center mb-12">
          <h2
            className={`text-3xl font-bold ${
              isDarkMode ? "text-[#485eac]" : "text-[#485eac]"
            }`}
          >
            Corporate{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-orange-400">
              Benefits
            </span>
          </h2>
          <p
            className={`mt-2 text-lg max-w-2xl mx-auto ${
              isDarkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Empowering your organization to thrive in a rapidly evolving
            business landscape
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {corporateBenefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={
                benefitsInView
                  ? { opacity: 1, scale: 1 }
                  : { opacity: 0, scale: 0.9 }
              }
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <Card
                item={benefit}
                isDarkMode={isDarkMode}
                renderIcon={renderIcon}
                withButton
              />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Tabs for Corporate Solutions */}
      <div className="mt-20 px-4 md:px-8 max-w-7xl mx-auto">
        <div
          className={`rounded-2xl p-8 md:p-12 shadow-lg transition-colors duration-300 ${
            isDarkMode ? "bg-gray-800" : "bg-orange-50"
          }`}
        >
          <div className="text-center mb-12">
            <h2
              className={`text-3xl font-bold ${
                isDarkMode ? "text-[#485eac]" : "text-[#485eac]"
              }`}
            >
              Corporate{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-orange-400">
                Solutions
              </span>
            </h2>
            <p
              className={`mt-2 text-lg max-w-2xl mx-auto ${
                isDarkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Choose the right path for your business strategy
            </p>
          </div>
          <div className="flex justify-center gap-4 mb-8" role="tablist">
            <button
              onClick={() => setActiveTab("corporates")}
              className={`px-6 py-2 rounded-lg font-semibold transition-colors duration-300 ${
                activeTab === "corporates"
                  ? isDarkMode
                    ? "bg-orange-700 text-white"
                    : "bg-orange-500 text-white"
                  : isDarkMode
                  ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
              role="tab"
              aria-selected={activeTab === "corporates"}
              aria-controls="corporates-panel"
            >
              For Corporates
            </button>
            <button
              onClick={() => setActiveTab("startups")}
              className={`px-6 py-2 rounded-lg font-semibold transition-colors duration-300 ${
                activeTab === "startups"
                  ? isDarkMode
                    ? "bg-orange-700 text-white"
                    : "bg-orange-500 text-white"
                  : isDarkMode
                  ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
              role="tab"
              aria-selected={activeTab === "startups"}
              aria-controls="startups-panel"
            >
              For Startups
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {activeTab === "corporates"
              ? corporateSolutions.map((solution, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className={`p-6 rounded-lg transition-colors duration-300 ${
                      isDarkMode ? "bg-gray-700" : "bg-white"
                    } shadow-md text-center`}
                    id="corporates-panel"
                    role="tabpanel"
                  >
                    <div
                      className={`p-3 rounded-full inline-flex ${
                        isDarkMode
                          ? "bg-gray-600 text-orange-400"
                          : "bg-orange-100 text-orange-600"
                      } mb-4`}
                    >
                      {renderIcon(solution.icon)}
                    </div>
                    <h3
                      className={`text-xl font-bold mb-2 ${
                        isDarkMode ? "text-gray-100" : "text-gray-900"
                      }`}
                    >
                      {solution.title}
                    </h3>
                    <p
                      className={`${
                        isDarkMode ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      {solution.description}
                    </p>
                  </motion.div>
                ))
              : startupSolutions.map((solution, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className={`p-6 rounded-lg transition-colors duration-300 ${
                      isDarkMode ? "bg-gray-700" : "bg-white"
                    } shadow-md text-center`}
                    id="startups-panel"
                    role="tabpanel"
                  >
                    <div
                      className={`p-3 rounded-full inline-flex ${
                        isDarkMode
                          ? "bg-gray-600 text-orange-400"
                          : "bg-orange-100 text-orange-600"
                      } mb-4`}
                    >
                      {renderIcon(solution.icon)}
                    </div>
                    <h3
                      className={`text-xl font-bold mb-2 ${
                        isDarkMode ? "text-gray-100" : "text-gray-900"
                      }`}
                    >
                      {solution.title}
                    </h3>
                    <p
                      className={`${
                        isDarkMode ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      {solution.description}
                    </p>
                  </motion.div>
                ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Corporate;
