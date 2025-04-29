import React, { useState, useEffect } from "react";
import { useTheme } from "../ThemeToggle/ThemeContext";
import axios from "axios";

function Investor() {
  const { isDarkMode } = useTheme();
  const [investors, setInvestors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch approved investors from the backend
  useEffect(() => {
    const fetchInvestors = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/investors/approved"
        );
        // Filter only investors with logos (in case some approved ones lack imageUrl)
        const approvedInvestorsWithLogos = response.data.filter(
          (investor) => investor.imageUrl
        );
        setInvestors(approvedInvestorsWithLogos);
        setLoading(false);
      } catch (err) {
        console.error("Fetch error:", err.response || err.message);
        setError("Failed to load investors");
        setLoading(false);
      }
    };
    fetchInvestors();
  }, []);

  // Investment opportunities data (unchanged)
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

  // FAQ state (unchanged)
  const [faqs, setFaqs] = useState([
    {
      question: "Is there a membership fee for investors?",
      answer:
        "No, there is no membership fee for signing up as a A2F Nexus investor.",
      isOpen: true,
    },
    {
      question: "Do I have to invest through A2F Nexus?",
      answer:
        "No, you can invest directly in companies, but A2F Nexus provides vetted opportunities and streamlined processes.",
      isOpen: false,
    },
    {
      question:
        "Do I have to perform due diligence for companies I would like to invest in?",
      answer:
        "While A2F Nexus provides initial screening, we encourage investors to conduct their own due diligence. We offer resources to help with this process.",
      isOpen: false,
    },
    {
      question: "Do I get to attend A2F Nexus events?",
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

  const toggleFAQ = (index) => {
    setFaqs(
      faqs.map((faq, i) =>
        i === index ? { ...faq, isOpen: !faq.isOpen } : faq
      )
    );
  };

  // Benefits tab state (unchanged)
  const [activeTab, setActiveTab] = useState("investors");

  // Render icon (unchanged)
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

  if (loading)
    return <div className="text-center py-16">Loading investors...</div>;
  if (error)
    return <div className="text-center py-16 text-red-500">{error}</div>;

  return (
    <div
      className={`w-full py-16 transition-colors duration-300 ${
        isDarkMode ? "bg-gray-900 text-gray-200" : "bg-white text-gray-900"
      }`}
    >
      {/* Hero Section (unchanged) */}
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
                Investment Opportunities
              </span>
            </div>
            <h1
              className={`text-4xl md:text-5xl font-black leading-tight transition-colors duration-300 ${
                isDarkMode ? "text-[#485eac]" : "text-[#485eac]"
              }`}
            >
              Investor
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-orange-400">
                Hub
              </span>
            </h1>
            <p
              className={`text-lg max-w-md leading-relaxed transition-colors duration-300 ${
                isDarkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Connect with innovative startups and access exclusive
              high-yielding investment opportunities.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <button
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-bold transition-all duration-300 shadow-lg hover:shadow-xl ${
                  isDarkMode
                    ? "bg-orange-700 text-white hover:bg-orange-600"
                    : "bg-orange-500 text-white hover:bg-orange-600"
                }`}
              >
                Join Our Network
              </button>
              <a
                href="#opportunities"
                className={`font-semibold transition-colors flex items-center gap-2 ${
                  isDarkMode
                    ? "text-orange-400 hover:text-orange-500"
                    : "text-orange-600 hover:text-orange-700"
                }`}
              >
                Explore Opportunities
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
              className={`absolute -top-10 -right-10 w-64 h-64 rounded-full blur-2xl opacity-50 transition-colors duration-300 ${
                isDarkMode ? "bg-gray-800" : "bg-orange-100"
              }`}
            ></div>
            <img
              src="https://www.arval.com/sites/default/files/styles/crop_1_3_1500x500/public/151/2025/02/INVESTOR%201.jpg?itok=IV6cQKRy"
              className="relative w-full h-auto rounded-2xl shadow-2xl z-10"
              alt="Investor Collaboration"
            />
          </div>
        </div>
      </div>

      {/* Benefits Section (unchanged) */}
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
              Investor{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-orange-400">
                Benefits
              </span>
            </h2>
            <p
              className={`mt-2 text-lg max-w-2xl mx-auto ${
                isDarkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Choose the right path for your investment strategy
            </p>
          </div>
          <div className="flex justify-center gap-4 mb-8">
            <button
              onClick={() => setActiveTab("investors")}
              className={`px-6 py-2 rounded-lg font-semibold transition-colors duration-300 ${
                activeTab === "investors"
                  ? isDarkMode
                    ? "bg-orange-700 text-white"
                    : "bg-orange-500 text-white"
                  : isDarkMode
                  ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              Investors
            </button>
            <button
              onClick={() => setActiveTab("startups")}
              className={`px-6 py-2 rounded-lg font-semibold transition-colors duration-300 ${
                activeTab === "startups"
                  ? isDarkMode
                    ? "bg-orange-700 text-white"
                    : "bg-orange-500 text-white"
                  : isDarkMode
                  ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              Startups
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {activeTab === "investors" ? (
              <>
                <div
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
                <div
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
                <div
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
                    Strategic Partnerships
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
                <div
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
                    Connect with our network of investors ready to fund
                    innovative ideas and promising startups.
                  </p>
                </div>
                <div
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
      </div>

      {/* Meet Our Investors */}
      <div className="mt-24 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2
            className={`text-3xl font-bold ${
              isDarkMode ? "text-[#485eac]" : "text-[#485eac]"
            }`}
          >
            Meet Our{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-orange-400">
              Investors
            </span>
          </h2>
          <p
            className={`mt-2 text-lg max-w-2xl mx-auto ${
              isDarkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            We've partnered with leading investment firms and angel networks
          </p>
        </div>

        {investors.length === 0 ? (
          <p
            className={`text-center ${
              isDarkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            No approved investors with logos yet.
          </p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {investors.map((investor) => (
              <div
                key={investor._id}
                className={`p-6 rounded-lg shadow-md flex items-center justify-center h-32 transition-colors duration-300 ${
                  isDarkMode ? "bg-gray-800" : "bg-white"
                }`}
              >
                <img
                  src={investor.imageUrl}
                  alt={investor.Company}
                  className="max-w-full max-h-full object-contain"
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* How We Do It (unchanged) */}
      <div id="opportunities" className="mt-24 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div
            className={`inline-block rounded-full p-2 mb-2 transition-colors duration-300 ${
              isDarkMode ? "bg-gray-800" : "bg-orange-50"
            }`}
          >
            <span
              className={`font-medium text-base tracking-wide p-2 transition-colors duration-300 ${
                isDarkMode ? "text-orange-400" : "text-orange-600"
              }`}
            >
              Investment Strategy
            </span>
          </div>
          <h2
            className={`text-3xl font-bold ${
              isDarkMode ? "text-[#485eac]" : "text-[#485eac]"
            }`}
          >
            How We{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-orange-400">
              Do It
            </span>
          </h2>
          <p
            className={`mt-2 text-lg max-w-2xl mx-auto ${
              isDarkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            We help you aim for high-yielding investments & serve as your access
            point to accelerate deal flow
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {investmentOpportunities.map((opportunity, index) => (
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
                {renderIcon(opportunity.icon)}
              </div>
              <div className="flex-grow">
                <h3
                  className={`text-xl font-bold mb-2 ${
                    isDarkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  {opportunity.title}
                </h3>
                <p
                  className={`mb-6 ${
                    isDarkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  {opportunity.description}
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

      {/* FAQs (unchanged) */}
      <div className="mt-24 px-4 md:px-8 max-w-7xl mx-auto">
        <div
          className={`rounded-2xl p-8 shadow-lg transition-colors duration-300 ${
            isDarkMode ? "bg-gray-800" : "bg-white"
          }`}
        >
          <div className="text-center mb-12">
            <h2
              className={`text-3xl font-bold ${
                isDarkMode ? "text-[#485eac]" : "text-[#485eac]"
              }`}
            >
              Frequently Asked{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-orange-400">
                Questions
              </span>
            </h2>
            <p
              className={`mt-2 text-lg max-w-2xl mx-auto ${
                isDarkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Everything you need to know about our investor network
            </p>
          </div>
          <div className="space-y-4 max-w-3xl mx-auto">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className={`overflow-hidden rounded-lg transition-colors duration-300 ${
                  isDarkMode ? "bg-gray-700" : "bg-orange-50"
                }`}
              >
                <button
                  className={`flex justify-between items-center w-full px-6 py-4 text-left font-semibold ${
                    faq.isOpen
                      ? isDarkMode
                        ? "bg-gray-600 text-white"
                        : "bg-orange-500 text-white"
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
                    className={`px-6 py-4 ${
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

      {/* CTA Section (unchanged) */}
      <div className="mt-24 px-4 md:px-8 max-w-7xl mx-auto">
        <div
          className={`rounded-2xl p-8 md:p-12 bg-gradient-to-r from-blue-900 to-[#485eac] text-white shadow-xl`}
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="md:w-2/3">
              <h2 className="text-3xl font-black mb-4">
                Ready to join our{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">
                  investor network?
                </span>
              </h2>
              <p className="text-lg text-blue-100 mb-6">
                Connect with innovative startups, access exclusive deals, and
                grow your investment portfolio with us.
              </p>
            </div>
            <div className="md:w-1/3">
              <button
                className={`w-full px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl`}
              >
                Apply as an Investor
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Investor;
