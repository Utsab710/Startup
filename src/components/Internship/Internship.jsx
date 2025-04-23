import { useState, useRef } from "react"; // Removed useEffect as it's not used
import { useTheme } from "../ThemeToggle/ThemeContext";
import { motion, useInView } from "framer-motion";

// Reusable Card Component
const Card = ({
  item,
  isDarkMode,
  renderIcon,
  withButton = false,
  className = "cursor-pointer",
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
      <p className={`mb-4 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
        {item.description}
      </p>
      <ul
        className={`list-disc pl-5 ${
          isDarkMode ? "text-gray-400" : "text-gray-600"
        }`}
      >
        {item.technologies.map((tech, index) => (
          <li key={index}>{tech}</li>
        ))}
      </ul>
    </div>
    {withButton && (
      <div className="mt-auto pt-4">
        <button
          className={`w-full cursor-pointer py-3 rounded-lg font-medium transition-all duration-300 ${
            isDarkMode
              ? "bg-gray-700 text-orange-400 hover:bg-gray-600"
              : "bg-orange-50 text-orange-600 hover:bg-orange-100"
          }`}
          aria-label={`Apply for ${item.title} internship`}
        >
          Apply Now
        </button>
      </div>
    )}
  </motion.div>
);

// Internship Component
function Internship() {
  const { isDarkMode, toggleTheme } = useTheme(); // Added toggleTheme to allow theme switching

  // Refs for animation triggers
  const opportunitiesSectionRef = useRef(null);
  const opportunitiesInView = useInView(opportunitiesSectionRef, {
    once: true,
    amount: 0.3,
  });

  // Data Arrays
  const internshipOpportunities = [
    {
      title: "Frontend Development",
      description:
        "Build dynamic and responsive user interfaces using modern web technologies.",
      icon: "frontend",
      technologies: ["HTML", "CSS", "JavaScript", "ReactJs"],
    },
    {
      title: "Backend Development",
      description:
        "Develop robust server-side applications and APIs to power web platforms.",
      icon: "backend",
      technologies: ["Node.js", ".NET"],
    },
  ];

  // Render icon with SVG
  const renderIcon = (iconName) => {
    switch (iconName) {
      case "frontend":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 14l9-5-9-5-9 5 9 5zm0 0v7m-9-7h18"
            />
          </svg>
        );
      case "backend":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 12h14M5  Asc 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2 2m-2-4h.01M17 16h.01"
            />
          </svg>
        );
      default:
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8"
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
      {/* Theme Toggle Button */}
      <div className="fixed top-4 right-4">
        <button
          onClick={toggleTheme}
          className={`p-2 rounded-full transition-colors duration-300 ${
            isDarkMode
              ? "bg-gray-700 text-yellow-400"
              : "bg-orange-100 text-orange-600"
          }`}
          aria-label={
            isDarkMode ? "Switch to light mode" : "Switch to dark mode"
          }
        >
          {isDarkMode ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
              />
            </svg>
          )}
        </button>
      </div>

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
                <span
                  className={`${
                    isDarkMode ? "text-[#3b5998]" : "text-[#3b5998]"
                  }`}
                >
                  A2F
                </span>
                {""} Nexus Internships
              </span>
            </div>
            <h1
              className={`text-4xl md:text-5xl font-black leading-tight transition-colors duration-300 ${
                isDarkMode ? "text-[#3b5998]" : "text-[#3b5998]"
              }`}
            >
              We the A2F Nexus provide you the
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-orange-400">
                Internship Opportunities
              </span>
            </h1>
            <p
              className={`text-lg max-w-md leading-relaxed transition-colors duration-300 ${
                isDarkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Kickstart your career with hands-on experience in cutting-edge
              technologies.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <button
                className={`flex  items-center gap-2 px-6 py-3 rounded-lg font-bold transition-all duration-300 shadow-lg hover:shadow-xl cursor-pointer ${
                  isDarkMode
                    ? "bg-orange-700 text-white hover:bg-orange-600"
                    : "bg-orange-500 text-white hover:bg-orange-600"
                }`}
                aria-label="Apply for internship opportunities"
              >
                Apply Now
              </button>
              <a
                href="#opportunities"
                className={`font-semibold transition-colors flex items-center gap-2 ${
                  isDarkMode
                    ? "text-orange-400 hover:text-orange-500"
                    : "text-orange-600 hover:text-orange-700"
                }`}
                aria-label="Explore internship opportunities"
              >
                Explore Roles
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
              src="https://imgs.search.brave.com/YMWbTSMM30psMV6_IpEY0krwTVveRAPcN4IE_f7yYf8/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/ZnJlZS1waG90by9p/bnRlcm5zaGlwLW1h/bmFnZW1lbnQtdGVt/cG9yYXJ5LXBvc2l0/aW9uLWNvbmNlcHRf/NTM4NzYtMTM5NzAz/LmpwZz9zZW10PWFp/c19oeWJyaWQmdz03/NDA"
              className="relative w-full h-auto rounded-2xl shadow-2xl z-10"
              alt="Internship opportunities at A2F Nexus"
              loading="lazy"
            />
          </div>
        </div>
      </div>

      {/* Internship Opportunities Section */}
      <div
        id="opportunities"
        ref={opportunitiesSectionRef}
        className="mt-24 px-4 md:px-8 max-w-7xl mx-auto"
      >
        <div className="text-center mb-12">
          <h2
            className={`text-3xl font-bold ${
              isDarkMode ? "text-[#3b5998]" : "text-[#3b5998]"
            }`}
          >
            Internship{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-orange-400">
              Opportunities
            </span>
          </h2>
          <p
            className={`mt-2 text-lg max-w-2xl mx-auto ${
              isDarkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Explore our Frontend and Backend internship programs designed to
            build your technical skills.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {internshipOpportunities.map((opportunity, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={
                opportunitiesInView
                  ? { opacity: 1, y: 0 }
                  : { opacity: 0, y: 30 }
              }
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <Card
                item={opportunity}
                isDarkMode={isDarkMode}
                renderIcon={renderIcon}
                withButton
                className="cursor-pointer"
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
            Ready to Start Your{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-orange-400">
              Tech Journey?
            </span>
          </h2>
          <p
            className={`mt-4 text-lg max-w-2xl mx-auto ${
              isDarkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Join A2F Nexus to gain hands-on experience and launch your career in
            technology.
          </p>
          <button
            className={`mt-8 px-8 py-4 cursor-pointer rounded-lg font-bold transition-all duration-300 shadow-lg hover:shadow-xl ${
              isDarkMode
                ? "bg-orange-700 text-white hover:bg-orange-600"
                : "bg-orange-500 text-white hover:bg-orange-600"
            }`}
            aria-label="Apply for internship now"
          >
            Apply Now
          </button>
        </div>
      </div>
    </div>
  );
}

export default Internship;
