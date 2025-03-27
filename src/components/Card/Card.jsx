import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useTheme } from "../ThemeToggle/ThemeContext";

export default function Card({ img, title, description, button }) {
  const { isDarkMode } = useTheme();
  const ref = useRef(null);
  const isInView = useInView(ref, { triggerOnce: false, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 100 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 2, ease: "easeOut" }}
      className={`max-w-60 cursor-pointer rounded-lg shadow-lg overflow-hidden ${
        isDarkMode ? "bg-gray-800 text-gray-200" : "bg-white text-gray-900"
      }`}
      whileHover={{
        y: -5,
        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)",
      }}
    >
      <img className="w-full h-36 object-cover" src={img} alt={title} />

      <div
        className={`p-4 leading-relaxed mb-6 transition-colors duration-300 ${
          isDarkMode ? "text-gray-400" : "text-gray-700"
        }`}
      >
        <h2
          className={`text-lg font-semibold ${
            isDarkMode ? "text-white" : "text-black"
          } `}
        >
          {title}
        </h2>
        <p className="text-sm mt-2">{description}</p>
      </div>
      <div className="p-4">
        <button className="text-orange-500 cursor-pointer hover:underline text-sm">
          {button}
        </button>
      </div>
    </motion.div>
  );
}
