import React, { useEffect, useState } from "react";
import { useTheme } from "../ThemeToggle/ThemeContext";

function AboutUs() {
  const { isDarkMode } = useTheme();
  const [isCardVisible, setIsCardVisible] = useState(false);
  const [isFeatureVisible, setIsFeatureVisible] = useState(false);

  useEffect(() => {
    // Small delay before starting card animations
    const cardTimer = setTimeout(() => {
      setIsCardVisible(true);
    }, 100);

    // Delay feature animations to start after 1 second
    const featureTimer = setTimeout(() => {
      setIsFeatureVisible(true);
    }, 1000);

    return () => {
      clearTimeout(cardTimer);
      clearTimeout(featureTimer);
    };
  }, []);

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

  // Feature data
  const featureData = [
    {
      icon: <div className="text-yellow-400 text-xl">💡</div>,
      title: "Innovation",
      description: "Cutting-edge solutions",
    },
    {
      icon: <div className="text-red-400 text-xl">🚀</div>,
      title: "Speed",
      description: "Quick deployment",
    },
    {
      icon: <div className="text-blue-400 text-xl">🌐</div>,
      title: "Global",
      description: "Worldwide service",
    },
    {
      icon: <div className="text-yellow-400 text-xl">🔒</div>,
      title: "Reliable",
      description: "Trusted by leaders",
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
            className={` mr-2 text-3xl font-bold ${
              isDarkMode ? "text-[#485eac]" : "text-[#485eac]"
            }`}
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

          {/* Features Grid with Animation */}
          <div className="md:w-1/2 grid grid-cols-2 gap-4">
            {featureData.map((feature, index) => (
              <Feature
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                isDarkMode={isDarkMode}
                isVisible={isFeatureVisible}
                delay={index * 0.3} // One second between each feature
              />
            ))}
          </div>
        </div>

        {/* Cards Section with Animation */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cardData.map((card, index) => (
            <ServiceCard
              key={index}
              title={card.title}
              description={card.description}
              image={card.image}
              isDarkMode={isDarkMode}
              isVisible={isCardVisible}
              delay={index * 0.15} // Reduced delay for smoother sequence
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// Feature component with animation
const Feature = ({
  icon,
  title,
  description,
  isDarkMode,
  isVisible,
  delay,
}) => (
  <div
    className={`p-6 rounded-lg shadow-md ${
      isDarkMode ? "bg-gray-800 text-gray-200" : "bg-white text-gray-800"
    }`}
    style={{
      transform: isVisible ? "translateX(0)" : "translateX(-100%)",
      opacity: isVisible ? 1 : 0,
      transition: "transform 0.6s ease-out, opacity 0.6s ease-out",
      transitionDelay: `${delay}s`,
    }}
  >
    <div className="mb-3">{icon}</div>
    <h3 className="font-bold mb-1">{title}</h3>
    <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
      {description}
    </p>
  </div>
);

// Service Card component with fixed hover animation
const ServiceCard = ({
  title,
  description,
  image,
  isDarkMode,
  isVisible,
  delay,
}) => {
  return (
    <div
      className={`relative overflow-hidden rounded-lg ${
        isDarkMode ? "bg-gray-800 text-gray-200" : "bg-white text-gray-800"
      }`}
      style={{
        height: "360px",
        transform: isVisible ? "translateX(0)" : "translateX(-100%)",
        opacity: isVisible ? 1 : 0,
        transition: "transform 0.8s ease-out, opacity 0.8s ease-out",
        transitionDelay: `${delay}s`,
        boxShadow:
          "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
      }}
    >
      {/* Hover effect container - separate from slide animation */}
      <div className="w-full h-full transition-transform duration-300 ease-out hover:-translate-y-2">
        {/* Image Section */}
        <div className="h-1/2 w-full overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
          />
        </div>

        {/* Content Section */}
        <div className="p-6 flex flex-col h-1/2">
          <h3 className="text-xl font-bold mb-2">{title}</h3>
          <p
            className={`text-sm mb-4 flex-grow ${
              isDarkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            {description}
          </p>

          {/* Button positioned at bottom */}
          <div className="mt-auto">
            <button className="text-orange-500 hover:text-orange-600 transition-colors font-medium flex items-center">
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
    </div>
  );
};

export default AboutUs;
