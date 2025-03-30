import { useTheme } from "../ThemeToggle/ThemeContext";
import React from "react";
import { FaLinkedin } from "react-icons/fa"; // Using react-icons for the LinkedIn icon

// Define the props for the reusable MentorCard
function MentorCard({ imageUrl, name, title, company, linkedinUrl }) {
  const { isDarkMode } = useTheme();

  return (
    <div className="flex flex-col items-center">
      {/* Animated Border Wrapper - Fixed size to match exactly */}
      <div className="relative z-10 w-60 h-72 overflow-hidden rounded-lg p-[1.5px]">
        {/* Animated Gradient Background */}
        <div className="absolute inset-0 z-0 rounded-lg animate-border-glow"></div>

        {/* Original Card (preserved with all styling) */}
        <div
          className={`relative z-20 w-full h-full cursor-pointer rounded-lg shadow-lg overflow-hidden p-4 text-center flex flex-col justify-between ${
            isDarkMode ? "bg-gray-800 text-gray-200" : "bg-white text-gray-900"
          }`}
        >
          {/* Circular Image */}
          <div className="flex justify-center">
            <img
              src={imageUrl}
              alt={`${name || "Mentor"}'s profile`}
              className="w-24 h-24 rounded-full object-cover border-2 border-gray-300"
              onError={(e) =>
                (e.target.src = "https://via.placeholder.com/150")
              } // Fallback image
            />
          </div>

          {/* Mentor Details */}
          <div className="mt-4">
            <h3 className="text-lg font-semibold truncate">
              {name || "Unknown Mentor"}
            </h3>
            <p className="text-sm text-gray-500 truncate">{title}</p>
            <p className="text-sm text-gray-500 truncate">@{company}</p>
          </div>

          {/* LinkedIn Icon */}
          <a
            href={linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 flex justify-center items-center text-blue-700 hover:text-blue-800"
          >
            <FaLinkedin size={24} />
          </a>
        </div>
      </div>

      {/* CSS for the animated border */}
      <style jsx>{`
        .animate-border-glow {
          background: conic-gradient(#0ea5e9 20deg, transparent 120deg);
          animation: rotate 5s linear infinite;
        }

        @keyframes rotate {
          0% {
            transform: rotate(0deg) scale(10);
          }
          100% {
            transform: rotate(-360deg) scale(10);
          }
        }
      `}</style>
    </div>
  );
}

export default MentorCard;
