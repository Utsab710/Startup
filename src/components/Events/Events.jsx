import { useState, useEffect, useRef } from "react";
import { useTheme } from "../ThemeToggle/ThemeContext";
import { motion, useInView } from "framer-motion";
import axios from "axios";
import { useAuth } from "../../Context/AuthContext"; // Import the auth context

// Reusable Event Card Component
const EventCard = ({ event, isDarkMode }) => {
  // Function to format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Return appropriate icon based on event type
  const renderEventIcon = (type) => {
    switch (type) {
      case "investor":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8"
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
        );
      case "info":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        );
      case "pitch":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"
            />
          </svg>
        );
      case "product":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
            />
          </svg>
        );
      default:
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        );
    }
  };

  return (
    <motion.div
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
        {renderEventIcon(event.type)}
      </div>
      <div className="flex-grow">
        <h3
          className={`text-xl font-bold mb-2 ${
            isDarkMode ? "text-white" : "text-gray-900"
          }`}
        >
          {event.title}
        </h3>
        <div
          className={`mb-3 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}
        >
          <div className="flex items-center gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <span>{formatDate(event.date)}</span>
          </div>
          <div className="flex items-center gap-1 mt-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>{event.time}</span>
          </div>
        </div>
        <p className={`mb-4 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
          {event.description}
        </p>
      </div>
      <div className="mt-auto pt-4">
        <button
          className={`w-full py-3 rounded-lg font-medium transition-all duration-300 ${
            isDarkMode
              ? "bg-gray-700 text-orange-400 hover:bg-gray-600"
              : "bg-orange-50 text-orange-600 hover:bg-orange-100"
          }`}
          aria-label={`Register for ${event.title} event`}
        >
          Register Now
        </button>
      </div>
    </motion.div>
  );
};

// Events Component
function Events() {
  const { isDarkMode } = useTheme();
  const { user } = useAuth(); // Get the authenticated user
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Ref for animation triggers
  const eventsSectionRef = useRef(null);
  const eventsInView = useInView(eventsSectionRef, {
    once: true,
    amount: 0.3,
  });

  // Fetch events on component mount
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        // Use the same pattern as in your AuthContext for API calls
        const response = await axios.get(`${process.env.RENDER}/api/events`, {
          withCredentials: true,
        });
        setEvents(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch events:", err);
        setError("Failed to load events. Please try again later.");
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // Sample events data in case API fails
  const sampleEvents = [
    {
      _id: "1",
      title: "Investor Meetup",
      date: new Date(),
      time: "14:00 - 16:00",
      type: "investor",
      description:
        "Connect with potential investors and showcase your startup ideas.",
    },
    {
      _id: "2",
      title: "Product Demo Day",
      date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
      time: "10:00 - 12:00",
      type: "product",
      description:
        "Showcase your product and get feedback from industry experts.",
    },
    {
      _id: "3",
      title: "Info Session: Startup Funding",
      date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 14 days from now
      time: "18:30 - 20:00",
      type: "info",
      description:
        "Learn about various funding options available for early-stage startups.",
    },
  ];

  // Use sample data if there's an error or no events
  const displayEvents = events.length > 0 ? events : error ? sampleEvents : [];

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
                className={`font-medium text-base tracking-wide p-2 transition-colors duration-300 ${
                  isDarkMode ? "text-orange-400" : "text-orange-600"
                }`}
              >
                <span
                  className={`${
                    isDarkMode ? "text-[#3b5998]" : "text-[#3b5998]"
                  }`}
                >
                  {" "}
                  A2F
                </span>{" "}
                Nexus Events
              </span>
            </div>
            <h1
              className={`text-4xl md:text-5xl font-black leading-tight transition-colors duration-300 ${
                isDarkMode ? "text-[#3b5998]" : "text-[#3b5998]"
              }`}
            >
              Upcoming
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-orange-400">
                Community Events
              </span>
            </h1>
            <p
              className={`text-lg max-w-md leading-relaxed transition-colors duration-300 ${
                isDarkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Stay connected with our community through informative sessions,
              networking opportunities, and showcase events.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <a
                href="#events-list"
                className={`font-semibold transition-colors flex items-center gap-2 ${
                  isDarkMode
                    ? "text-orange-400 hover:text-orange-500"
                    : "text-orange-600 hover:text-orange-700"
                }`}
                aria-label="Explore upcoming events"
              >
                Explore Events
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
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
              src="https://imgs.search.brave.com/p3cz0o2HvPNhsq2hjf8jZshvp35dfzdbWxf1xAOx8Zo/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMuc3F1YXJlc3Bh/Y2UtY2RuLmNvbS9j/b250ZW50L3YxLzVm/ZGJhNDBiYWY5YmY4/NmM4M2JjZGEyNS85/OGNlODkzZi0zZDFm/LTQ3YmUtYTY0MS0y/ZTE4NWUxOTdiYTUv/MTI1OC1NQzNfNDk1/NS1taWNoYWVsYS1q/b3ktcGhvdG9ncmFw/aHktcGFsYW50aXIt/YWl4Y29uMy1ldmVu/dF93ZWJzaXplLmpw/Zw"
              className="relative w-full h-auto rounded-2xl shadow-2xl z-10"
              alt="A2F Nexus community events"
              loading="lazy"
            />
          </div>
        </div>
      </div>

      {/* Events List Section */}
      <div
        id="events-list"
        ref={eventsSectionRef}
        className="mt-24 px-4 md:px-8 max-w-7xl mx-auto"
      >
        <div className="text-center mb-12">
          <h2
            className={`text-3xl font-bold ${
              isDarkMode ? "text-[#3b5998]" : "text-[#3b5998]"
            }`}
          >
            Upcoming{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-orange-400">
              Events
            </span>
          </h2>
          <p
            className={`mt-2 text-lg max-w-2xl mx-auto ${
              isDarkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Join us for these exciting opportunities to learn, network, and grow
            with the A2F Nexus community.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <div
              className={`animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 ${
                isDarkMode ? "border-orange-400" : "border-orange-600"
              }`}
            ></div>
          </div>
        ) : error && displayEvents.length === 0 ? (
          <div
            className={`text-center py-12 ${
              isDarkMode ? "text-red-400" : "text-red-600"
            }`}
          >
            {error}
          </div>
        ) : displayEvents.length === 0 ? (
          <div
            className={`text-center py-12 ${
              isDarkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            No upcoming events at the moment. Check back soon!
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayEvents.map((event, index) => (
              <motion.div
                key={event._id}
                initial={{ opacity: 0, y: 30 }}
                animate={
                  eventsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
                }
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <EventCard event={event} isDarkMode={isDarkMode} />
              </motion.div>
            ))}
          </div>
        )}

        {/* Admin action button - only shown to admin users */}
        {user && user.isAdmin && (
          <div className="mt-12 text-center">
            <button
              className={`px-6 py-3 rounded-lg font-bold transition-all duration-300 shadow-lg hover:shadow-xl ${
                isDarkMode
                  ? "bg-blue-700 text-white hover:bg-blue-600"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
              aria-label="Add new event"
            >
              Add New Event
            </button>
          </div>
        )}
      </div>

      {/* Call to Action Section */}
      <div
        className={`mt-24 px-4 md:px-8 max-w-7xl mx-auto py-16 rounded-2xl transition-colors duration-300 ${
          isDarkMode ? "bg-gray-800" : "bg-orange-50"
        }`}
      >
        <div className="text-center">
          <h2
            className={`text-3xl font-bold ${
              isDarkMode ? "text-[#3b5998]" : "text-[#3b5998]"
            }`}
          >
            Can't Find What{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-orange-400">
              You're Looking For?
            </span>
          </h2>
          <p
            className={`mt-4 text-lg max-w-2xl mx-auto ${
              isDarkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Subscribe to our newsletter to stay updated with future events and
            announcements.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className={`flex-1 px-4 py-3 rounded-lg transition-colors duration-300 ${
                isDarkMode
                  ? "bg-gray-700 text-white border-gray-600"
                  : "bg-white text-gray-800 border-gray-300"
              } border focus:outline-none focus:ring-2 focus:ring-orange-500`}
            />
            <button
              className={`px-6 py-3 rounded-lg font-bold transition-all duration-300 shadow-lg hover:shadow-xl ${
                isDarkMode
                  ? "bg-orange-700 text-white hover:bg-orange-600"
                  : "bg-orange-500 text-white hover:bg-orange-600"
              }`}
            >
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Events;
