import React from "react";
import { IoMdPerson } from "react-icons/io";
import { IoPeopleOutline } from "react-icons/io5";
import ClientSection from "./ClientSection";
import TestimonialCard from "../Card/TestimonialCard";

function Outlet() {
  return (
    <div className="relative mt-8 z-10">
      {" "}
      {/* Added mt-8 for top margin */}
      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-1/2 p-12">
          <h1 className="text-gray-900 text-8xl font-extrabold tracking-tight dark:text-blue-300 leading-none">
            <span className="bg-gradient-to-r from-blue-600/75 to-cyan-500 bg-clip-text text-transparent">
              Startup
            </span>
            <br />
            <span className="text-7xl font-bold">Funding</span>
          </h1>
          <p className="mt-4 text-xl text-gray-600 max-w-md">
            Supporting innovators with the resources they need to transform
            ideas into reality.
          </p>
          <div className="py-2 flex">
            <button className="flex bg-blue-400 text-white cursor-pointer rounded-lg px-5 py-2 font-semibold hover:bg-cyan-700 transition-all duration-300">
              <div className="flex items-center">
                <IoPeopleOutline />
              </div>
              Apply Now
            </button>
          </div>
        </div>
        <div className="md:w-1/2">
          <img
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            className="w-full h-auto rounded-lg shadow-xl"
            alt="Startup Team Working Together"
          />
        </div>
      </div>
      {/* Added margin-bottom to create space before "Our Top Clients" */}
      <div className="mt-16">
        <ClientSection />
      </div>
      <TestimonialCard
        quote="The real question is: can the Founder Institute be game-changing for your business? The answer is yes. Without FI, Udemy may have never raised any money."
        personName="John Doe"
        companyInfo="Company Name (Details, 2023)"
        imageSrc="https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Unknown_person.jpg/1200px-Unknown_person.jpg"
      />
    </div>
  );
}

export default Outlet;
