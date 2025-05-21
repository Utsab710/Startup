import React, { useState, useEffect } from "react";
import { useTheme } from "../ThemeToggle/ThemeContext";
import { Link } from "react-router-dom";

const API_URL = "https://a2f-backend.onrender.com";

const EventCard = ({ events: propEvents }) => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [registeredEvents, setRegisteredEvents] = useState(new Set());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [events, setEvents] = useState([]); // State for fetched events
  const { isDarkMode } = useTheme();

  // Fetch events on mount
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(`${API_URL}/api/events`);
        const data = await response.json();
        if (response.ok) {
          // Sort events by date (most recent first) and take only the first 3
          const sortedEvents = [...data]
            .sort((a, b) => {
              return new Date(b.date) - new Date(a.date);
            })
            .slice(0, 3);
          setEvents(sortedEvents);
        } else {
          setError("Failed to fetch events");
        }
      } catch (err) {
        console.error("Error fetching events:", err);
        setError("Failed to load events");
      }
    };

    fetchEvents();
  }, []);

  // Fetch user's registrations
  useEffect(() => {
    const fetchRegistrations = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const response = await fetch(
          `${API_URL}/api/registrations/my-registrations`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();
        if (response.ok) {
          const eventIds = new Set(data.map((reg) => reg.event._id.toString()));
          setRegisteredEvents(eventIds);
        }
      } catch (err) {
        console.error("Error fetching registrations:", err);
      }
    };

    fetchRegistrations();
  }, []);

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

  const handleRegister = async (eventId) => {
    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Please login to register for events");
        setLoading(false);
        return;
      }

      const response = await fetch(`${API_URL}/api/registrations/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ eventId }),
      });

      const data = await response.json();

      if (response.ok) {
        setRegisteredEvents((prev) => new Set([...prev, eventId]));
        alert("Successfully registered for the event!");
      } else {
        setError(data.message || "Registration failed");
        alert(`Registration failed: ${data.message}`);
      }
    } catch (error) {
      console.error("Error registering for event:", error);
      setError("Failed to connect to server. Please try again later.");
      alert("Failed to register. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const displayEvents = propEvents || events;

  return (
    <div
      className={`relative w-full py-16 transition-colors duration-300 ${
        isDarkMode ? "bg-gray-900" : "bg-white"
      }`}
    >
      <div className="relative z-10 max-w-6xl mx-auto p-8">
        {error && (
          <div className="mb-4 p-4 bg-red-100 text-red-700 rounded">
            {error}
          </div>
        )}
        <div className="flex flex-col md:flex-row gap-6 w-full">
          <div
            className={`w-full md:w-2/5 p-6 rounded-lg shadow-md transition-colors duration-300 ${
              isDarkMode
                ? "bg-gray-800 text-gray-200"
                : "bg-white text-gray-900"
            }`}
          >
            <h2 className="text-3xl font-bold mb-2">
              Join a <span className="text-orange-600">Free Startup Event</span>
            </h2>
            <p
              className={`leading-relaxed mb-6 transition-colors duration-300 ${
                isDarkMode ? "text-gray-400" : "text-gray-700"
              }`}
            >
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

          <div className="w-full md:w-3/5">
            {displayEvents.length === 0 ? (
              <p>Loading events...</p>
            ) : (
              displayEvents.map((event, index) => (
                <div
                  key={event._id || index}
                  className={`rounded-lg shadow-md mb-4 p-4 transition-all duration-300 transform hover:scale-102 relative min-h-[120px] ${
                    isDarkMode
                      ? "bg-gray-800 text-gray-200 hover:bg-gray-700"
                      : "bg-white text-gray-900 hover:bg-gray-50"
                  }`}
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
                      <div
                        className={`flex items-center mt-2 text-sm transition-colors duration-300 ${
                          isDarkMode ? "text-gray-400" : "text-gray-600"
                        }`}
                      >
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

                  <div
                    className={`mt-3 border-t pt-2 transition-opacity duration-300 ${
                      activeIndex === index ? "opacity-100" : "opacity-0"
                    } ${isDarkMode ? "border-gray-700" : "border-gray-200"}`}
                  >
                    <button
                      onClick={() => handleRegister(event._id)}
                      disabled={loading || registeredEvents.has(event._id)}
                      className={`text-sm font-medium transition-colors duration-300 ${
                        registeredEvents.has(event._id)
                          ? "text-gray-500 cursor-not-allowed"
                          : loading
                          ? "text-gray-500 cursor-wait"
                          : isDarkMode
                          ? "text-orange-400 hover:text-orange-500"
                          : "text-orange-600 hover:text-orange-700"
                      }`}
                    >
                      {loading
                        ? "Registering..."
                        : registeredEvents.has(event._id)
                        ? "Already Registered"
                        : "Register for this event →"}
                    </button>
                  </div>
                </div>
              ))
            )}

            <button
              className={`w-full rounded-lg py-3 px-4 mt-2 flex items-center justify-between transition-all duration-300 ${
                isDarkMode
                  ? "bg-orange-700 text-white hover:bg-orange-600"
                  : "bg-orange-600 text-white hover:bg-orange-700"
              }`}
            >
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

            {/* Consultation Card Below See More Events Button */}
            <div
              className={`mt-4 rounded-lg shadow-lg ${
                isDarkMode ? "bg-gray-800" : "bg-white"
              } p-5`}
            >
              <h3 className="text-xl font-medium mb-2">
                Get a{" "}
                <span
                  className={`${
                    isDarkMode ? "text-orange-600" : "text-orange-600"
                  } font-bold`}
                >
                  FREE consultation
                </span>
              </h3>
              <p
                className={`${
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                } mb-4`}
              >
                on how outsourcing can benefit your business
              </p>
              <Link to="/contactus">
                <button
                  className="cursor-pointer text-white font-medium py-2 px-4 rounded-full flex items-center justify-between w-full"
                  style={{
                    backgroundColor: "#3b5998",
                    transition: "background-color 0.3s",
                  }}
                  onMouseOver={(e) =>
                    (e.currentTarget.style.backgroundColor = "#2d4373")
                  }
                  onMouseOut={(e) =>
                    (e.currentTarget.style.backgroundColor = "#3b5998")
                  }
                >
                  Contact Us Now
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
