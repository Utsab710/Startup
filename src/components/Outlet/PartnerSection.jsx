import React from "react";
import { useTheme } from "../ThemeToggle/ThemeContext";
import PartnerCard from "../Card/PartnerCard";
import leapFrog from "../../Images/leapFrog.png";

function PartnerSection() {
  const { isDarkMode } = useTheme();

  // Sample partner data (replace with actual image URLs)
  const partners = [
    {
      imageUrl:
        "https://softechfoundation.com/upload_file/setting/1711949002_1167325993_1536148958_384808185_logo.png", // Replace with actual image URL
      altText: "rootquotient logo",
    },
    {
      imageUrl:
        "https://kidzeeboudha.com/upload_file/setting/1682063117_2081341107_1678178763_1099064495_kidzee-logo.png", // Replace with actual image URL
      altText: "every. logo",
    },
    {
      imageUrl:
        "https://pub-e63b17b4d990438a83af58c15949f8a2.r2.dev/type/hooks.png", // Replace with actual image URL
      altText: "every. logo",
    },

    {
      imageUrl: leapFrog, // Replace with actual image URL
      altText: "LOYAL logo",
    },
    {
      imageUrl:
        "https://pub-e63b17b4d990438a83af58c15949f8a2.r2.dev/type/uilogos.png", // Replace with actual image URL
      altText: "every. logo",
    },

    {
      imageUrl:
        "https://pub-e63b17b4d990438a83af58c15949f8a2.r2.dev/type/ideaa.png", // Replace with actual image URL
      altText: "every. logo",
    },
  ];

  return (
    <div className="px-2 sm:px-4 py-12">
      <div className="text-center mb-8">
        <h1
          className={`text-3xl font-bold ${
            isDarkMode ? "text-gray-100" : "text-gray-900"
          }`}
        >
          <span className="text-[#485eac]   bg-clip-text  ">A2F</span>
          <span
            className={` ${
              isDarkMode ? "text-gray-400" : "text-gray-600"
            } gap-2`}
          >
            {" "}
            Partners
          </span>
        </h1>
        <p
          className={`mt-2 text-lg max-w-2xl mx-auto ${
            isDarkMode ? "text-gray-400" : "text-gray-600"
          }`}
        >
          Get special deals and support worth over $3 million from top support
          organizations and partners.
        </p>
      </div>

      {/* Grid of Partner Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-items-center">
        {partners.map((partner, index) => (
          <PartnerCard
            key={index}
            imageUrl={partner.imageUrl}
            altText={partner.altText}
          />
        ))}
      </div>
    </div>
  );
}

export default PartnerSection;
