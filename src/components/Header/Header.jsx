import React, { useState } from "react";
import Dropdown from "./Dropdown";
import { CiLogin } from "react-icons/ci";

function Header() {
  const [activeItem, setActiveItem] = useState(null);
  const [hoveredItem, setHoveredItem] = useState(null);

  const navItems = [
    {
      id: "about",
      text: "About",
      hasDropdown: true,
      dropdownItems: ["Our Team", "Mission", "Vision"],
    },
    {
      id: "corporate",
      text: "Corporate",
    },
    {
      id: "government",
      text: "Government",
    },
    {
      id: "review",
      text: "Review",
    },
    {
      id: "internship",
      text: "Internship",
      hasDropdown: true,
      dropdownItems: ["Frontend", "Backend", "Fullstack", "Others"],
    },
    {
      id: "event",
      text: "Event",
      hasDropdown: true,
      dropdownItems: ["StartupProgram", "GovernmentProgram"],
    },
    {
      id: "contact",
      text: "Contact",
    },
  ];

  // NavItem component for reusable navigation items
  const NavItem = ({ id, text, hasDropdown = false, dropdownItems = [] }) => {
    const isActive = activeItem === id;
    const isHovered = hoveredItem === id;

    return (
      <div
        className={`relative flex cursor-pointer rounded-md transition-all duration-200 ${
          isActive
            ? "bg-blue-500/75 text-white shadow-lg"
            : isHovered
            ? "bg-cyan-50 text-cyan-600"
            : "bg-transparent text-gray-700"
        }`}
        onMouseEnter={() => setHoveredItem(id)}
        onMouseLeave={() => setHoveredItem(null)}
        onClick={() => setActiveItem(id)}
      >
        <div className="flex justify-center items-center py-2 px-4">
          <h1
            className={`font-semibold ${
              isActive
                ? "text-white" // Active item: white text on cyan background
                : isHovered
                ? "text-cyan-600" // Hovered item: cyan text
                : "text-gray-700" // Default item: gray text
            }`}
          >
            {text}
          </h1>
        </div>

        {/* Dropdown Menu - Only render if there are dropdown items */}
        {hasDropdown && dropdownItems.length > 0 && isHovered && (
          <div
            className="absolute left-0 top-full z-50 w-40 text-black bg-white shadow-md rounded-lg opacity-100 visible transition-all duration-300"
            onMouseEnter={() => setHoveredItem(id)} // Keep the hover state when mouse enters dropdown
            onMouseLeave={() => setHoveredItem(null)}
          >
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

        <div className="flex justify-center items-center ">
          {hasDropdown && dropdownItems.length > 0 && (
            <div className="ml-[-15px]">
              <Dropdown />
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div>
      <section className="mb-16">
        {" "}
        {/* Added mb-8 for bottom margin */}
        <div className="flex w-full py-3 bg-white shadow-md h-16">
          <div className="ml-4 flex items-center h-full">
            <img
              src="https://scontent.fktm8-1.fna.fbcdn.net/v/t39.30808-6/463342823_122143508534301285_8203473577064132249_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=nzqfjOCX15cQ7kNvgHGEhFN&_nc_oc=Adn0V3uOKJ01HZmtnd5IQDW_CQMtcVvvoWMbjz9hHRy4rktU40DtYkzyBhT7H_fYtTNH4l0VY-wFW9s-udjmscFB&_nc_zt=23&_nc_ht=scontent.fktm8-1.fna&_nc_gid=9KOKDZoTuOTZprTiRcldnA&oh=00_AYHgtbmayHM1P2VRu_UtqR3rRv7-mkC_TPPPqZr1OplbNA&oe=67E82A76"
              className="h-14 w-auto object-contain"
              alt="Logo"
            />
          </div>
          <div className="flex ml-9 justify-center gap-8 items-center">
            {navItems.map((item) => (
              <NavItem
                key={item.id}
                id={item.id}
                text={item.text}
                hasDropdown={item.hasDropdown}
                dropdownItems={item.dropdownItems || []}
              />
            ))}
          </div>
          <div className="cursor-pointer ml-auto flex items-center mr-10">
            <button className="bg-orange-500 text-white font-semibold px-5 py-2 rounded-lg shadow-md hover:bg-orange-700 transition-all duration-300">
              <div className="flex items-center">
                <span>Login</span>
                <CiLogin size={20} />
              </div>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Header;
