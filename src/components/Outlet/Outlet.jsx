import React from "react";
import { IoPeopleOutline } from "react-icons/io5";
import ClientSection from "./ClientSection";
import TestimonialCard from "../Card/TestimonialCard";
import AboutUs from "../About/AboutUs";
import EventCard from "./EventCard";
import { useTheme } from "../ThemeToggle/ThemeContext";
import OurImpact from "./OurImpact";
import StartupSupportCards from "../Card/StartupSupportCards";
import MentorCard from "../Card/MentorCard";
import PartnerSection from "./PartnerSection";
import ContactUs from "../ContactUs/ContactUs";

function Outlet() {
  const { isDarkMode } = useTheme();

  return (
    <div
      className={`w-full min-h-screen mx-auto overflow-hidden transition-colors duration-300 ${
        isDarkMode ? "bg-gray-900 text-gray-200" : "bg-white text-gray-900"
      }`}
    >
      <div className="px-2 sm:px-4">
        <div className="flex flex-col md:flex-row gap-8 items-center p-8">
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
                Empowering Entrepreneurs
              </span>
            </div>
            <h1
              className={`text-5xl md:text-6xl font-black leading-tight transition-colors duration-300 ${
                isDarkMode ? "text-[#485eac]" : "text-[#485eac]"
              }`}
            >
              Fuel Your
              <span
                className={`block text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-orange-400`}
              >
                Startup Dream
              </span>
            </h1>
            <p
              className={`text-lg max-w-md leading-relaxed transition-colors duration-300 ${
                isDarkMode ? "text-gray-400" : "text-gray-600"
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
                transition-all 
                duration-300 
                shadow-lg 
                hover:shadow-xl
                ${
                  isDarkMode
                    ? "bg-orange-700 text-white hover:bg-orange-600"
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
              transition-colors
              duration-300
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
          imageSrc="https://hips.hearstapps.com/hmg-prod/images/mark-zuckerberg-ceo-of-meta-testifies-before-the-senate-news-photo-1739998545.pjpeg?crop=0.553xw:0.827xh;0.283xw,0&resize=640:*"
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
      <OurImpact />
      <StartupSupportCards />
      <div className="px-2 sm:px-4 py-12">
        <div className="text-center mb-8">
          <h1 className={`text-3xl font-bold `}>
            Our{" "}
            <span
              className={`${isDarkMode ? "text-[#485eac]" : "text-[#485eac]"}`}
            >
              A2F
            </span>{" "}
            <span
              className={
                "bg-clip-text text-transparent bg-gradient-to-r from-orange-600 to-orange-400 "
              }
            >
              Nexus
            </span>
            <span className="gap-2"> Mentors</span>
          </h1>
          <p
            className={`mt-2 text-lg max-w-2xl mx-auto ${
              isDarkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Build a business efficiently through video conferences, office
            hours, and material reviews from a roster of top startup mentors.
          </p>
        </div>

        {/* Grid of Mentor Cards */}
        <div className="flex justify-center items-center gap-8">
          <MentorCard
            imageUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQp3nz8zX1g3phNGrwzPJZNpzJdKMeUpHid7g&s" // Replace with actual image URL
            name="Mark"
            title="Co-Founder of Facebook"
            company="Facebook"
            linkedinUrl="https://www.linkedin.com/in/shifat-adnan"
          />
          <MentorCard
            imageUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5Nqg0ghEtpMiAq4KNVry-vu2NAjH0FPrjsw&s" // Replace with actual image URL
            name="jensen huang"
            title="Co-Founder & CEO"
            company="Nvdia"
            linkedinUrl="https://www.linkedin.com/in/jane-smith"
          />
          <MentorCard
            imageUrl="https://variety.com/wp-content/uploads/2023/11/Elon-Musk.jpg?w=1000&h=667&crop=1" // Replace with actual image URL
            name="Elon Musk"
            title="Starlink of Engineering"
            company="Starlink"
            linkedinUrl="https://www.linkedin.com/in/john-doe"
          />
        </div>
        <div className="flex justify-center mt-8">
          <button
            className={`
                px-8 
                py-3 
                rounded-lg 
                text-white 
                font-semibold 
                transition-all 
                duration-300 
                shadow-lg 
                hover:shadow-xl
                ${
                  isDarkMode
                    ? "bg-orange-700 hover:bg-orange-800"
                    : "bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700"
                }
              `}
          >
            See all Mentors
          </button>
        </div>
      </div>
      <PartnerSection />
      <ContactUs />
    </div>
  );
}

export default Outlet;
