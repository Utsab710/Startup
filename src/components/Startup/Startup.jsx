import React from "react";
import {
  IoRocketOutline,
  IoStatsChartOutline,
  IoTrendingUpOutline,
} from "react-icons/io5";
import { useTheme } from "../ThemeToggle/ThemeContext";

function Startup() {
  const { isDarkMode } = useTheme();

  // Sample programs data
  const programs = [
    {
      title: "Accelerator Program",
      description:
        "12-week intensive program to scale your startup with mentorship, funding, and resources.",
      icon: <IoRocketOutline className="w-8 h-8" />,
      benefits: [
        "$50K Seed Funding",
        "Expert Mentorship",
        "Investor Connections",
      ],
    },
    {
      title: "Growth Track",
      description:
        "For startups with MVP seeking product-market fit and preparing for Series A.",
      icon: <IoTrendingUpOutline className="w-8 h-8" />,
      benefits: ["Market Strategy", "Sales Pipeline", "Scaling Guidance"],
    },
    {
      title: "Innovation Lab",
      description:
        "Experiment, prototype, and validate your ideas with our technical resources and advisors.",
      icon: <IoStatsChartOutline className="w-8 h-8" />,
      benefits: [
        "Technical Resources",
        "Validation Framework",
        "Pivot Support",
      ],
    },
  ];

  // Sample success metrics
  const metrics = [
    { number: "87%", label: "Success Rate" },
    { number: "$120M+", label: "Funding Raised" },
    { number: "350+", label: "Startups Launched" },
  ];

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
                className={`font-medium text-sm tracking-wide transition-colors duration-300 ${
                  isDarkMode ? "text-orange-400" : "text-orange-600"
                }`}
              >
                From Idea to Impact
              </span>
            </div>
            <h1
              className={`text-4xl md:text-5xl font-black leading-tight transition-colors duration-300 ${
                isDarkMode ? "text-[#485eac]" : "text-[#485eac]"
              }`}
            >
              Launch Your
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-orange-400">
                Next Big Thing
              </span>
            </h1>
            <p
              className={`text-lg max-w-md leading-relaxed transition-colors duration-300 ${
                isDarkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              We provide the resources, mentorship, and funding to transform
              your MVP into a market-leading company with proven traction.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <button
                className={`
                flex items-center gap-2 px-6 py-3 rounded-lg font-bold transition-all duration-300 
                shadow-lg hover:shadow-xl
                ${
                  isDarkMode
                    ? "bg-orange-700 text-white hover:bg-orange-600"
                    : "bg-orange-500 text-white hover:bg-orange-600"
                }
              `}
              >
                Apply Now
              </button>
              <a
                href="#programs"
                className={`
                font-semibold transition-colors flex items-center gap-2
                ${
                  isDarkMode
                    ? "text-orange-400 hover:text-orange-500"
                    : "text-orange-600 hover:text-orange-700"
                }
              `}
              >
                Explore Programs
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
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
              className={`
              absolute -top-10 -right-10 w-64 h-64 rounded-full blur-2xl opacity-50
              transition-colors duration-300
              ${isDarkMode ? "bg-gray-800" : "bg-orange-100"}
            `}
            ></div>
            <img
              src="https://imgs.search.brave.com/rtxRBEZzbxWbWe19K2ib0AT8MJVcrJUCh-4Mj_ritFM/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzEwLzM0LzY4LzI2/LzM2MF9GXzEwMzQ2/ODI2NDRfYkpjR1ds/aGVMb0RNd2NWakF1/aDJacVZ3cWpERlZT/VEsuanBn"
              className="relative w-full h-auto rounded-2xl shadow-2xl z-10"
              alt="Startup Team Collaboration"
            />
          </div>
        </div>
      </div>

      {/* Success Metrics */}
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
                Impact
              </span>
            </h2>
            <p
              className={`mt-2 text-lg max-w-2xl mx-auto ${
                isDarkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              We've helped hundreds of startups move from idea to market
              traction
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {metrics.map((metric, index) => (
              <div key={index} className="text-center">
                <p
                  className={`text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-orange-400`}
                >
                  {metric.number}
                </p>
                <p
                  className={`mt-2 text-lg font-medium ${
                    isDarkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  {metric.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Programs Section */}
      {/* Programs Section */}
      <div id="programs" className="mt-24 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2
            className={`text-3xl font-bold ${
              isDarkMode ? "text-[#485eac]" : "text-[#485eac]"
            }`}
          >
            Our{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-orange-400">
              Programs
            </span>
          </h2>
          <p
            className={`mt-2 text-lg max-w-2xl mx-auto ${
              isDarkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Choose the right path for your startup's current stage
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {programs.map((program, index) => (
            <div
              key={index}
              className={`
          rounded-xl 
          p-6 
          shadow-lg 
          hover:shadow-xl 
          flex 
          flex-col 
          h-full
          transition-colors duration-300 
          ${isDarkMode ? "bg-gray-800" : "bg-white"}
        `}
            >
              {/* Icon */}
              <div
                className={`
            rounded-full 
            p-3 
            w-16 
            h-16 
            flex 
            items-center 
            justify-center 
            mb-4 
            ${
              isDarkMode
                ? "bg-gray-700 text-orange-400"
                : "bg-orange-100 text-orange-600"
            }
          `}
              >
                {program.icon}
              </div>

              {/* Content Container - Takes available space */}
              <div className="flex-grow">
                <h3
                  className={`text-xl font-bold mb-2 ${
                    isDarkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  {program.title}
                </h3>

                <p
                  className={`mb-6 ${
                    isDarkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  {program.description}
                </p>

                <h4
                  className={`font-medium mb-3 ${
                    isDarkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Key Benefits:
                </h4>

                <ul className="space-y-2 mb-6">
                  {program.benefits.map((benefit, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <svg
                        className={`w-5 h-5 min-w-5 ${
                          isDarkMode ? "text-orange-400" : "text-orange-500"
                        }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span
                        className={
                          isDarkMode ? "text-gray-300" : "text-gray-700"
                        }
                      >
                        {benefit}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Button - Always at bottom */}
              <div className="mt-auto pt-4">
                <button
                  className={`
              w-full 
              py-3 
              rounded-lg 
              font-medium 
              transition-all 
              duration-300 
              ${
                isDarkMode
                  ? "bg-gray-700 text-orange-400 hover:bg-gray-600"
                  : "bg-orange-50 text-orange-600 hover:bg-orange-100"
              }
            `}
                >
                  Learn More
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Startup Vocabulary Section */}
      <div className="mt-24 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div
            className={`inline-block rounded-full p-2 mb-2 transition-colors duration-300 ${
              isDarkMode ? "bg-gray-800" : "bg-orange-50"
            }`}
          >
            <span
              className={`font-medium text-sm p-3 tracking-wide transition-colors duration-300 ${
                isDarkMode ? "text-orange-400" : "text-orange-600"
              }`}
            >
              Startup Knowledge
            </span>
          </div>
          <h2
            className={`text-3xl font-bold ${
              isDarkMode ? "text-[#485eac]" : "text-[#485eac]"
            }`}
          >
            Master the{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-orange-400">
              Startup Lingo
            </span>
          </h2>
          <p
            className={`mt-2 text-lg max-w-2xl mx-auto ${
              isDarkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Essential vocabulary every founder should know
          </p>
        </div>

        <div
          className={`rounded-2xl p-8 shadow-lg transition-colors duration-300 ${
            isDarkMode ? "bg-gray-800" : "bg-white"
          }`}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                term: "MVP",
                definition:
                  "Minimum Viable Product - The product in its most basic form with just enough features to satisfy early adopters.",
              },
              {
                term: "Pivot",
                definition:
                  "A shift in business strategy to test a new approach after discovering the current products aren't meeting customer needs.",
              },
              {
                term: "Bootstrapping",
                definition:
                  "Building a company from the ground up with personal savings and revenue without external funding.",
              },
              {
                term: "Runway",
                definition:
                  "The amount of time a startup can operate before running out of money if income and expenses remain constant.",
              },
            ].map((item, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg ${
                  isDarkMode ? "bg-gray-700" : "bg-orange-50"
                }`}
              >
                <h3
                  className={`font-bold mb-1 ${
                    isDarkMode ? "text-orange-400" : "text-orange-600"
                  }`}
                >
                  {item.term}
                </h3>
                <p className={isDarkMode ? "text-gray-300" : "text-gray-700"}>
                  {item.definition}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-6 text-center">
            <button
              className={`
              px-6 py-2 rounded-lg font-medium transition-all duration-300
              ${
                isDarkMode
                  ? "bg-orange-700 text-white hover:bg-orange-600"
                  : "bg-orange-500 text-white hover:bg-orange-600"
              }
            `}
            >
              View Full
            </button>
          </div>
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
                Ready to turn your idea into the{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">
                  next big thing?
                </span>
              </h2>
              <p className="text-lg text-blue-100 mb-6">
                Join our community of founders, mentors, and investors building
                the future.
              </p>
            </div>
            <div className="md:w-1/3">
              <button
                className={`
                w-full px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl 
                transition-all duration-300 shadow-lg hover:shadow-xl
              `}
              >
                Apply for Next Cohort
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Startup;
