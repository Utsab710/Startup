import React, { useState, useEffect } from "react";
import { useTheme } from "../ThemeToggle/ThemeContext";
import PartnerCard from "../Card/PartnerCard";

function PartnerSection() {
  const { isDarkMode } = useTheme();
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch partners from the backend
  useEffect(() => {
    const fetchPartners = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/partners/all");
        if (!response.ok) {
          throw new Error("Failed to fetch partners");
        }
        const data = await response.json();
        setPartners(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchPartners();
  }, []); // Empty dependency array to run once on mount

  // Render loading state
  if (loading) {
    return (
      <div className="px-2 sm:px-4 py-12 text-center">
        <p
          className={`text-lg ${
            isDarkMode ? "text-gray-400" : "text-gray-600"
          }`}
        >
          Loading partners...
        </p>
      </div>
    );
  }

  // Render error state
  if (error) {
    return (
      <div className="px-2 sm:px-4 py-12 text-center">
        <p
          className={`text-lg ${isDarkMode ? "text-red-400" : "text-red-600"}`}
        >
          Error: {error}
        </p>
      </div>
    );
  }

  return (
    <div className="px-2 sm:px-4 py-12">
      <div className="text-center mb-8">
        <h1
          className={`text-3xl font-bold ${
            isDarkMode ? "text-gray-100" : "text-gray-900"
          }`}
        >
          <span className="text-[#485eac] bg-clip-text">A2F</span>
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
          Get special deals and supporttip support worth over $3 million from
          top support organizations and partners.
        </p>
      </div>

      {/* Grid of Partner Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-items-center">
        {partners.map((partner) => (
          <PartnerCard
            key={partner._id}
            imageUrl={partner.imageUrl}
            altText={`${partner.name} logo`}
          />
        ))}
      </div>
    </div>
  );
}

export default PartnerSection;
