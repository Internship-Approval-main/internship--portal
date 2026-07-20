import React from "react";
import { NavLink } from "react-router-dom";
import {
  FaHome,
  FaUser,
  FaClipboardList,
  FaCheckCircle,
  FaRobot,
  FaSignOutAlt,
} from "react-icons/fa";

const Sidebar = () => {
  return (
    <div className="w-64 bg-[#0D255F] text-white min-h-screen shadow-xl">
      <div className="text-center py-6 border-b border-blue-800">
        <h2 className="text-2xl font-bold">PES ERP</h2>
      </div>

      <nav className="mt-4 flex flex-col">

        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `flex items-center gap-4 px-8 py-4 transition ${
              isActive ? "bg-orange-500" : "hover:bg-[#173d7a]"
            }`
          }
        >
          <FaHome />
          Dashboard
        </NavLink>

        <NavLink
          to="/profile"
          className={({ isActive }) =>
            `flex items-center gap-4 px-8 py-4 ${
              isActive ? "bg-orange-500" : "hover:bg-[#173d7a]"
            }`
          }
        >
          <FaUser />
          Profile
        </NavLink>

        <NavLink
          to="/internship-form"
          className={({ isActive }) =>
            `flex items-center gap-4 px-8 py-4 ${
              isActive ? "bg-orange-500" : "hover:bg-[#173d7a]"
            }`
          }
        >
          <FaClipboardList />
          Internship Form
        </NavLink>

        <NavLink
          to="/status"
          className={({ isActive }) =>
            `flex items-center gap-4 px-8 py-4 ${
              isActive ? "bg-orange-500" : "hover:bg-[#173d7a]"
            }`
          }
        >
          <FaCheckCircle />
          Internship Status
        </NavLink>

        <NavLink
          to="/chatbot"
          className={({ isActive }) =>
            `flex items-center gap-4 px-8 py-4 ${
              isActive ? "bg-orange-500" : "hover:bg-[#173d7a]"
            }`
          }
        >
          <FaRobot />
          AI Chatbot
        </NavLink>

        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex items-center gap-4 px-8 py-4 ${
              isActive ? "bg-orange-500" : "hover:bg-[#173d7a]"
            }`
          }
        >
          <FaSignOutAlt />
          Logout
        </NavLink>

      </nav>
    </div>
  );
};

export default Sidebar;