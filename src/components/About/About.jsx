import React from "react";
import { useTheme } from "../ThemeToggle/ThemeContext";
import A2FBrings from "./A2FBrings";

function About() {
  const { isDarkMode } = useTheme();

  // Card data for the "Who We Serve" section
  const whoWeServe = [
    {
      title: "Academia",
      description:
        "Nurturing an innovative mindset within academic institutions.",
      icon: "book-open",
    },
    {
      title: "Startups",
      description:
        "Creating launchpads for disruptive ventures and game-changing ideas.",
      icon: "rocket",
    },
    {
      title: "Corporates & International",
      description:
        "Propelling growth through corporate connections and international partnerships.",
      icon: "globe",
    },
    {
      title: "Government",
      description:
        "Supporting public-sector transformation with pioneering solutions.",
      icon: "building",
    },
  ];

  // Features data for the "Our Strengths" section
  const features = [
    {
      title: "Innovation",
      description: "Cutting-edge solutions",
      icon: "💡",
    },
    {
      title: "Speed",
      description: "Quick deployment",
      icon: "🚀",
    },
    {
      title: "Global",
      description: "Worldwide service",
      icon: "🌐",
    },
    {
      title: "Reliable",
      description: "Trusted by leaders",
      icon: "🔒",
    },
  ];

  // Render icon function
  const renderIcon = (iconName) => {
    switch (iconName) {
      case "book-open":
        return (
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
              d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5s3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18s-3.332.477-4.5 1.253"
            />
          </svg>
        );
      case "rocket":
        return (
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
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
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
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a2 2 0 012-2h2a2 2 0 012 2v5m-4 0h4"
            />
          </svg>
        );
      default:
        return <div className="text-3xl">{iconName}</div>;
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
                className={`font-medium text-base p-2 tracking-wide transition-colors duration-300 ${
                  isDarkMode ? "text-orange-400" : "text-orange-600"
                }`}
              >
                About Us
              </span>
            </div>
            <h1
              className={`text-4xl md:text-5xl font-black leading-tight transition-colors duration-300 ${
                isDarkMode ? "text-[#485eac]" : "text-[#485eac]"
              }`}
            >
              Why
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-orange-400">
                Choose Us
              </span>
            </h1>
            <p
              className={`text-lg max-w-md leading-relaxed transition-colors duration-300 ${
                isDarkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Our mission is to empower entrepreneurs by providing them with the
              necessary resources to create socially impactful businesses. We
              are a nexus of startup ecosystem partners. Together, Lets be
              Trailblazers of Innovation.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <button
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-bold transition-all duration-300 shadow-lg hover:shadow-xl ${
                  isDarkMode
                    ? "bg-orange-700 text-white hover:bg-orange-600"
                    : "bg-orange-500 text-white hover:bg-orange-600"
                }`}
              >
                Learn More
              </button>
            </div>
          </div>
          <div className="md:w-1/2 relative">
            <div
              className={`absolute -top-10 -right-10 w-64 h-64 rounded-full blur-2xl opacity-50 transition-colors duration-300 ${
                isDarkMode ? "bg-gray-800" : "bg-orange-100"
              }`}
            ></div>
            <img
              src="https://visagetechnologies.com/app/uploads/2023/01/visage.blog_websize-27-1024x682.webp"
              className="relative w-full h-auto rounded-2xl shadow-2xl z-10"
              alt="About Us"
            />
          </div>
        </div>
      </div>

      {/* Our Strengths Section */}
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
              Our{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-orange-400">
                Strengths
              </span>
            </h2>
            <p
              className={`mt-2 text-lg max-w-2xl mx-auto ${
                isDarkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              What sets us apart in delivering exceptional IT solutions
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`p-6 rounded-lg transition-colors duration-300 ${
                  isDarkMode ? "bg-gray-700" : "bg-white"
                } shadow-md`}
              >
                <div className="flex justify-center mb-4">
                  <div
                    className={`p-3 rounded-full ${
                      isDarkMode
                        ? "bg-gray-600 text-orange-400"
                        : "bg-orange-100 text-orange-600"
                    }`}
                  >
                    {renderIcon(feature.icon)}
                  </div>
                </div>
                <h3
                  className={`text-xl font-bold text-center mb-2 ${
                    isDarkMode ? "text-gray-100" : "text-gray-900"
                  }`}
                >
                  {feature.title}
                </h3>
                <p
                  className={`text-center ${
                    isDarkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-15">
        <A2FBrings />
      </div>

      {/* Who We Serve Section */}
      <div className="mt-24 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div
            className={`inline-block rounded-full p-2 mb-2 transition-colors duration-300 ${
              isDarkMode ? "bg-gray-800" : "bg-orange-50"
            }`}
          >
            <span
              className={`font-medium p-2 text-base tracking-wide transition-colors duration-300 ${
                isDarkMode ? "text-orange-400" : "text-orange-600"
              }`}
            >
              Our Reach
            </span>
          </div>
          <h2
            className={`text-3xl font-bold ${
              isDarkMode ? "text-[#485eac]" : "text-[#485eac]"
            }`}
          >
            Who We{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-orange-400">
              Serve
            </span>
          </h2>
          <p
            className={`mt-2 text-lg max-w-2xl mx-auto ${
              isDarkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            We empower diverse sectors with innovative technology solutions
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {whoWeServe.map((service, index) => (
            <div
              key={index}
              className={`rounded-xl p-6 shadow-lg hover:shadow-xl flex flex-col h-full transition-colors duration-300 ${
                isDarkMode ? "bg-gray-800" : "bg-white"
              }`}
            >
              <div
                className={`rounded-full p-3 w-16 h-16 flex items-center justify-center mb-4 ${
                  isDarkMode
                    ? "bg-gray-700 text-orange-400"
                    : "bg-orange-100 text-orange-600"
                }`}
              >
                {renderIcon(service.icon)}
              </div>
              <div className="flex-grow">
                <h3
                  className={`text-xl font-bold mb-2 ${
                    isDarkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  {service.title}
                </h3>
                <p
                  className={`mb-6 ${
                    isDarkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  {service.description}
                </p>
              </div>
              <div className="mt-auto pt-4">
                <button
                  className={`w-full py-3 rounded-lg font-medium transition-all duration-300 ${
                    isDarkMode
                      ? "bg-gray-700 text-orange-400 hover:bg-gray-600"
                      : "bg-orange-50 text-orange-600 hover:bg-orange-100"
                  }`}
                >
                  Learn More
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="mt-24 px-4 md:px-8 max-w-7xl mx-auto">
        <div
          className={`rounded-2xl p-8 md:p-12 bg-gradient-to-r from-blue-900 to-[#485eac] text-white shadow-xl`}
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="md:w-2/3">
              <h2 className="text-3xl font-black mb-4">
                Ready to{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">
                  partner with us?
                </span>
              </h2>
              <p className="text-lg text-blue-100 mb-6">
                Leverage our innovative solutions to transform your organization
                today.
              </p>
            </div>
            <div className="md:w-1/3">
              <button
                className={`w-full px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl`}
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
