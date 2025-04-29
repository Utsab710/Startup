import React, { useState } from "react";
import {
  IoRocketOutline,
  IoCheckmarkCircleOutline,
  IoBarChartOutline,
  IoTrendingUpOutline,
  IoExitOutline,
} from "react-icons/io5";

function StartupStages({ isDarkMode }) {
  const [activeStage, setActiveStage] = useState(0);

  const stages = [
    {
      id: 0,
      title: "Ideation Stage",
      icon: <IoRocketOutline className="w-6 h-6" />,
      content:
        "At this stage, the founder has a business idea that needs to be transformed into a viable venture. This transformation doesn't require a large amount of capital. Instead, it's about shaping and validating the concept. In terms of funding, this is known as the Pre-seed stage. The initial funds typically come from personal savings, support from family and friends, or through business idea competitions and pitch events.",
    },
    {
      id: 1,
      title: "Validation Stage",
      icon: <IoCheckmarkCircleOutline className="w-6 h-6" />,
      content:
        "In the validation stage, the startup has developed a prototype of its product or service. The goal here is to test whether there is a real market need. Founders try to understand what kind of product or service the market wants, how customers interact with it, and what value it brings to them.This stage is crucial for market feedback and product validation. In funding terms, this is known as Seed funding. Capital can be raised from incubators, government grants or loans, angel investors, and crowdfunding platforms.",
    },
    {
      id: 2,
      title: "Early Traction Stage",
      icon: <IoBarChartOutline className="w-6 h-6" />,
      content:
        "By this point, the startup has launched its product or service commercially. The focus shifts to customer acquisition, market penetration, and proving the business model. As demand grows, so does the need for more capital.This stage is known as Series A funding, and capital sources may include venture capital firms, bank loans, or venture debt.",
    },
    {
      id: 3,
      title: "Scaling and Growth Stage",
      icon: <IoTrendingUpOutline className="w-6 h-6" />,
      content:
        "At this stage, the startup is gaining significant traction in the market. The business sees rapid growth in customer base and revenue. The focus now is on scaling operations, entering new markets, and strengthening the team and infrastructure.Funding during this phase typically involves Series B, C, D, or E rounds, with investments from venture capitalists and private equity firms.",
    },
    {
      id: 4,
      title: "Exit Options",
      icon: <IoExitOutline className="w-6 h-6" />,
      content:
        "When a startup reaches maturity, the founders may consider exiting the business. There are several exit strategies such as:Mergers and Acquisitions (M&A): Selling the company or merging with another company (either horizontally or vertically).Initial Public Offering (IPO): Listing the company on the stock exchange.Secondary Sales: Selling equity to venture capital or private equity firms.Buyback: Founders or existing shareholders repurchasing shares to regain full ownership, especially if they have enough capital from earlier rounds.",
    },
  ];

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
            Growth Pathway
          </span>
        </div>
        <h2
          className={`text-3xl font-bold ${
            isDarkMode ? "text-[#485eac]" : "text-[#485eac]"
          }`}
        >
          The{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-orange-400">
            Startup Journey
          </span>
        </h2>
        <p
          className={`mt-2 text-lg max-w-2xl mx-auto ${
            isDarkMode ? "text-gray-400" : "text-gray-600"
          }`}
        >
          Understand each phase of the startup lifecycle and what to expect
        </p>
      </div>

      <div
        className={`rounded-2xl p-8 shadow-lg transition-colors duration-300 ${
          isDarkMode ? "bg-gray-800" : "bg-white"
        }`}
      >
        {/* Tabs Navigation */}
        <div className="flex flex-wrap justify-center mb-8 gap-2">
          {stages.map((stage) => (
            <button
              key={stage.id}
              onClick={() => setActiveStage(stage.id)}
              className={`
                flex items-center gap-2 px-4 py-3 rounded-lg font-medium transition-all duration-300
                ${
                  activeStage === stage.id
                    ? isDarkMode
                      ? "bg-orange-700 text-white shadow-md"
                      : "bg-orange-500 text-white shadow-md"
                    : isDarkMode
                    ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }
              `}
            >
              <span className={activeStage === stage.id ? "text-white" : ""}>
                {stage.icon}
              </span>
              <span className="hidden md:inline">{stage.title}</span>
              <span className="md:hidden">{stage.id + 1}</span>
            </button>
          ))}
        </div>

        {/* Active Stage Content */}
        <div
          className={`
            p-6 rounded-xl transition-all duration-500 transform
            ${
              isDarkMode
                ? "bg-gray-700 text-gray-200"
                : "bg-orange-50 text-gray-800"
            }
          `}
        >
          <div className="flex items-center gap-4 mb-4">
            <div
              className={`
                rounded-full p-3 w-14 h-14 flex items-center justify-center
                ${
                  isDarkMode
                    ? "bg-gray-800 text-orange-400"
                    : "bg-white text-orange-600"
                }
              `}
            >
              {stages[activeStage].icon}
            </div>
            <h3 className="text-2xl font-bold">{stages[activeStage].title}</h3>
          </div>

          <div className="pl-4 border-l-4 border-orange-500">
            <p className="text-lg leading-relaxed">
              {stages[activeStage].content}
            </p>
          </div>

          <div className="mt-8 flex justify-between items-center">
            <button
              onClick={() =>
                setActiveStage((prev) =>
                  prev > 0 ? prev - 1 : stages.length - 1
                )
              }
              className={`
                flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-300
                ${
                  isDarkMode
                    ? "bg-gray-800 text-gray-300 hover:bg-gray-900"
                    : "bg-white text-gray-700 hover:bg-gray-100"
                }
              `}
              disabled={activeStage === 0}
            >
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
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Previous
            </button>

            <div className="flex gap-1">
              {stages.map((_, index) => (
                <div
                  key={index}
                  onClick={() => setActiveStage(index)}
                  className={`
                    w-3 h-3 rounded-full cursor-pointer transition-all duration-300
                    ${
                      activeStage === index
                        ? "bg-orange-500 scale-125"
                        : isDarkMode
                        ? "bg-gray-600 hover:bg-gray-500"
                        : "bg-gray-300 hover:bg-gray-400"
                    }
                  `}
                ></div>
              ))}
            </div>

            <button
              onClick={() =>
                setActiveStage((prev) =>
                  prev < stages.length - 1 ? prev + 1 : 0
                )
              }
              className={`
                flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-300
                ${
                  isDarkMode
                    ? "bg-gray-800 text-gray-300 hover:bg-gray-900"
                    : "bg-white text-gray-700 hover:bg-gray-100"
                }
              `}
              disabled={activeStage === stages.length - 1}
            >
              Next
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
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StartupStages;
