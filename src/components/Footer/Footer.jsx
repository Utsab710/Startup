import React, { useEffect, useRef } from "react";
import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";
import { FaLinkedin, FaXTwitter } from "react-icons/fa6";
import A2F from "../../Images/A2F.png";
import { useTheme } from "../ThemeToggle/ThemeContext";

function Footer() {
  const canvasRef = useRef(null);
  const { isDarkMode } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    // Set canvas dimensions to match parent container
    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      if (!parent) return;

      // Set to actual pixel dimensions
      canvas.width = parent.offsetWidth;
      canvas.height = parent.offsetHeight;
    };

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    // Improved colors for the canvas
    const dots = [];
    const dotsCount = 80; // More dots for better effect

    // Define colors based on theme
    const primaryDotColor = isDarkMode
      ? "rgba(200, 220, 240, 0.5)" // Light blue for dark mode
      : "rgba(249, 115, 22, 0.4)"; // Orange (matching header) for light mode

    const secondaryDotColor = isDarkMode
      ? "rgba(160, 180, 210, 0.4)" // Lighter blue for dark mode
      : "rgba(100, 116, 139, 0.3)"; // Gray for light mode

    const primaryLineColor = isDarkMode
      ? "rgba(200, 220, 240, 0.2)" // Light blue lines for dark mode
      : "rgba(249, 115, 22, 0.2)"; // Orange lines for light mode

    const connectionDistance = 100; // Longer connection distance

    // Initialize dots with varied colors
    for (let i = 0; i < dotsCount; i++) {
      // Alternate between primary and secondary colors
      const dotColor = i % 2 === 0 ? primaryDotColor : secondaryDotColor;

      dots.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2.5 + 1.5, // Slightly varied sizes
        vx: (Math.random() - 0.5) * 0.5, // Slower for smoother effect
        vy: (Math.random() - 0.5) * 0.5, // Slower for smoother effect
        color: dotColor,
      });
    }

    // Animation function
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw dots
      dots.forEach((dot) => {
        // Move dots
        dot.x += dot.vx;
        dot.y += dot.vy;

        // Bounce from edges
        if (dot.x < 0 || dot.x > canvas.width) dot.vx = -dot.vx;
        if (dot.y < 0 || dot.y > canvas.height) dot.vy = -dot.vy;

        // Draw dot
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.radius, 0, Math.PI * 2);
        ctx.fillStyle = dot.color;
        ctx.fill();
      });

      // Connect dots with lines when they are close enough
      for (let i = 0; i < dots.length; i++) {
        for (let j = i + 1; j < dots.length; j++) {
          const dx = dots[i].x - dots[j].x;
          const dy = dots[i].y - dots[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < connectionDistance) {
            ctx.beginPath();
            ctx.moveTo(dots[i].x, dots[i].y);
            ctx.lineTo(dots[j].x, dots[j].y);
            ctx.strokeStyle = primaryLineColor;
            ctx.lineWidth = 0.8; // Thinner lines for a more delicate look
            ctx.globalAlpha = 1 - distance / connectionDistance;
            ctx.stroke();
            ctx.globalAlpha = 1;
          }
        }
      }

      requestAnimationFrame(animate);
    };

    // Start animation
    const animationId = requestAnimationFrame(animate);

    // Cleanup function
    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, [isDarkMode]);

  return (
    <div
      className={`relative flex justify-center items-center p-8 min-h-[400px] ${
        isDarkMode ? "bg-gray-900" : "bg-white"
      }`}
      // Add shadow on top side only to create separation like in the header
      style={{ boxShadow: "0px -2px 10px rgba(0, 0, 0, 0.1)" }}
    >
      {/* Canvas for animated background */}
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full"
        style={{ zIndex: 1, display: "block" }}
      />

      {/* Footer content with higher z-index */}
      <div className="flex w-full py-3 ml-4 relative z-10">
        {/* Image container */}
        <div className="w-[10%] p-2">
          <img src={A2F} className="w-[-20%] h-30" alt="Logo" />
        </div>

        {/* Text container */}
        <div
          className={`w-[40%] px-4 ${
            isDarkMode ? "text-gray-300" : "text-gray-700"
          }`}
        >
          <p>
            We're an innovative IT company providing tailored solutions in
            software development, web design, cybersecurity, cloud computing,
            and IT consulting.
          </p>
          <div className="flex gap-3 mt-5">
            {/* Social Media Icons with hover effect and links */}
            <div className="flex space-x-2">
              <a
                href="https://www.facebook.com/FoundationSoftech"
                target="_blank"
                rel="noopener noreferrer"
                className={`w-10 h-10 flex items-center justify-center rounded transition-colors duration-300 
                ${
                  isDarkMode
                    ? "bg-gray-700 hover:bg-gray-600"
                    : "bg-orange-500 hover:bg-orange-700"
                }`}
              >
                <FaFacebook size={20} className="text-white" />
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className={`w-10 h-10 flex items-center justify-center rounded transition-colors duration-300 
                ${
                  isDarkMode
                    ? "bg-gray-700 hover:bg-gray-600"
                    : "bg-orange-500 hover:bg-orange-700"
                }`}
              >
                <FaXTwitter size={20} className="text-white" />
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className={`w-10 h-10 flex items-center justify-center rounded transition-colors duration-300 
                ${
                  isDarkMode
                    ? "bg-gray-700 hover:bg-gray-600"
                    : "bg-orange-500 hover:bg-orange-700"
                }`}
              >
                <FaLinkedin size={20} className="text-white" />
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className={`w-10 h-10 flex items-center justify-center rounded transition-colors duration-300 
                ${
                  isDarkMode
                    ? "bg-gray-700 hover:bg-gray-600"
                    : "bg-orange-500 hover:bg-orange-700"
                }`}
              >
                <FaYoutube size={20} className="text-white" />
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className={`w-10 h-10 flex items-center justify-center rounded transition-colors duration-300 
                ${
                  isDarkMode
                    ? "bg-gray-700 hover:bg-gray-600"
                    : "bg-orange-500 hover:bg-orange-700"
                }`}
              >
                <FaInstagram size={20} className="text-white" />
              </a>
            </div>
          </div>

          <img
            src="https://softechfoundation.com/assets/site/images/ISO-cirlcle.png"
            className="w-[-30%] h-18 mt-6"
            alt="Logo"
          />
          <p>ISO 9001:2015 </p>
          <p>Certified Since 2018</p>
        </div>

        {/* About links container */}
        <div
          className={`w-[20%] px-4 ${
            isDarkMode ? "text-gray-300" : "text-gray-700"
          }`}
        >
          <ul>
            <h1 className="text-2xl font-semibold">About us</h1>
            <div className="cursor-pointer">
              <li>Company</li>
              <li>Award</li>
              <li>Careers</li>
              <li>Startup</li>
              <li>Programs</li>
            </div>
          </ul>
        </div>

        {/* Innovation links container */}
        <div
          className={`w-[20%] px-4 ${
            isDarkMode ? "text-gray-300" : "text-gray-700"
          }`}
        >
          <ul>
            <h1 className="text-2xl font-semibold">Innovation</h1>
            <div className="cursor-pointer">
              <li>Corporate</li>
              <li>Government</li>
              <li>Value Partners</li>
              <li>Client</li>
            </div>
          </ul>
        </div>
      </div>
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 pb-3">
        <p
          className={`text-center ${
            isDarkMode ? "text-gray-300" : "text-gray-700"
          }`}
        >
          Copyright © 2023 Softech Foundation Pvt. Ltd
        </p>
      </div>
    </div>
  );
}

export default Footer;
