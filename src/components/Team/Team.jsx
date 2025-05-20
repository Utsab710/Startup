import { useState, useEffect, useRef } from "react";
import { useTheme } from "../ThemeToggle/ThemeContext";
import { motion, useInView } from "framer-motion";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";

// Team Member Card Component
const TeamMemberCard = ({ member, isDarkMode }) => {
  return (
    <motion.div
      className={`rounded-xl p-6 shadow-lg hover:shadow-xl flex flex-col h-full transition-colors duration-300 ${
        isDarkMode ? "bg-gray-800" : "bg-white"
      }`}
    >
      <div className="mb-4 relative overflow-hidden rounded-full w-32 h-32 mx-auto">
        <img
          src={member.image}
          alt={member.name}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>
      <div className="text-center flex-grow">
        <h3
          className={`text-xl font-bold mb-1 ${
            isDarkMode ? "text-white" : "text-gray-900"
          }`}
        >
          {member.name}
        </h3>
        <p
          className={`mb-4 font-medium ${
            isDarkMode ? "text-orange-400" : "text-orange-600"
          }`}
        >
          {member.position}
        </p>
        {member.bio && (
          <p
            className={`mb-4 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}
          >
            {member.bio}
          </p>
        )}
      </div>

      {/* Social links */}
      {member.socialLinks && (
        <div className="mt-4 flex justify-center space-x-4">
          {member.socialLinks.linkedin && (
            <a
              href={member.socialLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className={`rounded-full p-2 transition-colors ${
                isDarkMode
                  ? "hover:bg-gray-700 text-gray-400 hover:text-white"
                  : "hover:bg-gray-100 text-gray-600 hover:text-gray-900"
              }`}
              aria-label={`${member.name}'s LinkedIn`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </a>
          )}

          {member.socialLinks.twitter && (
            <a
              href={member.socialLinks.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className={`rounded-full p-2 transition-colors ${
                isDarkMode
                  ? "hover:bg-gray-700 text-gray-400 hover:text-white"
                  : "hover:bg-gray-100 text-gray-600 hover:text-gray-900"
              }`}
              aria-label={`${member.name}'s Twitter`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
              </svg>
            </a>
          )}

          {member.socialLinks.github && (
            <a
              href={member.socialLinks.github}
              target="_blank"
              rel="noopener noreferrer"
              className={`rounded-full p-2 transition-colors ${
                isDarkMode
                  ? "hover:bg-gray-700 text-gray-400 hover:text-white"
                  : "hover:bg-gray-100 text-gray-600 hover:text-gray-900"
              }`}
              aria-label={`${member.name}'s GitHub`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            </a>
          )}
        </div>
      )}
    </motion.div>
  );
};

function Team() {
  const { isDarkMode } = useTheme();
  const { user } = useAuth();
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Ref for animation triggers
  const teamSectionRef = useRef(null);
  const teamInView = useInView(teamSectionRef, {
    once: true,
    amount: 0.2,
  });

  // Fetch team members on component mount
  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/team", {
          withCredentials: true,
        });
        setTeamMembers(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch team members:", err);
        setError("Failed to load team information. Please try again later.");
        setLoading(false);

        // Set sample data if there's an error
        setSampleTeamData();
      }
    };

    fetchTeamMembers();
  }, []);

  // Sample team data in case API fails
  const setSampleTeamData = () => {
    setTeamMembers([
      {
        _id: "1",
        name: "Jane Smith",
        position: "CEO & Founder",
        image:
          "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1000&auto=format&fit=crop",
        bio: "Leading our vision forward with 10+ years in tech entrepreneurship.",
        socialLinks: {
          linkedin: "https://linkedin.com",
          twitter: "https://twitter.com",
        },
      },
      {
        _id: "2",
        name: "Utsab Shrestha",
        position: "CTO",
        image:
          "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1000&auto=format&fit=crop",
        bio: "Technical mastermind with expertise in scalable solutions.",
        socialLinks: {
          linkedin: "https://linkedin.com",
          github: "https://github.com",
        },
      },
      {
        _id: "3",
        name: "Sarah Johnson",
        position: "Lead Developer",
        image:
          "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1000&auto=format&fit=crop",
        bio: "Full-stack developer passionate about creating elegant solutions.",
        socialLinks: {
          github: "https://github.com",
        },
      },
    ]);
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
                className={`font-medium text-sm tracking-wide p-2 transition-colors duration-300 ${
                  isDarkMode ? "text-orange-400" : "text-orange-600"
                }`}
              >
                Meet Our Team
              </span>
            </div>
            <h1
              className={`text-4xl md:text-5xl font-black leading-tight transition-colors duration-300 ${
                isDarkMode ? "text-[#3b5998]" : "text-[#3b5998]"
              }`}
            >
              The People
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-orange-400">
                Behind A2F Nexus
              </span>
            </h1>
            <p
              className={`text-lg max-w-md leading-relaxed transition-colors duration-300 ${
                isDarkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Our diverse team of experts is dedicated to helping startups
              connect with the right resources and grow their businesses.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <a
                href="#team-list"
                className={`font-semibold transition-colors flex items-center gap-2 ${
                  isDarkMode
                    ? "text-orange-400 hover:text-orange-500"
                    : "text-orange-600 hover:text-orange-700"
                }`}
                aria-label="Meet our team members"
              >
                Meet The Team
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
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1000&auto=format&fit=crop"
              className="relative w-full h-auto rounded-2xl shadow-2xl z-10"
              alt="A2F Nexus team collaboration"
              loading="lazy"
            />
          </div>
        </div>
      </div>

      {/* Team Members Section */}
      <div
        id="team-list"
        ref={teamSectionRef}
        className="mt-24 px-4 md:px-8 max-w-7xl mx-auto"
      >
        <div className="text-center mb-12">
          <h2
            className={`text-3xl font-bold ${
              isDarkMode ? "text-[#3b5998]" : "text-[#3b5998]"
            }`}
          >
            Our{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-orange-400">
              Team Members
            </span>
          </h2>
          <p
            className={`mt-2 text-lg max-w-2xl mx-auto ${
              isDarkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Meet the passionate professionals working behind the scenes to make
            A2F Nexus a success.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <div
              className={`animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 ${
                isDarkMode ? "border-orange-400" : "border-orange-600"
              }`}
            ></div>
          </div>
        ) : error && teamMembers.length === 0 ? (
          <div
            className={`text-center py-12 ${
              isDarkMode ? "text-red-400" : "text-red-600"
            }`}
          >
            {error}
          </div>
        ) : teamMembers.length === 0 ? (
          <div
            className={`text-center py-12 ${
              isDarkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Team information coming soon.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member._id}
                initial={{ opacity: 0, y: 30 }}
                animate={
                  teamInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
                }
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <TeamMemberCard member={member} isDarkMode={isDarkMode} />
              </motion.div>
            ))}
          </div>
        )}

        {/* Admin action button - only shown to admin users */}
        {user && user.isAdmin && (
          <div className="mt-12 text-center">
            <button
              className={`px-6 py-3 rounded-lg font-bold transition-all duration-300 shadow-lg hover:shadow-xl ${
                isDarkMode
                  ? "bg-blue-700 text-white hover:bg-blue-600"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
              aria-label="Manage team members"
            >
              Manage Team
            </button>
          </div>
        )}
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
            Want to{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-orange-400">
              Join Our Team?
            </span>
          </h2>
          <p
            className={`mt-4 text-lg max-w-2xl mx-auto ${
              isDarkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            We're always looking for talented individuals who are passionate
            about helping startups succeed.
          </p>
          <button
            className={`mt-8 px-8 py-4 rounded-lg font-bold transition-all duration-300 shadow-lg hover:shadow-xl ${
              isDarkMode
                ? "bg-orange-700 text-white hover:bg-orange-600"
                : "bg-orange-500 text-white hover:bg-orange-600"
            }`}
            aria-label="View career opportunities"
          >
            View Opportunities
          </button>
        </div>
      </div>
    </div>
  );
}

export default Team;
