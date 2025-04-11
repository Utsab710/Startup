import React, { useState, useEffect, useRef } from "react";
import { useTheme } from "../ThemeToggle/ThemeContext";

const Corporate = () => {
  const { isDarkMode } = useTheme();

  // Images for the slider
  const images = [
    "/api/placeholder/1200/500",
    "/api/placeholder/1200/500",
    "/api/placeholder/1200/500",
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const focusCardsRef = useRef(null);
  const [visibleCards, setVisibleCards] = useState([
    false,
    false,
    false,
    false,
  ]);

  // Auto-slide effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [images.length]);

  // Scroll animation for cards
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
    };

    const handleIntersect = (entries) => {
      if (entries[0].isIntersecting) {
        // Reveal cards one by one with delay
        const newVisibility = [...visibleCards];
        for (let i = 0; i < newVisibility.length; i++) {
          setTimeout(() => {
            setVisibleCards((prev) => {
              const updated = [...prev];
              updated[i] = true;
              return updated;
            });
          }, i * 200);
        }
      }
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);

    if (focusCardsRef.current) {
      observer.observe(focusCardsRef.current);
    }

    return () => {
      if (focusCardsRef.current) {
        observer.unobserve(focusCardsRef.current);
      }
    };
  }, []);

  // Focus cards data
  const focusCards = [
    {
      title: "Incubation",
      description:
        "Our state-of-the-art incubation program provides startups with workspace, resources, and mentorship to transform innovative ideas into viable businesses.",
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
            d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
          />
        </svg>
      ),
    },
    {
      title: "Mentorship",
      description:
        "Connect with industry experts and seasoned entrepreneurs who provide guidance, insights, and strategic advice to help navigate challenges and accelerate growth.",
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
      title: "Collaboration",
      description:
        "We facilitate meaningful partnerships between startups, corporates, investors, and government agencies to create a robust ecosystem that drives innovation.",
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
            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
      ),
    },
    {
      title: "Placement",
      description:
        "Our dedicated placement initiatives connect promising talent with innovative companies, creating opportunities for growth and professional development.",
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
            d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
      ),
    },
  ];

  // Key features data
  const keyFeatures = [
    {
      title: "High-Impact Programs",
      description:
        "Our curated programs are geared to accelerate your innovation journey.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-16 w-16"
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
      ),
    },
    {
      title: "Create a Global Network",
      description:
        "Forge alliances with industry peers to build innovative solutions.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-16 w-16"
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
      ),
    },
    {
      title: "Adopt an Innovation Mindset",
      description:
        "We foster intrapreneurship and serve as a gateway for startups with our state-of-the-art initiatives.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-16 w-16"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
          />
        </svg>
      ),
    },
    {
      title: "Amplify Digital Transformation",
      description:
        "Connect with innovative startups to transform your innovation model.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-16 w-16"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
      ),
    },
  ];

  // FAQs data
  const [faqs, setFaqs] = useState([
    {
      question: "What is corporate innovation?",
      answer:
        "Corporate innovation refers to the process of transforming creative ideas into valuable products, services, or processes within established companies. It involves creating new business models, developing new technologies, and finding novel ways to create value for customers and stakeholders.",
      isOpen: true,
    },
    {
      question: "How do we help corporates innovate?",
      answer:
        "We provide a comprehensive ecosystem that helps corporates innovate through structured programs, access to startups, mentorship networks, and collaborative workspaces. Our approach enables corporations to adopt agile methodologies and stay ahead in rapidly evolving markets.",
      isOpen: false,
    },
    {
      question: "What are the benefits of corporate partnerships?",
      answer:
        "Corporate partnerships provide access to cutting-edge solutions, talent acquisition opportunities, market insights, and faster time-to-market for new innovations. They also help establish your brand as an innovation leader in your industry.",
      isOpen: false,
    },
    {
      question: "How can my company join your corporate program?",
      answer:
        "To join our corporate program, please contact our corporate relations team at corporate@t-hub.com. We'll schedule a consultation to understand your innovation needs and design a customized engagement model.",
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

  return (
    <div
      className={`w-full transition-colors duration-300 ${
        isDarkMode ? "bg-gray-900 text-gray-200" : "bg-white text-gray-900"
      }`}
    >
      {/* Hero Section with Slider */}
      <div className="relative w-full h-screen max-h-96 overflow-hidden">
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentImageIndex ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={image}
              alt={`Slide ${index + 1}`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col justify-center items-center text-white p-6">
              <h1 className="text-4xl md:text-6xl font-bold mb-6 text-center">
                <span className="text-orange-500">Bridge</span> your{" "}
                <span className="text-blue-400">Innovation</span> Gap
                <br />
                and Stay <span className="text-orange-500">Ahead</span>
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-center max-w-3xl">
                We Help Corporates Stay Agile Through Our High-Impact
                Partnerships
              </p>
              <button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-8 rounded-lg transition duration-300 shadow-lg">
                Get Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Features Section */}
      <div
        className={`py-20 px-4 ${isDarkMode ? "bg-gray-800" : "bg-gray-50"}`}
        ref={focusCardsRef}
      >
        <div className="max-w-7xl mx-auto">
          <div
            className={`rounded-full p-2 mb-2 mx-auto text-center block ${
              isDarkMode ? "bg-gray-700" : "bg-orange-50"
            }`}
          >
            <span
              className={`font-medium  text-sm tracking-wide ${
                isDarkMode ? "text-orange-400" : "text-orange-600"
              }`}
            >
              Corporate Innovation
            </span>
          </div>
          <h2
            className={`text-3xl md:text-4xl font-bold text-center mb-4 ${
              isDarkMode ? "text-[#485eac]" : "text-[#485eac]"
            }`}
          >
            We{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-orange-400">
              Focus
            </span>{" "}
            On
          </h2>
          <p
            className={`text-center max-w-2xl mx-auto mb-12 ${
              isDarkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Our comprehensive approach to corporate innovation drives
            sustainable growth and keeps you ahead of the competition
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {focusCards.map((card, index) => (
              <div
                key={index}
                className={`rounded-lg shadow-lg p-6 transform transition-all duration-700 ${
                  visibleCards[index]
                    ? "translate-x-0 opacity-100"
                    : "translate-x-full opacity-0"
                } ${isDarkMode ? "bg-gray-700" : "bg-white"}`}
              >
                <div
                  className={`flex justify-center mb-4 p-3 rounded-full w-16 h-16 mx-auto ${
                    isDarkMode
                      ? "bg-gray-600 text-orange-400"
                      : "bg-orange-100 text-orange-600"
                  }`}
                >
                  {card.icon}
                </div>
                <h3
                  className={`text-xl font-bold text-center mb-3 ${
                    isDarkMode ? "text-gray-100" : "text-blue-600"
                  }`}
                >
                  {card.title}
                </h3>
                <p
                  className={`text-center ${
                    isDarkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  {card.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Key Features Section */}
      <div className={`py-20 px-4 ${isDarkMode ? "bg-gray-900" : "bg-white"}`}>
        <div className="max-w-7xl mx-auto">
          <h2
            className={`text-3xl font-bold text-center mb-4 ${
              isDarkMode ? "text-[#485eac]" : "text-[#485eac]"
            }`}
          >
            Key{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-orange-400">
              Features
            </span>
          </h2>
          <p
            className={`text-center max-w-2xl mx-auto mb-12 ${
              isDarkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Drive innovation and strategic growth with our comprehensive
            corporate solutions
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {keyFeatures.map((feature, index) => (
              <div
                key={index}
                className={`p-6 rounded-lg transition-all duration-300 hover:shadow-lg ${
                  isDarkMode ? "bg-gray-800" : "bg-gray-50"
                }`}
              >
                <div
                  className={`flex justify-center mb-4 ${
                    isDarkMode ? "text-orange-400" : "text-orange-500"
                  }`}
                >
                  {feature.icon}
                </div>
                <h3
                  className={`text-xl font-bold text-center mb-2 ${
                    isDarkMode ? "text-gray-100" : "text-blue-600"
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

      {/* Benefits Section */}
      <div
        className={`py-20 px-4 ${isDarkMode ? "bg-gray-800" : "bg-gray-50"}`}
      >
        <div className="max-w-7xl mx-auto">
          <div
            className={`rounded-2xl p-8 md:p-12 shadow-lg ${
              isDarkMode ? "bg-gray-700" : "bg-orange-50"
            }`}
          >
            <div className="text-center mb-12">
              <h2
                className={`text-3xl font-bold ${
                  isDarkMode ? "text-[#485eac]" : "text-[#485eac]"
                }`}
              >
                Corporate{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-orange-400">
                  Benefits
                </span>
              </h2>
              <p
                className={`mt-2 text-lg max-w-2xl mx-auto ${
                  isDarkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                Empowering your organization to thrive in a rapidly evolving
                business landscape
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div
                className={`p-6 rounded-lg ${
                  isDarkMode ? "bg-gray-800" : "bg-white"
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
                        d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                      />
                    </svg>
                  </div>
                </div>
                <h3
                  className={`text-xl font-bold text-center mb-2 ${
                    isDarkMode ? "text-gray-100" : "text-gray-900"
                  }`}
                >
                  Accelerated Growth
                </h3>
                <p
                  className={`text-center ${
                    isDarkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  Fast-track your innovation initiatives and reduce
                  time-to-market for new solutions.
                </p>
              </div>

              <div
                className={`p-6 rounded-lg ${
                  isDarkMode ? "bg-gray-800" : "bg-white"
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
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
                  </div>
                </div>
                <h3
                  className={`text-xl font-bold text-center mb-2 ${
                    isDarkMode ? "text-gray-100" : "text-gray-900"
                  }`}
                >
                  Risk Mitigation
                </h3>
                <p
                  className={`text-center ${
                    isDarkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  Test new ideas in a controlled environment before full-scale
                  implementation.
                </p>
              </div>

              <div
                className={`p-6 rounded-lg ${
                  isDarkMode ? "bg-gray-800" : "bg-white"
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
                  Talent Development
                </h3>
                <p
                  className={`text-center ${
                    isDarkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  Foster an innovation mindset within your team and attract top
                  talent to your organization.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FAQs Section */}
      <div className={`py-20 px-4 ${isDarkMode ? "bg-gray-900" : "bg-white"}`}>
        <div className="max-w-7xl mx-auto">
          <div
            className={`rounded-2xl p-8 shadow-lg ${
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
                Everything you need to know about our corporate innovation
                programs
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
      </div>

      {/* CTA Section */}
      <div className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="rounded-2xl p-8 md:p-12 bg-gradient-to-r from-blue-900 to-[#485eac] text-white shadow-xl">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="md:w-2/3">
                <h2 className="text-3xl font-black mb-4">
                  Ready to{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">
                    revolutionize
                  </span>{" "}
                  your innovation strategy?
                </h2>
                <p className="text-lg text-blue-100 mb-6">
                  Connect with our team to learn how our corporate innovation
                  programs can help your organization thrive in today's
                  competitive landscape.
                </p>
              </div>
              <div className="md:w-1/3">
                <button className="w-full px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl">
                  Schedule a Consultation
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Corporate;
