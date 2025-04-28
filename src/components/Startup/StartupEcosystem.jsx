import React from "react";
import {
  IoSchoolOutline,
  IoBusinessOutline,
  IoSettingsOutline,
  IoCashOutline,
} from "react-icons/io5";
import A2F from "../../Images/A2F.png";

function StartupEcosystem({ isDarkMode }) {
  const ecosystemSections = [
    {
      id: 1,
      title: "LEARNING & DEVELOPMENT",
      icon: <IoSchoolOutline className="w-8 h-8" />,
      color: "blue",
      items: [
        "TRAINING/MENTORING",
        "CERTIFICATIONS",
        "SKILL DEVELOPMENT PROGRAM",
        "EDUCATION INSTITUTIONS",
      ],
    },
    {
      id: 2,
      title: "GROWTH RESOURCES",
      icon: <IoBusinessOutline className="w-8 h-8" />, // Fixed the h-5 to h-8 for consistency
      color: "blue",
      items: ["INCUBATION", "CO-WORKERS SPACES", "ACCELERATORS"],
    },
    {
      id: 3,
      title: "SUPPORT, REGULATION",
      icon: <IoSettingsOutline className="w-8 h-8" />,
      color: "orange",
      items: [
        "GOVERNMENT & AGENCIES",
        "INTERNATIONAL ORGANIZATION",
        "FOUNDER/CO-FOUNDERS",
      ],
    },
    {
      id: 4,
      title: "FUNDING SOURCES",
      icon: <IoCashOutline className="w-8 h-8" />,
      color: "orange",
      items: ["3F's", "VCs", "ANGEL INVESTORS", "BFIs"],
    },
  ];

  const getIconBgColor = (color, isDark) => {
    const colorMap = {
      blue: isDark ? "bg-blue-800" : "bg-blue-100",
      orange: isDark ? "bg-orange-800" : "bg-orange-100",
    };
    return colorMap[color] || (isDark ? "bg-gray-800" : "bg-gray-100");
  };

  const getIconTextColor = (color, isDark) => {
    const colorMap = {
      blue: isDark ? "text-[#485eac]" : "text-[#485eac]",
      orange: isDark ? "text-orange-300" : "text-orange-600",
    };
    return colorMap[color] || (isDark ? "text-gray-300" : "text-gray-600");
  };

  const getTitleColor = (color) => {
    const colorMap = {
      blue: "text-[#485eac]",
      orange: "text-orange-600",
    };
    return colorMap[color] || "text-gray-600";
  };

  return (
    <div className="mt-24 px-4 md:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <div
          className={`inline-block rounded-full p-2 mb-2 transition-colors duration-300 ${
            isDarkMode ? "bg-gray-800" : "bg-orange-50"
          }`}
        >
          <span
            className={`font-medium text-base p-3 tracking-wide transition-colors duration-300 ${
              isDarkMode ? "text-orange-400" : "text-orange-600"
            }`}
          >
            Startup Ecosystem
          </span>
        </div>
        <h2
          className={`text-3xl font-bold ${
            isDarkMode ? "text-[#485eac]" : "text-[#485eac]"
          }`}
        >
          The{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-orange-400">
            Startup Nexus
          </span>
        </h2>
        <p
          className={`mt-2 text-lg max-w-2xl mx-auto ${
            isDarkMode ? "text-gray-400" : "text-gray-600"
          }`}
        >
          AI-powered matching to connect you with the resources you need
        </p>
      </div>

      <div
        className={`
          relative 
          rounded-2xl 
          p-8 
          shadow-lg 
          transition-colors 
          duration-300 
          overflow-hidden
          ${isDarkMode ? "bg-gray-800" : "bg-white"}
        `}
      >
        {/* Central Logo and Title */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div
            className={`
            w-55
            h-55 
            rounded-full 
            bg-white 
            shadow-lg 
            flex 
            flex-col 
            items-center 
            justify-center 
            z-10
            border-4
            mt-25
            ${isDarkMode ? "border-gray-700" : "border-gray-100"}
          `}
          >
            <div className="w-32 h-32 relative">
              <img src={A2F} alt="A2F Logo" />
            </div>
            <div className="text-center ">
              <p className="text-sm text-orange-600 font-medium">
                AI BASED MATCHING
              </p>
            </div>
          </div>
        </div>

        <div className="text-center mb-8">
          <h3
            className={`text-xl font-bold ${
              isDarkMode ? "text-[#485eac]" : "text-[#485eac]"
            }`}
          >
            NEXUS OF STARTUP ECOSYSTEM
          </h3>
        </div>

        {/* Ecosystem Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 py-5">
          {ecosystemSections.map((section) => (
            <div
              key={section.id}
              className={`
              relative 
              rounded-xl 
              p-6 
              border-2 
              transition-all 
              duration-300
              ${
                isDarkMode
                  ? "bg-gray-700 border-gray-600"
                  : "bg-white border-gray-200"
              }
              // Removed the conditional mt-10 styling that was causing the issue
            `}
            >
              {/* Icon */}
              <div
                className={`
                absolute 
                -top-6 
                left-1/2 
                transform 
                -translate-x-1/2 
                rounded-full 
                p-3 
                w-12 
                h-12 
                flex 
                items-center 
                justify-center
                ${getIconBgColor(section.color, isDarkMode)}
                ${getIconTextColor(section.color, isDarkMode)}
                shadow-lg
              `}
              >
                {section.icon}
              </div>

              {/* Content */}
              <div className="pt-6">
                <h3
                  className={`
                  text-xl 
                  font-bold 
                  mb-4 
                  text-center
                  ${getTitleColor(section.color)}
                `}
                >
                  {section.title}
                </h3>

                <ul className="space-y-3">
                  {section.items.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span
                        className={`
                        text-lg 
                        font-bold 
                        ${isDarkMode ? "text-[#485eac]" : "text-[#485eac]"}
                      `}
                      >
                        •
                      </span>
                      <span
                        className={
                          isDarkMode ? "text-gray-300" : "text-gray-700"
                        }
                      >
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default StartupEcosystem;
