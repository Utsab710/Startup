import React, { useEffect, useState } from "react";
import axios from "axios";
import { useTheme } from "../ThemeToggle/ThemeContext";

function ClientSection() {
  const { isDarkMode } = useTheme();
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [animationComplete, setAnimationComplete] = useState([]);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";
        const { data } = await axios.get(`${API_URL}/api/clients/allClient`);
        if (Array.isArray(data)) {
          setClients(data);
          setAnimationComplete(new Array(data.length).fill(false));
        } else {
          throw new Error("Invalid data format");
        }
      } catch (err) {
        setError(`Failed to load clients: ${err.message}`);
        setClients([]);
      } finally {
        setLoading(false);
      }
    };

    fetchClients();
  }, []);

  // Staggered animation effect
  useEffect(() => {
    if (clients.length > 0 && !loading) {
      const animationTimers = clients.map((_, index) => {
        return setTimeout(() => {
          setAnimationComplete((prev) => {
            const newState = [...prev];
            newState[index] = true;
            return newState;
          });
        }, 120 * index);
      });

      return () => {
        animationTimers.forEach((timer) => clearTimeout(timer));
      };
    }
  }, [clients, loading]);

  const sectionBg = isDarkMode
    ? "bg-gray-900"
    : "bg-gradient-to-r from-orange-100 to-orange-50";
  const textColor = isDarkMode ? "text-gray-100" : "text-gray-900";
  const cardBg = isDarkMode ? "bg-gray-800" : "bg-white";

  return (
    <section
      className={`w-full py-20 ${sectionBg} transition-colors duration-300 overflow-hidden relative`}
    >
      {/* Animated Background Blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-8 left-8 w-16 h-16 rounded-full bg-orange-200 opacity-60 animate-pulse"></div>
        <div className="absolute top-24 left-48 w-24 h-24 rounded-full bg-orange-200 opacity-50 animate-blob"></div>
        <div className="absolute top-64 left-20 w-32 h-32 rounded-full bg-orange-200 opacity-40 animate-blob animation-delay-2000"></div>
        <div className="absolute top-10 right-32 w-20 h-20 rounded-full bg-orange-200 opacity-30 animate-blob animation-delay-4000"></div>
        <div className="absolute bottom-12 right-12 w-32 h-32 rounded-full bg-orange-200 opacity-50 animate-pulse animation-delay-2000"></div>
        <div className="absolute bottom-40 right-64 w-16 h-16 rounded-full bg-orange-200 opacity-40 animate-blob animation-delay-4000"></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <div className="text-center mb-14">
          <h2 className={`text-4xl font-bold ${textColor}`}>
            <span className="text-[#485eac]">Our </span>
            <span className="text-orange-500">Top Clients</span>
          </h2>
        </div>

        {loading ? (
          <p className={`text-center ${textColor}`}>Loading clients...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : clients.length === 0 ? (
          <p className={`text-center ${textColor}`}>No clients available.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {clients.map((client, index) => (
              <div
                key={client._id || index}
                className={`${cardBg} rounded-lg shadow-md h-32 flex items-center justify-center px-8
                  ${
                    animationComplete[index]
                      ? "translate-x-0 opacity-100"
                      : "-translate-x-full opacity-0"
                  }
                  transition-all duration-700 ease-out`}
              >
                <div className="w-full h-16 flex items-center justify-center">
                  <img
                    src={client.imageUrl || "/api/placeholder/160/80"}
                    alt={client.name || "Client Logo"}
                    className="max-h-16 w-auto max-w-full object-contain"
                    onError={(e) => {
                      e.target.src = "/api/placeholder/160/80";
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Adding animation utility classes in a style tag */}
      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </section>
  );
}

export default ClientSection;
