import React from "react";
import { useTheme } from "../ThemeToggle/ThemeContext";

function PartnerCard({ imageUrl, altText }) {
  const { isDarkMode } = useTheme();

  return (
    <div
      className={`w-48 h-24 flex justify-center items-center rounded-lg shadow-md overflow-hidden p-4 ${
        isDarkMode ? "bg-gray-800" : "bg-white"
      }`}
    >
      <img
        src={imageUrl}
        alt={altText}
        className="max-w-full max-h-full object-contain"
        onError={(e) => (e.target.src = "https://via.placeholder.com/150")} // Fallback image
      />
    </div>
  );
}

export default PartnerCard;
