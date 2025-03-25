import React from "react";
import { motion } from "framer-motion";

function ClientSection() {
  // Sample logos - replace with your actual logo URLs
  const clientLogos = [
    {
      id: 1,
      url: "https://softechfoundation.com/upload_file/client/1737614585_351480205_12.JPG",
      alt: "Client 1",
    },
    {
      id: 2,
      url: "https://softechfoundation.com/upload_file/client/1737614674_1329676966_14.JPG",
      alt: "Client 2",
    },
    {
      id: 3,
      url: "https://softechfoundation.com/upload_file/client/1737614522_2103232768_11.JPG",
      alt: "Client 3",
    },
    {
      id: 4,
      url: "https://softechfoundation.com/upload_file/client/1737614451_1238945212_9.JPG",
      alt: "Client 4",
    },
    {
      id: 5,
      url: "https://softechfoundation.com/upload_file/client/1737614370_540575905_8.JPG",
      alt: "Client 5",
    },
    {
      id: 6,
      url: "https://www.louisbergerinternational.com/_nuxt/img/wsp-logo.abcf762.svg",
      alt: "Client 6",
    },
    {
      id: 7,
      url: "https://softechfoundation.com/upload_file/client/1737614201_621298607_6.JPG",
      alt: "Client 7",
    },
    {
      id: 8,
      url: "https://softechfoundation.com/upload_file/client/1737614014_1156570740_4.JPG",
      alt: "Client 8",
    },
  ];

  return (
    <div className="relative w-full py-16 mt-0">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="w-full h-full bg-gradient-to-r from-blue-100 to-blue-50">
          {[...Array(10)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute bg-blue-200 rounded-full opacity-20"
              style={{
                width: 50 + i * 10,
                height: 50 + i * 10,
                left: `${(i * 10) % 100}%`,
                top: `${(i * 8) % 100}%`,
              }}
              animate={{
                x: [0, 50],
                y: [0, 30],
              }}
              transition={{
                duration: 10 + i,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4">
        {/* Header with gradient */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
              Our Top Clients
            </span>
          </h2>
        </div>

        {/* Logo grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 cursor-pointer">
          {clientLogos.map((logo) => (
            <motion.div
              key={logo.id}
              className="bg-white rounded-lg shadow-md p-4 flex items-center justify-center h-24"
              whileHover={{
                y: -5,
              }}
              transition={{ duration: 0.2 }}
            >
              <img
                src={logo.url}
                alt={logo.alt}
                className="max-h-16 max-w-full object-contain"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ClientSection;
