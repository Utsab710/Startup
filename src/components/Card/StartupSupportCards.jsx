import React from "react";
import { useTheme } from "../ThemeToggle/ThemeContext";

const HoverCard = ({ title, description, bgImage }) => {
  const { isDarkMode } = useTheme();

  return (
    <div
      className={`
        relative w-full max-w-sm p-6 rounded-lg shadow-md transition-all duration-300 group
        ${isDarkMode ? "bg-gray-800 text-gray-200" : "bg-white text-gray-900"}
        hover:border-2 hover:border-red-500 hover:shadow-lg
      `}
      style={{
        backgroundImage: "none", // Ensure no background image by default
      }}
    >
      {/* Background image div that appears on hover */}
      <div
        className={`
          absolute inset-0 bg-cover bg-center transition-opacity duration-300
          opacity-0 group-hover:opacity-100
        `}
        style={{
          backgroundImage: `url(${bgImage})`,
        }}
      ></div>

      {/* Gray overlay that appears on hover */}
      <div
        className={`
          absolute inset-0 bg-gray-900 transition-opacity duration-300
          opacity-0 group-hover:opacity-50
        `}
      ></div>

      {/* Dotted border in top-left corner on hover */}
      <div className="absolute top-3 left-3 w-8 h-8 border-t-2 border-l-2 border-dotted border-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

      {/* Card content */}
      <div className="relative z-10">
        <h3
          className={`
            text-xl font-semibold mb-3 transition-colors duration-300
            ${
              isDarkMode
                ? "text-gray-100 group-hover:text-white"
                : "text-gray-800 group-hover:text-white"
            }
          `}
        >
          {title}
        </h3>
        <p
          className={`
            leading-relaxed mb-6 transition-colors duration-300
            ${
              isDarkMode
                ? "text-gray-400 group-hover:text-white"
                : "text-gray-600 group-hover:text-white"
            }
          `}
        >
          {description}
        </p>
      </div>

      {/* Plus icon */}
      <div className="absolute bottom-5 right-5 text-2xl text-red-500 z-10">
        +
      </div>
    </div>
  );
};

const StartupSupportCards = () => {
  const { isDarkMode } = useTheme();

  const cardData = [
    {
      title: "Startup Support",
      description:
        "Startup growth support, technical support, providing assistance in business plan, business model generation, business planning and more.",
      bgImage:
        "https://img.freepik.com/free-photo/startup-business-progress-strategy-enterprise_53876-127927.jpg", // Replace with your image URL
    },
    {
      title: "Incubation",
      description:
        "Incubation through investing, connecting to the investors, providing the expert coaching and expose to ensure the growth of ideas into business.",
      bgImage:
        "https://www.microsoft.com/en-us/research/wp-content/uploads/2021/04/iStock-1091738564-1024x757.jpg", // Replace with your image URL
    },
    {
      title: "Coaching & Mentorship",
      description:
        "Mentoring to grow and to understand the fundamental DO & DON'Ts. Making them follow the right path and making business progress.",
      bgImage:
        "https://www.pureblueocean.com/app/uploads/2022/02/Coaching-vs.-Mentoring.png", // Replace with your image URL
    },
    {
      title: "Fund Matching",
      description:
        "Help to find the potential that drives the customers to your product, finding the right people/companies willing to invest in your startups.",
      bgImage:
        "https://www.axisbank.com/images/default-source/progress-with-us_new/fund-of-fund.jpg", // Replace with your image URL
    },
    {
      title: "Business Plan Support",
      description:
        "Tasks and processes to develop and implement the growth of the startups. Supporting the business plan implementation, identification of the steps to ensure sustainability.",
      bgImage:
        "https://www.score.org/sites/default/files/styles/responsive_16_9_750w/public/d7_migration/37/mentoring_8.jpg?itok=Eylq_9N_", // Replace with your image URL
    },
    {
      title: "Event & Seminar",
      description:
        "Startup training, seminar, motivational programs that can teach, uplift and broaden the startups.",
      bgImage:
        "https://groco.com/wp-content/uploads/2021/02/seminar-planning.jpg", // Replace with your image URL
    },
  ];

  return (
    <div className="py-12 px-2 sm:px-4">
      <div className="text-center mb-10">
        <h2
          className={`
            text-4xl font-bold mb-4
            ${isDarkMode ? "text-gray-100" : "text-gray-900"}
          `}
        >
          What We Do
        </h2>
        <div className="w-12 h-1 bg-red-500 mx-auto"></div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {cardData.map((card, index) => (
          <HoverCard
            key={index}
            title={card.title}
            description={card.description}
            bgImage={card.bgImage}
          />
        ))}
      </div>
    </div>
  );
};

export default StartupSupportCards;
