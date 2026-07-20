import React from "react";
import { useNavigate } from "react-router-dom";
import {
  FaBell,
  FaChevronDown,
} from "react-icons/fa";

import logo from "../assets/pes-logo.png";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <>
      {/* Top Header */}
      <header className="bg-white shadow-md">
        <div className="flex justify-between items-center px-10 py-4">

          {/* Logo */}
          <div className="flex items-center gap-6">
            <img
              src={logo}
              alt="PES Logo"
              className="h-20"
            />

            <div className="border-l-2 border-gray-300 pl-6">
              <h1 className="text-4xl font-bold text-[#0D255F]">
                INTERNSHIP PORTAL
              </h1>

              <p className="text-gray-600">
                Empowering Students.
              </p>

              <p className="text-gray-600">
                Building Futures.
              </p>
            </div>
          </div>

          

          

          </div>

        
      </header>
    </>
  );
};

export default Navbar;