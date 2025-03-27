import React, { useRef, useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { useTheme } from "../ThemeToggle/ThemeContext";

function ClientSection() {
  const { isDarkMode } = useTheme();
  const sectionRef = useRef(null);
  const controlsHeader = useAnimation();
  const controlsLogos = useAnimation();

  // Track whether the section has been animated
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            // Animate header
            controlsHeader.start({
              opacity: 1,
              y: 0,
              transition: { duration: 0.5 },
            });

            // Animate logos
            controlsLogos.start("visible");

            // Mark as animated to prevent repeated animations
            setHasAnimated(true);
          }
        });
      },
      {
        threshold: 0.1, // Trigger when 10% of the component is visible
        once: false, // Allow multiple triggers if needed
      }
    );

    const currentRef = sectionRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [controlsHeader, controlsLogos, hasAnimated]);

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

  // Animation variants for logos entering from left
  const logoVariants = {
    hidden: { opacity: 0, x: -100 },
    visible: (index) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: index * 0.2, // Staggered entrance
        duration: 0.5,
        type: "spring", // Adds a slight bounce effect
        stiffness: 120,
      },
    }),
  };

  return (
    <div
      ref={sectionRef}
      className={`relative w-full py-16 mt-0 transition-colors duration-300 ${
        isDarkMode
          ? "bg-gray-900"
          : "bg-gradient-to-r from-orange-100 to-orange-50"
      }`}
    >
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className={`w-full h-full transition-colors duration-300 ${
            isDarkMode
              ? "bg-gradient-to-r from-gray-800 to-gray-900"
              : "bg-gradient-to-r from-orange-100 to-orange-50"
          }`}
        >
          {[...Array(10)].map((_, i) => (
            <motion.div
              key={i}
              className={`absolute rounded-full opacity-20 transition-colors duration-300 ${
                isDarkMode ? "bg-gray-700" : "bg-orange-600"
              }`}
              style={{
                width: 20 + i * 10,
                height: 20 + i * 10,
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
          <motion.h2
            initial={{ opacity: 0, y: -50 }}
            animate={controlsHeader}
            className={`text-4xl font-bold mb-4 transition-colors duration-300 ${
              isDarkMode ? "text-gray-100" : "text-gray-900"
            }`}
          >
            <span className="mr-2">Our</span>
            <span className="bg-gradient-to-r from-orange-600 to-orange-400 bg-clip-text text-transparent">
              Top Clients
            </span>
          </motion.h2>
        </div>

        {/* Logo grid with scroll-triggered entrance animation */}
        <motion.div
          initial="hidden"
          animate={controlsLogos}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.2,
              },
            },
          }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 cursor-pointer"
        >
          {clientLogos.map((logo, index) => (
            <motion.div
              key={logo.id}
              custom={index}
              variants={logoVariants}
              className={`rounded-lg shadow-md p-4 flex items-center justify-center h-24 transition-all duration-300 ${
                isDarkMode
                  ? "bg-gray-800 hover:bg-gray-700"
                  : "bg-white hover:bg-gray-50"
              }`}
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
        </motion.div>
      </div>
    </div>
  );
}

export default ClientSection;
