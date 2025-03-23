import React, { useState } from "react";
import Dropdown from "./Dropdown";
import { CiLogin } from "react-icons/ci";

// NavItem component for reusable navigation items
const NavItem = ({ text, hasDropdown = false, dropdownItems = [] }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="flex cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative group">
        <div className="cursor-pointer flex justify-center items-center">
          <h1
            className={
              hovered ? "text-cyan-600 cursor-pointer" : "cursor-pointer"
            }
          >
            {text}
          </h1>
          {hasDropdown && <Dropdown />}
        </div>

        {/* Dropdown Menu - Only render if there are dropdown items */}
        {dropdownItems.length > 0 && (
          <div className="absolute left-0 mt-2 w-40 bg-white shadow-md rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
            <ul className="py-2">
              {dropdownItems.map((item, index) => (
                <li
                  key={index}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

function Header() {
  // Navigation items data
  const navItems = [
    {
      text: "About",
      hasDropdown: true,
      dropdownItems: ["Our Team", "Mission", "Vision"],
    },
    {
      text: "Corporate",
    },
    {
      text: "Government",
    },
    {
      text: "Review",
    },
    {
      text: "Internship",
      hasDropdown: true,
      dropdownItems: ["Frontend", "Backend", "Fullstack", "Others"],
    },
    {
      text: "Event",
      hasDropdown: true,
      dropdownItems: ["StartupProgram", "GovernmentProgram"],
    },
    {
      text: "Contact",
    },
  ];

  return (
    <div>
      <section>
        <div className="flex w-full py-3 bg-white shadow-md">
          <div className="ml-4">
            <img
              src="https://softechfoundation.com/upload_file/setting/1711949002_1167325993_1536148958_384808185_logo.png"
              className="w-full p-2 size-12"
            />
          </div>
          <div className="flex ml-9 justify-center gap-8 items-center">
            {navItems.map((item, index) => (
              <NavItem
                key={index}
                text={item.text}
                hasDropdown={item.hasDropdown}
                dropdownItems={item.dropdownItems || []}
              />
            ))}
          </div>
          <div className="cursor-pointer ml-auto flex items-center mr-10">
            <button className="bg-cyan-600 text-white font-semibold px-3 py-2 rounded-lg shadow-md hover:bg-cyan-700 transition duration-300">
              <div className="flex">
                Login
                <div className="flex items-center">
                  <CiLogin size={20} />
                </div>
              </div>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Header;
