import React, { useState } from "react";

const EventCard = ({ events }) => {
  const [activeIndex, setActiveIndex] = useState(null);

  // Sample events if none provided
  const defaultEvents = [
    {
      title: "Ask an Investor Anything: Q&A with Christian Karrer",
      date: "Mar 25, 2025",
      time: "05:45am +0545",
      type: "investor",
    },
    {
      title: "Founder Institute Online Information Session",
      date: "Various Times",
      time: "Various Times",
      type: "info",
    },
    {
      title: "Startup Pitch Practice: Share Your Idea and Get Expert Feedback",
      date: "Mar 27, 2025",
      time: "05:45am +0545",
      type: "pitch",
    },
    {
      title: "Beyond Launch: How to Measure and Strengthen Product Adoption",
      date: "Mar 31, 2025",
      time: "10:45pm +0545",
      type: "product",
    },
  ];

  const displayEvents = events || defaultEvents;

  // Function to get event type color
  const getEventColor = (type) => {
    const colors = {
      investor: "bg-blue-500",
      info: "bg-purple-500",
      pitch: "bg-green-500",
      product: "bg-orange-500",
      default: "bg-gray-500",
    };
    return colors[type] || colors.default;
  };

  return (
    <div className="relative w-full py-16">
      {/* Full-width background */}
      <div className="absolute inset-0 "></div>

      {/* Content container */}
      <div className="relative z-10 max-w-6xl mx-auto p-8">
        <div className="flex flex-col md:flex-row gap-6 w-full">
          {/* Left side */}
          <div className="w-full md:w-2/5 bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-3xl font-bold mb-2">
              Join a <span className="text-orange-600">Free Startup Event</span>
            </h2>
            <p className="text-gray-700 mb-6">
              We exist to help founders, so we run nearly 1000 free startup
              events per year where you can meet local entrepreneurs, network
              with investors, learn from advisors, and connect with co-founders.
            </p>

            <div className="relative w-full h-64 mt-20 rounded-lg overflow-hidden">
              <img
                src="https://www.starternoise.com/wp-content/uploads/2014/04/networking-event.jpg"
                alt="Startup networking event"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 text-white p-4">
                <p className="text-lg">
                  100% free events to get direction for your startup
                </p>
              </div>
            </div>
          </div>

          {/* Right side - Event cards */}
          <div className="w-full md:w-3/5">
            {displayEvents.map((event, index) => (
              <div
                key={index}
                className={`bg-white rounded-lg shadow-md mb-4 p-4 transition-all duration-300 transform hover:scale-102 relative min-h-[120px]`}
                onMouseEnter={() => setActiveIndex(index)}
                onMouseLeave={() => setActiveIndex(null)}
              >
                <div className="flex items-start">
                  <div
                    className={`w-3 h-3 rounded-full mt-2 mr-3 ${getEventColor(
                      event.type
                    )} transition-all duration-300 ${
                      activeIndex === index ? "animate-pulse w-4 h-4" : ""
                    }`}
                  ></div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                    <div className="flex items-center mt-2 text-gray-600 text-sm">
                      <svg
                        className="w-4 h-4 mr-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        ></path>
                      </svg>
                      <span>{event.date}</span>

                      <svg
                        className="w-4 h-4 ml-4 mr-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        ></path>
                      </svg>
                      <span>{event.time}</span>
                    </div>
                  </div>
                </div>

                {/* Reserve space for the button */}
                <div
                  className={`mt-3 border-t pt-2 transition-opacity duration-300 ${
                    activeIndex === index ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <button className="text-sm text-orange-600 hover:text-orange-800 font-medium">
                    Register for this event →
                  </button>
                </div>
              </div>
            ))}

            <button className="bg-orange-600 hover:bg-orange-700 text-white w-full rounded-lg py-3 px-4 mt-2 flex items-center justify-between transition-all duration-300">
              <div className="flex items-center">
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  ></path>
                </svg>
                See more events
              </div>
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
