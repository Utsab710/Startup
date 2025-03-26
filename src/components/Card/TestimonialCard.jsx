import React from "react";
import { motion } from "framer-motion";
import { useTheme } from "../ThemeToggle/ThemeContext";

const TestimonialCard = ({ quote, personName, companyInfo, imageSrc }) => {
  const { isDarkMode } = useTheme();
  return (
    <div
      className={`relative w-full py-20 ${
        isDarkMode
          ? "bg-gray-900"
          : "bg-gradient-to-r from-orange-50 to-orange-100"
      }`}
    >
      <div className="container mx-auto">
        <motion.div
          className={`flex flex-col md:flex-row rounded-2xl shadow-2xl overflow-hidden max-w-3xl mx-auto ${
            isDarkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
          }`}
          whileHover={{
            y: -5,
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)",
          }}
          transition={{ duration: 0.3 }}
        >
          {/* Image section */}
          <div
            className={`md:w-1/3 ${
              isDarkMode ? "bg-gray-700" : "bg-orange-50"
            }`}
          >
            <img
              src={imageSrc}
              alt={personName || "Anonymous testimonial"}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Content section */}
          <div className="md:w-2/3 p-8 flex flex-col justify-center">
            <div className="text-orange-300 text-6xl font-serif mb-4 leading-none">
              "
            </div>
            <p
              className={`text-xl font-medium mb-6 ${
                isDarkMode ? "text-gray-200" : "text-gray-700"
              }`}
            >
              {quote}
            </p>
            <div className="flex items-center">
              <p
                className={`font-semibold mr-2 ${
                  isDarkMode ? "text-white" : "text-gray-800"
                }`}
              >
                {personName || "Anonymous"}
              </p>
              {companyInfo && (
                <>
                  <span className="text-gray-400 mx-2">/</span>
                  <p className="text-orange-600">{companyInfo}</p>
                </>
              )}
            </div>
          </div>
        </motion.div>

        <div
          className={`mt-12 text-center max-w-xl mx-auto ${
            isDarkMode
              ? "bg-gray-900 text-white"
              : "bg-transparent text-gray-900"
          }`}
        >
          <h2 className="text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-orange-600 to-orange-400 bg-clip-text text-transparent">
              Looking for Funding?
            </span>
          </h2>
          <p
            className={`text-lg leading-relaxed mb-6 ${
              isDarkMode ? "text-gray-300" : "text-gray-600"
            }`}
          >
            A2FNexus connects innovative startups with the resources they need
            to thrive.
          </p>
          <div>
            <button
              className={`
                px-8 
                py-3 
                rounded-lg 
                text-white 
                font-semibold 
                transition-all 
                duration-300 
                shadow-lg 
                hover:shadow-xl
                ${
                  isDarkMode
                    ? "bg-orange-700 hover:bg-orange-800"
                    : "bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700"
                }
              `}
            >
              Learn More
            </button>
          </div>
        </div>

        <svg
          className="absolute top-0 right-0 w-96 h-96 opacity-20 transform translate-x-1/2 -translate-y-1/2"
          viewBox="0 0 200 200"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="url(#orangeGradient)"
            d="M47.2,-60.8C60.9,-50.8,71.8,-36.5,75.7,-20.4C79.6,-4.3,76.5,13.6,68.7,29.5C60.9,45.4,48.4,59.2,33.5,65.8C18.6,72.4,1.2,71.8,-15.8,66.4C-32.8,61,-48.4,50.8,-60.2,37C-72,23.2,-80,5.8,-78.8,-11.4C-77.6,-28.6,-67.2,-45.6,-52.9,-56.8C-38.6,-68,-19.3,-73.4,0.4,-73.8C20.1,-74.2,40.2,-70.8,47.2,-60.8Z"
            transform="translate(100 100)"
          />
          <defs>
            <linearGradient
              id="orangeGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop
                offset="0%"
                style={{ stopColor: "#f97316", stopOpacity: 1 }}
              />
              <stop
                offset="50%"
                style={{ stopColor: "#ea580c", stopOpacity: 1 }}
              />
              <stop
                offset="100%"
                style={{ stopColor: "#c2410c", stopOpacity: 1 }}
              />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
};

export default TestimonialCard;
