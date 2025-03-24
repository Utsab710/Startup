import React from "react";
import { motion } from "framer-motion";

const TestimonialCard = ({ quote, personName, companyInfo, imageSrc }) => {
  return (
    <motion.div
      className="flex bg-white rounded-xl shadow-lg overflow-hidden max-w-3xl p-8 mb-20 mt-20 ml-20"
      whileHover={{
        y: -5,
      }}
      transition={{ duration: 0.2 }}
    >
      {/* Image section */}
      <div className="bg-blue-50 w-1/3 max-w-xs flex-shrink-0">
        <img
          src={imageSrc}
          alt={personName || "Anonymous testimonial"}
          className="w-full h-full "
        />
      </div>
      {/* Content section */}
      <div className="p-6 flex flex-col justify-center w-2/3">
        {/* Quote mark */}
        <div className="text-blue-300 text-6xl font-serif mb-2 ">"</div>

        {/* Quote text */}
        <p className="text-gray-800 text-xl font-medium mb-4">{quote}</p>

        {/* Person info */}
        <div className="flex items-center">
          <p className="text-gray-800 font-semibold mr-2">
            {personName || "Anonymous"}
          </p>

          {companyInfo && (
            <>
              <span className="text-gray-400 mx-2">/</span>
              <p className="text-cyan-600">{companyInfo}</p>
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default TestimonialCard;
