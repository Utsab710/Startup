import React from "react";
import { IoPeopleOutline } from "react-icons/io5";
import ClientSection from "./ClientSection";
import TestimonialCard from "../Card/TestimonialCard";
import AboutUs from "../About/AboutUs";
import EventCard from "./EventCard";
import { useTheme } from "../ThemeToggle/ThemeContext";

function Outlet() {
  const { isDarkMode } = useTheme();

  return (
    <div
      className={`w-full min-h-screen mx-auto overflow-hidden ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-white text-black"
      }`}
    >
      <div className="px-2 sm:px-4">
        <div className="flex flex-col md:flex-row gap-8 items-center p-8">
          <div className="md:w-1/2 space-y-6">
            <div
              className={`inline-block rounded-full p-2 ${
                isDarkMode ? "bg-gray-800" : "bg-orange-50"
              }`}
            >
              <span
                className={`font-medium text-sm tracking-wide ${
                  isDarkMode ? "text-orange-400" : "text-orange-600"
                }`}
              >
                Empowering Entrepreneurs
              </span>
            </div>
            <h1
              className={`text-5xl md:text-6xl font-black leading-tight ${
                isDarkMode ? "text-white" : "text-gray-900"
              }`}
            >
              Fuel Your
              <span
                className={`block text-transparent bg-clip-text ${
                  isDarkMode
                    ? "bg-gradient-to-r from-orange-500 to-orange-700"
                    : "bg-gradient-to-r from-orange-500 to-orange-700"
                }`}
              >
                Startup Dream
              </span>
            </h1>
            <p
              className={`text-lg max-w-md leading-relaxed ${
                isDarkMode ? "text-gray-300" : "text-gray-600"
              }`}
            >
              We transform bold ideas into breakthrough businesses, providing
              innovative founders with the capital, mentorship, and network to
              turn vision into reality.
            </p>
            <div className="flex items-center gap-4">
              <button
                className={`
                flex 
                items-center 
                gap-2 
                px-6 
                py-3 
                rounded-lg 
                font-bold 
                transition-colors 
                duration-300 
                shadow-lg 
                hover:shadow-xl
                ${
                  isDarkMode
                    ? "bg-orange-600 text-white hover:bg-orange-700"
                    : "bg-orange-500 text-white hover:bg-orange-600"
                }
              `}
              >
                <IoPeopleOutline className="w-5 h-5" />
                Apply Now
              </button>
              <a
                href="#learn-more"
                className={`
                  font-semibold 
                  transition-colors 
                  flex 
                  items-center 
                  gap-2
                  ${
                    isDarkMode
                      ? "text-orange-400 hover:text-orange-500"
                      : "text-orange-600 hover:text-orange-700"
                  }
                `}
              >
                Learn More
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
              absolute 
              -top-10 
              -right-10 
              w-72 
              h-72 
              rounded-full 
              blur-2xl 
              opacity-50
              ${isDarkMode ? "bg-gray-800" : "bg-orange-100"}
            `}
            ></div>
            <img
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              className="
                relative 
                w-full 
                h-auto 
                rounded-2xl 
                shadow-2xl 
                z-10 
                mt-5
                object-cover
              "
              alt="Startup Team Working Together"
            />
          </div>
        </div>
      </div>

      <div>
        <TestimonialCard
          quote="The real question is: can the Founder Institute be game-changing for your business? The answer is yes. Without FI, Udemy may have never raised any money."
          personName="John Doe"
          companyInfo="Company Name (Details, 2023)"
          imageSrc="https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Unknown_person.jpg/1200px-Unknown_person.jpg"
        />
      </div>

      <div>
        <AboutUs />
      </div>

      <div>
        <ClientSection />
      </div>

      <div className="px-2 sm:px-4">
        <EventCard />
      </div>
    </div>
  );
}

export default Outlet;
