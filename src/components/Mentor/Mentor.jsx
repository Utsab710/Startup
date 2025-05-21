import React, { useEffect, useRef, useState } from "react";
import { useTheme } from "../ThemeToggle/ThemeContext";
import { motion, useInView } from "framer-motion";
import { FaLinkedin } from "react-icons/fa";
import axios from "axios";

// Mentor Card Component
const MentorCard = ({
  imageUrl,
  name,
  title,
  company,
  linkedinUrl,
  isDarkMode,
}) => (
  <motion.div
    className={`rounded-xl shadow-lg hover:shadow-xl flex flex-col h-full transition-colors duration-300 overflow-hidden ${
      isDarkMode ? "bg-gray-800" : "bg-white"
    }`}
  >
    <div className="flex flex-col md:flex-row">
      {/* Mentor Image */}
      <div className="md:w-1/3 p-4 flex justify-center items-center">
        <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-gray-300">
          <img
            src={imageUrl}
            alt={`${name}'s profile`}
            className="w-full h-full object-cover"
            onError={(e) => (e.target.src = "https://via.placeholder.com/150")}
          />
        </div>
      </div>

      {/* Mentor Details */}
      <div className="md:w-2/3 p-4">
        <h3
          className={`text-xl font-bold ${
            isDarkMode ? "text-white" : "text-gray-900"
          }`}
        >
          {name}
        </h3>
        <p
          className={`text-sm ${
            isDarkMode ? "text-gray-400" : "text-gray-600"
          }`}
        >
          {title}
        </p>
        <p
          className={`text-sm mb-3 ${
            isDarkMode ? "text-gray-400" : "text-gray-600"
          }`}
        >
          @{company}
        </p>

        {/* LinkedIn Link */}
        <a
          href={linkedinUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-flex items-center gap-2 ${
            isDarkMode
              ? "text-blue-400 hover:text-blue-300"
              : "text-blue-600 hover:text-blue-700"
          }`}
        >
          <FaLinkedin size={18} />
          <span>LinkedIn Profile</span>
        </a>
      </div>
    </div>
  </motion.div>
);

function Mentor() {
  const { isDarkMode } = useTheme();

  // State for mentors
  const [mentors, setMentors] = useState([]);
  const [mentorsLoading, setMentorsLoading] = useState(true);
  const [mentorsError, setMentorsError] = useState(null);

  // Refs for animation triggers
  const mentorSectionRef = useRef(null);
  const mentorsInView = useInView(mentorSectionRef, {
    once: true,
    amount: 0.2,
  });

  // Fetch mentors from backend
  useEffect(() => {
    const fetchMentors = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_RENDER}/api/mentor/`
        );
        setMentors(response.data || []);
      } catch (error) {
        console.error("Fetch mentors error:", error);
        setMentorsError("Failed to load mentors. Please try again.");
      } finally {
        setMentorsLoading(false);
      }
    };
    fetchMentors();
  }, []);

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
                A2F Nexus Program
              </span>
            </div>
            <h1
              className={`text-4xl md:text-5xl font-black leading-tight transition-colors duration-300 ${
                isDarkMode ? "text-[#485eac]" : "text-[#485eac]"
              }`}
            >
              Learn from
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-orange-400">
                Industry Experts
              </span>
              and Scale Your Startup
            </h1>
            <p
              className={`text-lg max-w-md leading-relaxed transition-colors duration-300 ${
                isDarkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              See the list of current and past mentors for the A2F Nexus program
              below.
            </p>
          </div>
          <div className="md:w-1/2 relative">
            <div
              className={`absolute -top-10 -right-10 w-64 h-64 rounded-full blur-2xl opacity-50 transition-colors duration-300 ${
                isDarkMode ? "bg-gray-800" : "bg-orange-100"
              }`}
            ></div>
            <img
              src="https://img.freepik.com/free-vector/good-team-concept-illustration_114360-4225.jpg?t=st=1745474888~exp=1745478488~hmac=836bdb47355de44d723757727f5696bcea76074ae4db34e0bfcdde1be9e4f1f9&w=826"
              className="relative w-full h-auto rounded-2xl shadow-2xl z-10"
              alt="Mentorship and startup guidance illustration"
              loading="lazy"
            />
          </div>
        </div>
      </div>

      {/* Mentors Section */}
      <div
        id="mentors"
        ref={mentorSectionRef}
        className="mt-24 px-4 md:px-8 max-w-7xl mx-auto"
      >
        <div className="text-center mb-12">
          <h2
            className={`text-3xl font-bold ${
              isDarkMode ? "text-[#485eac]" : "text-[#485eac]"
            }`}
          >
            Our{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-orange-400">
              Mentors
            </span>
          </h2>
          <p
            className={`mt-2 text-lg max-w-2xl mx-auto ${
              isDarkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Industry leaders ready to share insights and guide your startup
            journey
          </p>
        </div>

        {/* Loading State */}
        {mentorsLoading && (
          <div className="text-center">
            <p
              className={`text-lg ${
                isDarkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Loading mentors...
            </p>
          </div>
        )}

        {/* Error State */}
        {mentorsError && (
          <div className="text-center">
            <p
              className={`text-lg ${
                isDarkMode ? "text-red-400" : "text-red-600"
              }`}
            >
              {mentorsError}
            </p>
          </div>
        )}

        {/* Mentors List */}
        {!mentorsLoading && !mentorsError && mentors.length === 0 && (
          <div className="text-center">
            <p
              className={`text-lg ${
                isDarkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              No mentors found.
            </p>
          </div>
        )}
        {!mentorsLoading && !mentorsError && mentors.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mentors.map((mentor) => (
              <motion.div
                key={mentor._id}
                initial={{ opacity: 0, y: 30 }}
                animate={
                  mentorsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
                }
                transition={{
                  duration: 0.5,
                  delay: mentors.indexOf(mentor) * 0.1,
                }}
              >
                <MentorCard
                  imageUrl={mentor.imageUrl}
                  name={mentor.mentorName}
                  title={mentor.mentorPosition}
                  company={mentor.mentorCompany}
                  linkedinUrl={mentor.linkedinUrl || "#"}
                  isDarkMode={isDarkMode}
                />
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Program Benefits Section */}
      <div className="mt-24 px-4 md:px-8 max-w-7xl mx-auto">
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
              Mentorship{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-orange-400">
                Benefits
              </span>
            </h2>
            <p
              className={`mt-2 text-lg max-w-2xl mx-auto ${
                isDarkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              How our mentors can accelerate your startup growth
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Strategic Guidance",
                description:
                  "Get personalized advice from industry experts who've navigated similar challenges",
                icon: (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-12 w-12"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                    />
                  </svg>
                ),
              },
              {
                title: "Network Expansion",
                description:
                  "Connect with valuable contacts and potential partners in your industry",
                icon: (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-12 w-12"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                ),
              },
              {
                title: "Investor Connections",
                description:
                  "Build relationships that could lead to funding opportunities",
                icon: (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-12 w-12"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                ),
              },
            ].map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className={`p-6 rounded-lg transition-colors duration-300 ${
                  isDarkMode ? "bg-gray-700" : "bg-white"
                } shadow-md`}
              >
                <div className="flex flex-col items-center text-center">
                  <div
                    className={`p-3 rounded-full ${
                      isDarkMode
                        ? "bg-gray-600 text-orange-400"
                        : "bg-orange-100 text-orange-600"
                    } mb-4`}
                  >
                    {benefit.icon}
                  </div>
                  <h3
                    className={`text-xl font-bold mb-2 ${
                      isDarkMode ? "text-gray-100" : "text-gray-900"
                    }`}
                  >
                    {benefit.title}
                  </h3>
                  <p
                    className={`${
                      isDarkMode ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    {benefit.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="mt-24 px-4 md:px-8 max-w-7xl mx-auto">
        <div
          className={`rounded-2xl p-8 md:p-12 text-center transition-colors duration-300 ${
            isDarkMode
              ? "bg-gradient-to-r from-gray-800 to-gray-900"
              : "bg-gradient-to-r from-orange-50 to-orange-100"
          }`}
        >
          <h2
            className={`text-3xl font-bold mb-4 ${
              isDarkMode ? "text-white" : "text-gray-900"
            }`}
          >
            Ready to{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-orange-400">
              Accelerate
            </span>{" "}
            Your Startup?
          </h2>
          <p
            className={`text-lg max-w-2xl mx-auto mb-8 ${
              isDarkMode ? "text-gray-300" : "text-gray-700"
            }`}
          >
            Apply now to get matched with the perfect mentor for your business
            needs
          </p>
          <button
            className={`px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-xl ${
              isDarkMode
                ? "bg-orange-700 text-white hover:bg-orange-600"
                : "bg-orange-500 text-white hover:bg-orange-600"
            }`}
          >
            Apply for Mentorship
          </button>
        </div>
      </div>
    </div>
  );
}

export default Mentor;
