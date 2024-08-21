import { useState } from "react";
import { EarthIcon } from "lucide-react";

export default function Navbar() {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <nav className="sticky top-0 z-10 w-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 text-white">
      <div className="flex justify-between items-center p-6 container mx-auto">
        <div className="flex items-center font-extrabold tracking-tight text-4xl">
          <EarthIcon className="h-9 w-9" />
          <span className="text-2xl ml-2">GlobeLoom</span>
        </div>

        <div className="md:hidden flex items-center">
          <button
            onClick={toggleMenu}
            className="block text-gray-100 focus:outline-none mt-[5px]"
          >
            <svg
              className="h-7 w-7 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              {showMenu ? (
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M19 7H5v2h14V7zM5 11h14v2H5v-2zm14 4H5v2h14v-2z"
                />
              ) : (
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M4 6h16v2H4V6zm0 5h16v2H4v-2zm0 5h16v2H4v-2z"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Collapsed menu for mobile */}
        <div
          className={`${
            showMenu ? "block" : "hidden"
          } md:hidden absolute top-16 left-0 w-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 text-white`}
        >
          <ul className="flex flex-col items-center gap-4 p-4">
            <li>
              <a
                href="#features"
                onClick={toggleMenu}
                className="hover:text-gray-300 transition duration-300"
              >
                Features
              </a>
            </li>
            <li>
              <a
                href="#about"
                onClick={toggleMenu}
                className="hover:text-gray-300 transition duration-300"
              >
                About
              </a>
            </li>
            <li>
              <a
                href="#contact"
                onClick={toggleMenu}
                className="hover:text-gray-300 transition duration-300"
              >
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Menu items for larger screens */}
        <div className="hidden md:flex space-x-8 text-lg font-medium">
          <a
            href="#features"
            className="hover:text-gray-300 transition duration-300"
          >
            Features
          </a>
          <a
            href="#about"
            className="hover:text-gray-300 transition duration-300"
          >
            About
          </a>
          <a
            href="#contact"
            className="hover:text-gray-300 transition duration-300"
          >
            Contact
          </a>
        </div>
      </div>
    </nav>
  );
}
