import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useTheme } from "../ThemeToggle/ThemeContext";

const OurImpact = () => {
  const { isDarkMode } = useTheme();
  // Metrics data
  const metricsData = [
    { icon: "👥", value: 2000, label: "Actively Engaging Startups" },
    {
      icon: "💰",
      value: 1.94,
      label: "Funding Raised (Billions)",
      isDecimal: true,
    },
    { icon: "📋", value: 100, label: "Programs" },
    { icon: "🤝", value: 100, label: "Value Partners" },
    { icon: "📅", value: 1000, label: "Events" },
    { icon: "🏢", value: 110, label: "Corporate Engagements" },
    { icon: "🌐", value: 400, label: "International Connects" },
    { icon: "👥", value: 200, label: "Mentors" },
  ];

  // State to track animated values
  const [animatedValues, setAnimatedValues] = useState(
    metricsData.map(() => 0)
  );

  // Animation effect
  useEffect(() => {
    const animationDuration = 2000; // Total animation time in ms
    const intervals = metricsData.map((metric, index) => {
      const startTime = Date.now();

      return setInterval(() => {
        const progress = (Date.now() - startTime) / animationDuration;
        if (progress <= 1) {
          const newValue = metric.value * progress;
          setAnimatedValues((prev) => {
            const updated = [...prev];
            updated[index] = newValue;
            return updated;
          });
        } else {
          clearInterval(intervals[index]);
          setAnimatedValues((prev) => {
            const updated = [...prev];
            updated[index] = metric.value;
            return updated;
          });
        }
      }, 16); // ~60 fps
    });

    return () => intervals.forEach(clearInterval);
  }, []);

  return (
    <div
      className={`relative overflow-hidden  ${
        isDarkMode
          ? "bg-gray-900"
          : "bg-gradient-to-br from-orange-50 to-orange-100"
      }`}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            initial={{
              x: Math.random() * window.innerWidth,
              y: -100,
              scale: Math.random() * 2,
              opacity: Math.random(),
            }}
            animate={{
              y: window.innerHeight + 100,
              rotate: Math.random() * 360,
              transition: {
                duration: 10 + Math.random() * 20,
                repeat: Infinity,
                ease: "linear",
              },
            }}
            className="absolute w-2 h-2 bg-orange-300 rounded-full"
          />
        ))}
      </div>

      <div className="relative container mx-auto px-2 py-14">
        <h1
          className={`text-4xl font-bold mt-2 text-center m-20 transition-colors duration-300 ${
            isDarkMode ? "text-gray-100" : "text-gray-900"
          }`}
        >
          <span className="mr-2">Our Impact on</span>
          <span className="bg-gradient-to-r from-orange-600 to-orange-400 bg-clip-text text-transparent">
            The Innovation Ecosystem
          </span>
        </h1>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {metricsData.map((metric, index) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className={`backdrop-blur-sm rounded-xl p-6 text-center shadow-lg ${
                isDarkMode
                  ? "bg-gray-800 text-gray-200"
                  : "bg-white text-gray-900"
              }`}
            >
              <div className="text-4xl mb-2">{metric.icon}</div>
              <div className="text-3xl font-bold text-orange-700">
                {metric.isDecimal
                  ? `$${animatedValues[index].toFixed(2)}B`
                  : Math.floor(animatedValues[index]).toLocaleString()}
              </div>
              <div
                className={`${
                  isDarkMode ? " text-white" : " text-gray-600"
                }text-sm  mt-2`}
              >
                {metric.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OurImpact;
