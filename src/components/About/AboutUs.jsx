import React from "react";
import { useTheme } from "../ThemeToggle/ThemeContext";

function AboutUs() {
  const { isDarkMode } = useTheme();

  // Card data with images
  const cardData = [
    {
      title: "Academia",
      description:
        "We help nurture an innovative mindset within academic institutions",
      image:
        "https://visagetechnologies.com/app/uploads/2023/01/visage.blog_websize-27-1024x682.webp",
    },
    {
      title: "Startups",
      description:
        "We create launchpads for disruptive ventures and game-changing ideas.",
      image:
        "https://visagetechnologies.com/app/uploads/2023/01/visage.blog_websize-27-1024x682.webp",
    },
    {
      title: "Corporates & International",
      description:
        "We propel growth by establishing connections with corporates and cultivating international partnerships.",
      image:
        "https://visagetechnologies.com/app/uploads/2023/01/visage.blog_websize-27-1024x682.webp",
    },
    {
      title: "Government",
      description:
        "We support public-sector transformation through pioneering solutions and collaborations.",
      image:
        "https://visagetechnologies.com/app/uploads/2023/01/visage.blog_websize-27-1024x682.webp",
    },
  ];

  return (
    <div
      className={`p-8 md:p-16 transition-colors duration-500 ${
        isDarkMode ? "bg-gray-900 text-gray-200" : "bg-white text-gray-900"
      }`}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <h1 className="text-4xl font-bold mb-16 text-center">
          <span
            className={`mr-2 ${isDarkMode ? "text-white" : "text-gray-900"}`}
          >
            Why
          </span>
          <span className="bg-gradient-to-r from-orange-600 to-orange-400 bg-clip-text text-transparent">
            choose us
          </span>
        </h1>

        {/* Main Content Section */}
        <div className="flex flex-col md:flex-row gap-10 mb-20">
          {/* Text Content */}
          <div className="md:w-1/2">
            <div
              className={`space-y-6 text-lg ${
                isDarkMode ? "text-gray-300" : "text-gray-700"
              }`}
            >
              <p>
                In an innovative, quick, and effective way. Because we are
                digitally awesome! A2F Nexus started its operations in 2007 with
                an aim to develop a single-stop solution hub for the entire
                information technology requirements of modern organizations.
              </p>
              <p>
                With technologically advanced products and services, Softech
                Foundation is well-known as one of the leading software
                development companies and solution providers serving clients
                across the globe.
              </p>
            </div>
          </div>

          {/* Features Grid */}
          <div className="md:w-1/2 grid grid-cols-2 gap-4">
            <Feature
              icon={<div className="text-yellow-400 text-xl">💡</div>}
              title="Innovation"
              description="Cutting-edge solutions"
              isDarkMode={isDarkMode}
            />
            <Feature
              icon={<div className="text-red-400 text-xl">🚀</div>}
              title="Speed"
              description="Quick deployment"
              isDarkMode={isDarkMode}
            />
            <Feature
              icon={<div className="text-blue-400 text-xl">🌐</div>}
              title="Global"
              description="Worldwide service"
              isDarkMode={isDarkMode}
            />
            <Feature
              icon={<div className="text-yellow-400 text-xl">🔒</div>}
              title="Reliable"
              description="Trusted by leaders"
              isDarkMode={isDarkMode}
            />
          </div>
        </div>

        {/* Cards Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cardData.map((card, index) => (
            <ServiceCard
              key={index}
              title={card.title}
              description={card.description}
              image={card.image}
              isDarkMode={isDarkMode}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// Feature component for the top section
const Feature = ({ icon, title, description, isDarkMode }) => (
  <div
    className={`p-6 rounded-lg transition-all ${
      isDarkMode ? "bg-gray-800 text-gray-200" : "bg-gray-100 text-gray-800"
    }`}
  >
    <div className="mb-3">{icon}</div>
    <h3 className="font-bold mb-1">{title}</h3>
    <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
      {description}
    </p>
  </div>
);

// Service Card component with consistent layout and hover effect
const ServiceCard = ({ title, description, image, isDarkMode }) => {
  return (
    <div
      className={`relative overflow-hidden rounded-lg transition-all duration-300 hover:-translate-y-2 ${
        isDarkMode ? "bg-gray-800 text-gray-200" : "bg-gray-100 text-gray-800"
      }`}
      style={{ height: "360px" }}
    >
      {/* Image Section - Using the actual image from props */}
      <div className="h-1/2 w-full overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
        />
      </div>

      {/* Content Section - Fixed height for consistent layout */}
      <div className="p-6 flex flex-col h-1/2">
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p
          className={`text-sm mb-4 flex-grow ${
            isDarkMode ? "text-gray-400" : "text-gray-600"
          }`}
        >
          {description}
        </p>

        {/* Button positioned at bottom for consistent alignment */}
        <div className="mt-auto">
          <button
            className={`text-orange-500 hover:text-orange-600 transition-colors font-medium flex items-center`}
          >
            Read More
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 ml-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
