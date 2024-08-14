import { EarthIcon } from "lucide-react";
import React from "react";

const Navbar: React.FC = () => {
  return (
    <header className="sticky top-0 bg-transparent p-6 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 text-white">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-4xl font-extrabold tracking-tight flex items-center space-x-2">
          <EarthIcon className="h-9 w-9 animate-spin" />
          <span>GlobeLoom</span>
        </h1>
        <nav>
          <ul className="flex space-x-8 text-lg font-medium">
            <li>
              <a
                href="#features"
                className="hover:text-gray-300 transition duration-300"
              >
                Features
              </a>
            </li>
            <li>
              <a
                href="#about"
                className="hover:text-gray-300 transition duration-300"
              >
                About
              </a>
            </li>
            <li>
              <a
                href="#contact"
                className="hover:text-gray-300 transition duration-300"
              >
                Contact
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
