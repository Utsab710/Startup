import React, { useState, useEffect, useRef } from "react";

const Corporate = () => {
  // Images for the slider - replace with your actual image URLs
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
          className="h-12 w-12 text-orange-500"
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
          className="h-12 w-12 text-orange-500"
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
          className="h-12 w-12 text-orange-500"
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
          className="h-12 w-12 text-orange-500"
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

  return (
    <div className="w-full">
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
            <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-white p-6">
              <h1 className="text-4xl md:text-6xl font-bold mb-6 text-center">
                <span className="text-orange-500">Bridge</span> your{" "}
                <span className="text-blue-400">Innovation</span> Gap
                <br />
                and Stay <span className="text-orange-500">Ahead</span>
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-center">
                We Help Corporates Stay Agile Through Our High-Impact
                Partnerships
              </p>
              <button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-md transition duration-300">
                Get Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Features Section */}
      <div className="py-16 px-4 bg-gray-100" ref={focusCardsRef}>
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            We <span className="text-orange-500">Focus</span> On
          </h2>
          <div className="w-24 h-1 bg-orange-500 mx-auto mb-12"></div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {focusCards.map((card, index) => (
              <div
                key={index}
                className={`bg-white rounded-lg shadow-lg p-6 transform transition-all duration-700 ${
                  visibleCards[index]
                    ? "translate-x-0 opacity-100"
                    : "translate-x-full opacity-0"
                }`}
              >
                <div className="flex justify-center mb-4">{card.icon}</div>
                <h3 className="text-xl font-bold text-center mb-3 text-blue-600">
                  {card.title}
                </h3>
                <p className="text-gray-600 text-center">{card.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Key Features Section */}
      <div className="py-16 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-gray-100 p-6 rounded-lg hover:shadow-lg transition-all duration-300">
            <div className="text-orange-500 mb-4 flex justify-center">
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
            </div>
            <h3 className="text-xl font-bold text-center mb-2 text-blue-600">
              High-Impact Programs
            </h3>
            <p className="text-gray-600 text-center">
              Our curated programs are geared to accelerate your innovation
              journey.
            </p>
          </div>

          <div className="bg-gray-100 p-6 rounded-lg hover:shadow-lg transition-all duration-300">
            <div className="text-orange-500 mb-4 flex justify-center">
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
            </div>
            <h3 className="text-xl font-bold text-center mb-2 text-blue-600">
              Create a Global Network
            </h3>
            <p className="text-gray-600 text-center">
              Forge alliances with industry peers to build innovative solutions.
            </p>
          </div>

          <div className="bg-gray-100 p-6 rounded-lg hover:shadow-lg transition-all duration-300">
            <div className="text-orange-500 mb-4 flex justify-center">
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
            </div>
            <h3 className="text-xl font-bold text-center mb-2 text-blue-600">
              Adopt an Innovation Mindset
            </h3>
            <p className="text-gray-600 text-center">
              We foster intrapreneurship and serve as a gateway for startups
              with our state-of-the-art initiatives.
            </p>
          </div>

          <div className="bg-gray-100 p-6 rounded-lg hover:shadow-lg transition-all duration-300">
            <div className="text-orange-500 mb-4 flex justify-center">
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
            </div>
            <h3 className="text-xl font-bold text-center mb-2 text-blue-600">
              Amplify Digital Transformation
            </h3>
            <p className="text-gray-600 text-center">
              Connect with innovative startups to transform your innovation
              model.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Corporate;
