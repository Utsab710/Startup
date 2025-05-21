import React, { useEffect, useState, useContext } from "react";
import { IoPeopleOutline } from "react-icons/io5";
import axios from "axios";
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
import { AuthContext } from "../../Context/AuthContext";
import { useNavigate } from "react-router";
import Footer from "../Footer/Footer";

function Outlet() {
  const { isDarkMode } = useTheme();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [quotes, setQuotes] = useState([]);
  const [quotesLoading, setQuotesLoading] = useState(true);
  const [quotesError, setQuotesError] = useState(null);
  const [mentors, setMentors] = useState([]);
  const [mentorsLoading, setMentorsLoading] = useState(true);
  const [mentorsError, setMentorsError] = useState(null);

  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_RENDER}/api/quotes`
        );
        if (!response.ok) {
          const text = await response.text();

          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setQuotes(data);
      } catch (err) {
        console.error("Fetch quotes error:", err);
        setQuotesError(err.message);
      } finally {
        setQuotesLoading(false);
      }
    };
    fetchQuotes();
  }, []);

  useEffect(() => {
    const fetchMentors = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_RENDER}/api/mentor/`,
          {
            withCredentials: true, // Remove this if the route is truly public
          }
        );
        setMentors(response.data || []);
      } catch (err) {
        console.error("Fetch mentors error:", err);
        setMentorsError("Failed to load mentors. Please try again later.");
      } finally {
        setMentorsLoading(false);
      }
    };
    fetchMentors();
  }, []);

  const handleApplyNow = () => {
    if (!user) {
      navigate("/login", { state: { from: "/apply" } });
    } else {
      navigate("/apply");
    }
  };

  const handleSeeMentors = () => {
    navigate("/mentor");
  };
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
                className={`p-4 font-medium text-base tracking-wide transition-colors duration-300 ${
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
                onClick={handleApplyNow}
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
        {quotesLoading ? (
          <div className="text-center py-4">Loading testimonials...</div>
        ) : quotesError ? (
          <div className="text-center py-4 text-red-500">
            Error loading testimonials: {quotesError}
          </div>
        ) : quotes.length > 0 ? (
          <TestimonialCard
            quote={quotes[0].quotes}
            personName={quotes[0].person}
            companyInfo={quotes[0].companyName}
            imageSrc={quotes[0].imageUrl}
          />
        ) : (
          <div className="text-center py-4">No testimonials available</div>
        )}
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
          <h1 className={`text-3xl font-bold mr-2`}>
            <span
              className={` ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}
            >
              Our
            </span>{" "}
            <span
              className={`${isDarkMode ? "text-[#485eac]" : "text-[#485eac]"}`}
            >
              A2F
            </span>{" "}
            <span
              className={
                "bg-clip-text text-transparent bg-gradient-to-r from-orange-600 to-orange-400"
              }
            >
              Nexus
            </span>{" "}
            <span
              className={` ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}
            >
              Mentors
            </span>
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

        <div className="flex justify-center items-center gap-8 flex-wrap">
          {mentorsLoading ? (
            <p className="text-gray-500">Loading mentors...</p>
          ) : mentorsError ? (
            <p className="text-red-500">{mentorsError}</p>
          ) : mentors.length === 0 ? (
            <p className="text-gray-500">No mentors available at this time.</p>
          ) : (
            mentors.map((mentor) => (
              <MentorCard
                key={mentor._id}
                imageUrl={mentor.imageUrl}
                name={mentor.mentorName}
                title={mentor.mentorPosition}
                company={mentor.mentorCompany}
                linkedinUrl={mentor.linkedinUrl || "#"}
              />
            ))
          )}
        </div>
        <div className="flex justify-center mt-8">
          <button
            onClick={handleSeeMentors}
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
              cursor-pointer
              ${
                isDarkMode
                  ? "bg-orange-700 text-white hover:bg-orange-600"
                  : "bg-orange-500 text-white hover:bg-orange-600"
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
