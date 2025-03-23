import React, { useEffect, useRef } from "react";
import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";
import { FaLinkedin, FaXTwitter } from "react-icons/fa6";

function Footer() {
  const canvasRef = useRef(null);

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

    // Dots configuration - increasing visibility
    const dots = [];
    const dotsCount = 60; // More dots
    const dotColor = "rgba(240, 240, 240, 0.6)"; // More visible blue color
    const lineColor = "rgba(240, 240, 240, 0.3)"; // More visible line color
    const connectionDistance = 80; // Longer connection distance

    // Initialize dots
    for (let i = 0; i < dotsCount; i++) {
      dots.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 3 + 2, // Bigger dots
        vx: (Math.random() - 0.5) * 0.7, // Slightly slower
        vy: (Math.random() - 0.5) * 0.7, // Slightly slower
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
        ctx.fillStyle = dotColor;
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
            ctx.strokeStyle = lineColor;
            ctx.lineWidth = 1; // Thicker lines
            // Make lines more transparent the further apart dots are
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
  }, []);

  return (
    <div className="relative bg-gray-800 flex justify-center items-center p-8 min-h-[300px]">
      {/* Canvas for animated background - explicitly set to cover full container */}
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full"
        style={{ zIndex: 1, display: "block" }}
      />

      {/* Original footer content with higher z-index */}
      <div className="flex w-full py-3 ml-4 relative z-10">
        {/* Image container takes 20% width */}
        <div className="w-[10%] p-2">
          <img
            src="https://softechfoundation.com/upload_file/setting/1711949002_1167325993_1536148958_384808185_logo.png"
            className="w-[-20%] h-8"
            alt="Logo"
          />
        </div>

        {/* Text container takes 40% width */}
        <div className="w-[40%] px-4 text-white">
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
                className="w-10 h-10 bg-gray-700 flex items-center justify-center rounded transition-colors duration-300 hover:bg-blue-600"
              >
                <FaFacebook size={20} className="text-white" />
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-700 flex items-center justify-center rounded transition-colors duration-300 hover:bg-blue-600"
              >
                <FaXTwitter size={20} className="text-white" />
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-700 flex items-center justify-center rounded transition-colors duration-300 hover:bg-blue-600"
              >
                <FaLinkedin size={20} className="text-white" />
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-700 flex items-center justify-center rounded transition-colors duration-300 hover:bg-blue-600"
              >
                <FaYoutube size={20} className="text-white" />
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-700 flex items-center justify-center rounded transition-colors duration-300 hover:bg-blue-600"
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

        {/* Links container takes 20% width */}
        <div className="w-[20%] px-4 text-white">
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

        {/* Innovation links container takes 20% width */}
        <div className="w-[20%] px-4 text-white">
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
        <p className="text-white text-center">
          Copyright © 2023 Softech Foundation Pvt. Ltd
        </p>
      </div>
    </div>
  );
}

export default Footer;
