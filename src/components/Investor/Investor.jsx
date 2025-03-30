import React, { useState } from "react";
import { useTheme } from "../ThemeToggle/ThemeContext";

function Investor() {
  const { isDarkMode } = useTheme();

  // Investment firms data
  const investors = [
    {
      name: "Khalti",
      logo: "https://encdn.ratopati.com/media/news/khalti_ELEhMcPi9q_8KQHgO7gag.png",
    },
    {
      name: "Softech",
      logo: "https://softechfoundation.com/upload_file/setting/1711949002_1167325993_1536148958_384808185_logo.png",
    },
    {
      name: "Facebook",
      logo: "https://pub-e63b17b4d990438a83af58c15949f8a2.r2.dev/type/circle.png",
    },
    {
      name: "HA Financial",
      logo: "https://pub-e63b17b4d990438a83af58c15949f8a2.r2.dev/type/amara.png",
    },
    {
      name: "Silvertime",
      logo: "https://pub-e63b17b4d990438a83af58c15949f8a2.r2.dev/type/liva.png",
    },
    {
      name: "Aqua Dynamics",
      logo: "https://pub-e63b17b4d990438a83af58c15949f8a2.r2.dev/type/acme.png",
    },
    {
      name: "Viridian Angels",
      logo: "https://pub-e63b17b4d990438a83af58c15949f8a2.r2.dev/type/radiyal.png",
    },
    {
      name: "Abyro",
      logo: "https://pub-e63b17b4d990438a83af58c15949f8a2.r2.dev/type/hexa.png",
    },
  ];

  // Investment opportunities data
  const investmentOpportunities = [
    {
      title: "Tracking the Best Deals",
      description:
        "Enabling fundraising and strategic partnerships with the most innovative high-growth startups.",
      icon: "chart-line",
    },
    {
      title: "Exclusive Investment Opportunities",
      description:
        "Efficiently invest in the best exclusive deals with competitive entry terms, historical performance, and more.",
      icon: "gem",
    },
    {
      title: "High-yielding Investments",
      description:
        "Connect to a portfolio of vetted and innovative startups to secure high potential returns.",
      icon: "chart-bar",
    },
  ];

  // FAQ state with useState hook
  const [faqs, setFaqs] = useState([
    {
      question: "Is there a membership fee for investors?",
      answer:
        "No, there is no membership fee for signing up as a T-Hub investor.",
      isOpen: true,
    },
    {
      question: "Do I have to invest through T-Hub?",
      answer:
        "No, you can invest directly in companies, but T-Hub provides vetted opportunities and streamlined processes.",
      isOpen: false,
    },
    {
      question:
        "Do I have to perform due diligence for companies I would like to invest in?",
      answer:
        "While T-Hub provides initial screening, we encourage investors to conduct their own due diligence. We offer resources to help with this process.",
      isOpen: false,
    },
    {
      question: "Do I get to attend T-Hub events?",
      answer:
        "Yes, investors get priority access to all networking events, demo days, and exclusive investor-only gatherings.",
      isOpen: false,
    },
    {
      question: "I still have questions",
      answer:
        "Please contact our investor relations team at investors@t-hub.com or schedule a call with one of our advisors.",
      isOpen: false,
    },
  ]);

  // Toggle FAQ state with useState
  const toggleFAQ = (index) => {
    setFaqs(
      faqs.map((faq, i) => {
        if (i === index) {
          return { ...faq, isOpen: !faq.isOpen };
        }
        return faq;
      })
    );
  };

  // Benefits tab state
  const [activeTab, setActiveTab] = useState("investors");

  // Render icon based on name
  const renderIcon = (iconName) => {
    switch (iconName) {
      case "chart-line":
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
              d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
            />
          </svg>
        );
      case "gem":
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
              d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
            />
          </svg>
        );
      case "chart-bar":
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
              d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
            />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div
      className={`w-full min-h-screen mx-auto overflow-hidden transition-colors duration-300 ${
        isDarkMode ? "bg-gray-900 text-gray-200" : "bg-white text-gray-900"
      }`}
    >
      {/* Hero Section */}
      <div className="relative">
        <img
          src="https://www.arval.com/sites/default/files/styles/crop_1_3_1500x500/public/151/2025/02/INVESTOR%201.jpg?itok=IV6cQKRy"
          className="w-full h-96 object-cover  filter brightness-50 contrast-125"
          alt="Investor hero"
        />
        <div className="absolute inset-0 bg-opacity-50 flex flex-col justify-center items-center">
          <h1
            className={`text-5xl md:text-6xl font-black leading-tight text-white mb-4`}
          >
            Investor
            <span
              className={`ml-2 text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-700`}
            >
              Hub
            </span>
          </h1>
          <p className="text-white text-xl max-w-2xl text-center px-4">
            Connect with innovative startups and access exclusive high-yielding
            investment opportunities
          </p>
          <button
            className={`
            mt-6
            flex 
            items-center 
            gap-2 
            px-6 
            py-3 
            rounded-lg 
            font-bold 
            transition-all 
            duration-300 
            shadow-lg 
            hover:shadow-xl
            bg-orange-500 text-white hover:bg-orange-600
          `}
          >
            Join Our Investor Network
          </button>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="px-4 py-16">
        <div className="text-center mb-12">
          <h2
            className={`text-3xl font-bold mb-4 ${
              isDarkMode ? "text-gray-100" : "text-gray-900"
            }`}
          >
            Benefits
          </h2>
          <div className="flex justify-center gap-4 mb-8">
            <button
              onClick={() => setActiveTab("investors")}
              className={`px-6 py-2 rounded-lg font-semibold transition-colors duration-300 ${
                activeTab === "investors"
                  ? "bg-black text-white"
                  : isDarkMode
                  ? "bg-gray-800 text-gray-300 hover:bg-gray-700"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              Investors
            </button>
            <button
              onClick={() => setActiveTab("startups")}
              className={`px-6 py-2 rounded-lg font-semibold transition-colors duration-300 ${
                activeTab === "startups"
                  ? "bg-orange-500 text-white"
                  : isDarkMode
                  ? "bg-gray-800 text-gray-300 hover:bg-gray-700"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              Startups
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {activeTab === "investors" ? (
            <>
              {/* Curated Dealflow */}
              <div
                className={`p-6 rounded-lg transition-colors duration-300 ${
                  isDarkMode ? "bg-gray-800" : "bg-gray-50"
                }`}
              >
                <div className="flex justify-center mb-4">
                  <div
                    className={`p-3 rounded-full ${
                      isDarkMode ? "text-orange-400" : "text-orange-600"
                    }`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-10 w-10"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                      />
                    </svg>
                  </div>
                </div>
                <h3
                  className={`text-xl font-bold text-center mb-2 ${
                    isDarkMode ? "text-gray-100" : "text-gray-900"
                  }`}
                >
                  Curated Dealflow
                </h3>
                <p
                  className={`text-center ${
                    isDarkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  Gain access to a curated selection of startup opportunities
                  that align with your investment criteria.
                </p>
              </div>

              {/* Networking Events */}
              <div
                className={`p-6 rounded-lg transition-colors duration-300 ${
                  isDarkMode ? "bg-gray-800" : "bg-gray-50"
                }`}
              >
                <div className="flex justify-center mb-4">
                  <div
                    className={`p-3 rounded-full ${
                      isDarkMode ? "text-orange-400" : "text-orange-600"
                    }`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-10 w-10"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                  </div>
                </div>
                <h3
                  className={`text-xl font-bold text-center mb-2 ${
                    isDarkMode ? "text-gray-100" : "text-gray-900"
                  }`}
                >
                  Networking Events
                </h3>
                <p
                  className={`text-center ${
                    isDarkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  Be a part of networking events and roundtable discussions to
                  connect with fellow investors and industry experts.
                </p>
              </div>

              {/* Strategic Partnership Opportunities */}
              <div
                className={`p-6 rounded-lg transition-colors duration-300 ${
                  isDarkMode ? "bg-gray-800" : "bg-gray-50"
                }`}
              >
                <div className="flex justify-center mb-4">
                  <div
                    className={`p-3 rounded-full ${
                      isDarkMode ? "text-orange-400" : "text-orange-600"
                    }`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-10 w-10"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z"
                      />
                    </svg>
                  </div>
                </div>
                <h3
                  className={`text-xl font-bold text-center mb-2 ${
                    isDarkMode ? "text-gray-100" : "text-gray-900"
                  }`}
                >
                  Strategic Partnership Opportunities
                </h3>
                <p
                  className={`text-center ${
                    isDarkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  Leverage our platform to forge strategic partnerships,
                  enabling co-investment opportunities with fellow investors.
                </p>
              </div>
            </>
          ) : (
            <>
              {/* Startup benefits - displayed when startups tab is active */}
              <div
                className={`p-6 rounded-lg transition-colors duration-300 ${
                  isDarkMode ? "bg-gray-800" : "bg-gray-50"
                }`}
              >
                <div className="flex justify-center mb-4">
                  <div
                    className={`p-3 rounded-full ${
                      isDarkMode ? "text-orange-400" : "text-orange-600"
                    }`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-10 w-10"
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
                  </div>
                </div>
                <h3
                  className={`text-xl font-bold text-center mb-2 ${
                    isDarkMode ? "text-gray-100" : "text-gray-900"
                  }`}
                >
                  Access to Capital
                </h3>
                <p
                  className={`text-center ${
                    isDarkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  Connect with our network of investors ready to fund innovative
                  ideas and promising startups.
                </p>
              </div>

              <div
                className={`p-6 rounded-lg transition-colors duration-300 ${
                  isDarkMode ? "bg-gray-800" : "bg-gray-50"
                }`}
              >
                <div className="flex justify-center mb-4">
                  <div
                    className={`p-3 rounded-full ${
                      isDarkMode ? "text-orange-400" : "text-orange-600"
                    }`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-10 w-10"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </div>
                </div>
                <h3
                  className={`text-xl font-bold text-center mb-2 ${
                    isDarkMode ? "text-gray-100" : "text-gray-900"
                  }`}
                >
                  Mentorship
                </h3>
                <p
                  className={`text-center ${
                    isDarkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  Gain guidance from experienced entrepreneurs and industry
                  experts who have been through the startup journey.
                </p>
              </div>

              <div
                className={`p-6 rounded-lg transition-colors duration-300 ${
                  isDarkMode ? "bg-gray-800" : "bg-gray-50"
                }`}
              >
                <div className="flex justify-center mb-4">
                  <div
                    className={`p-3 rounded-full ${
                      isDarkMode ? "text-orange-400" : "text-orange-600"
                    }`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-10 w-10"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                </div>
                <h3
                  className={`text-xl font-bold text-center mb-2 ${
                    isDarkMode ? "text-gray-100" : "text-gray-900"
                  }`}
                >
                  Resources & Workspace
                </h3>
                <p
                  className={`text-center ${
                    isDarkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  Access co-working spaces, technical resources, and tools to
                  help your startup grow and succeed.
                </p>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Meet Our Investors */}
      <div
        className={`px-4 py-16 ${isDarkMode ? "bg-gray-800" : "bg-gray-50"}`}
      >
        <div className="max-w-6xl mx-auto">
          <h2
            className={`text-3xl font-bold text-center mb-12 ${
              isDarkMode ? "text-gray-100" : "text-gray-900"
            }`}
          >
            Meet Our Investors
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {investors.map((investor, index) => (
              <div
                key={index}
                className={`${
                  isDarkMode ? "bg-gray-700" : "bg-white"
                } p-6 rounded-lg shadow-md flex items-center justify-center h-24 transition-colors duration-300`}
              >
                <img
                  src={investor.logo}
                  alt={investor.name}
                  className="max-w-full max-h-full object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* How We Do It */}
      <div className="px-4 py-16">
        <div className="text-center mb-8">
          <h1
            className={`text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-600 to-orange-400 `}
          >
            How We Do It
          </h1>
          <h2
            className={`text-3xl font-bold text-center mb-8 ${
              isDarkMode ? "text-gray-100" : "text-gray-900"
            }`}
          >
            We help you aim for high-yielding investments & serve as your access
            point to accelerate deal flow
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {investmentOpportunities.map((opportunity, index) => (
              <div
                key={index}
                className={`p-6 rounded-lg transition-colors duration-300 ${
                  isDarkMode ? "bg-gray-800" : "bg-white"
                } shadow-md`}
              >
                <div
                  className={`flex justify-center mb-4 ${
                    isDarkMode ? "text-orange-400" : "text-orange-600"
                  }`}
                >
                  {renderIcon(opportunity.icon)}
                </div>
                <h3
                  className={`text-xl font-bold text-center mb-2 ${
                    isDarkMode ? "text-gray-100" : "text-gray-900"
                  }`}
                >
                  {opportunity.title}
                </h3>
                <p
                  className={`text-center ${
                    isDarkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  {opportunity.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FAQs */}
      <div
        className={`px-4 py-16 ${isDarkMode ? "bg-gray-800" : "bg-gray-50"}`}
      >
        <div className="max-w-3xl mx-auto">
          <h2
            className={`text-3xl font-bold text-center mb-12 ${
              isDarkMode ? "text-gray-100" : "text-gray-900"
            }`}
          >
            FAQs
          </h2>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className={`overflow-hidden rounded-lg transition-colors duration-300 ${
                  isDarkMode ? "bg-gray-700" : "bg-white"
                }`}
              >
                <button
                  className={`flex justify-between items-center w-full px-4 py-3 text-left font-semibold ${
                    faq.isOpen
                      ? "bg-orange-500 text-white"
                      : isDarkMode
                      ? "text-gray-100"
                      : "text-gray-900"
                  }`}
                  onClick={() => toggleFAQ(index)}
                >
                  <span>{faq.question}</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`h-5 w-5 transform transition-transform duration-300 ${
                      faq.isOpen ? "rotate-180" : ""
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                {faq.isOpen && (
                  <div
                    className={`px-4 py-3 ${
                      isDarkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h2
            className={`text-3xl font-bold mb-4 ${
              isDarkMode ? "text-gray-100" : "text-gray-900"
            }`}
          >
            Ready to Join Our Investment Community?
          </h2>
          <p
            className={`text-lg mb-8 ${
              isDarkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Connect with innovative startups, access exclusive deals, and grow
            your investment portfolio with us.
          </p>
          <button
            className={`
            px-8
            py-4 
            rounded-lg 
            font-bold 
            transition-all 
            duration-300 
            shadow-lg 
            hover:shadow-xl
            bg-orange-500 text-white hover:bg-orange-600
          `}
          >
            Apply as an Investor
          </button>
        </div>
      </div>
    </div>
  );
}

export default Investor;
