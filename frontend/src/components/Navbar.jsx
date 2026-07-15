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

          {/* Right Section */}
          <div className="flex items-center gap-8">

            {/* Notification Bell */}
            <button
  onClick={() => navigate("/notifications")}
  className="notification-btn"
  title="Notifications"
>
  <FaBell className="notification-icon" />
</button>

            {/* Profile */}
            <div
              onClick={() => navigate("/profile")}
              className="flex items-center gap-3 cursor-pointer hover:bg-gray-100 px-3 py-2 rounded-lg transition duration-200"
            >
              <img
                src="https://ui-avatars.com/api/?name=Rahul+Sharma&background=2563eb&color=fff"
                alt="Student"
                className="w-12 h-12 rounded-full border-2 border-orange-500"
              />

              <span className="text-xl font-semibold text-[#0D255F]">
                Student
              </span>

              <FaChevronDown className="text-[#0D255F]" />
            </div>

          </div>

        </div>
      </header>
    </>
  );
};

export default Navbar;