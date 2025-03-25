import React from "react";
import WhyChooseUsImage from "../../Images/WhyChooseUs.svg";

function AboutUs() {
  return (
    <div className="p-10">
      <div>
        <h1 className="text-4xl font-bold mb-4 text-center m-20">
          <span className="text-gray-900 md:text-5xl mr-2  ">Why</span>
          <span className="gap-10 md:text-5xl bg-gradient-to-r from-orange-600 to-orange-400 bg-clip-text text-transparent">
            choose us
          </span>
        </h1>

        {/* Flex container to align text on the left and image on the right */}
        <div className="flex items-center justify-between">
          {/* Left side text */}
          <div className="text-gray-600 text-lg  leading-relaxed mb-6">
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
            <img src={WhyChooseUsImage} className="w-80 h-auto" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
