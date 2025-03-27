import React from "react";
import WhyChooseUsImage from "../../Images/WhyChooseUs.svg";
import { useTheme } from "../ThemeToggle/ThemeContext";
import Card from "../Card/Card";

function AboutUs({}) {
  const { isDarkMode } = useTheme();

  return (
    <div
      className={`p-10 transition-colors duration-300 ${
        isDarkMode ? "bg-gray-900 text-gray-200" : "bg-white text-gray-900"
      }`}
    >
      <div>
        <h1
          className={`text-4xl font-bold mb-4 text-center m-20 transition-colors duration-300 ${
            isDarkMode ? "text-gray-100" : "text-gray-900"
          }`}
        >
          <span className="mr-2">Why</span>
          <span className="bg-gradient-to-r from-orange-600 to-orange-400 bg-clip-text text-transparent">
            choose us
          </span>
        </h1>

        {/* Flex container to align text on the left and image on the right */}
        <div className="flex items-center justify-between">
          {/* Left side text */}
          <div
            className={`text-lg leading-relaxed mb-6 transition-colors duration-300 ${
              isDarkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            <p>
              In an innovative, quick, and effective way. Because we are
              digitally awesome! Softech Foundation started its operations in
              2007 with an aim to develop a single-stop solution hub for the
              entire information technology requirements of modern
              organizations. With technologically advanced products and
              services, Softech Foundation is well-known as one of the leading
              software development companies and solution providers serving
              clients across the globe.
            </p>
          </div>

          {/* Right side image */}
          <div className="w-1/2 flex justify-end pr-10 translate-x-[-60]">
            <img
              src={WhyChooseUsImage}
              className="w-80 h-auto"
              alt="Why Choose Us"
            />
          </div>
        </div>
      </div>
      <div className="flex gap-4 justify-center mt-20">
        <Card
          img="https://visagetechnologies.com/app/uploads/2023/01/visage.blog_websize-27-1024x682.webp"
          title="Academia"
          description="We help nurture an innovative mindset within academic institutions"
          button="Read More"
        />
        <Card
          img="https://visagetechnologies.com/app/uploads/2023/01/visage.blog_websize-27-1024x682.webp"
          title="Startups"
          description="We create launchpads for disruptive ventures and game-changing ideas."
          button="Read More"
        />
        <Card
          img="https://visagetechnologies.com/app/uploads/2023/01/visage.blog_websize-27-1024x682.webp"
          title="Corporates & International"
          description="We propel growth by establishing connections with corporates and cultivating international partnerships."
          button="Read More"
        />
        <Card
          img="https://visagetechnologies.com/app/uploads/2023/01/visage.blog_websize-27-1024x682.webp"
          title="Government"
          description="We support public-sector transformation through pioneering solutions and collaborations."
          button="Read More"
        />
      </div>
    </div>
  );
}

export default AboutUs;
