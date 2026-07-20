import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  FaHome,
  FaChartBar,
  FaSignOutAlt
} from "react-icons/fa";

const SidebarAdmin = () => {

  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="w-64 bg-[#0D255F] text-white min-h-screen shadow-xl">

      <div className="text-center py-6 border-b border-blue-800">
        <h2 className="text-2xl font-bold">
          PES ERP
        </h2>
      </div>

      <nav className="mt-4 flex flex-col">

        <NavLink
          to="/admin"
          className={({ isActive }) =>
            `flex items-center gap-4 px-8 py-4 ${
              isActive ? "bg-orange-500" : "hover:bg-[#173d7a]"
            }`
          }
        >
          <FaHome />
          Dashboard
        </NavLink>

        <NavLink
          to="/admin"
          className={({ isActive }) =>
            `flex items-center gap-4 px-8 py-4 ${
              isActive ? "bg-orange-500" : "hover:bg-[#173d7a]"
            }`
          }
        >
          <FaChartBar />
          Reports
        </NavLink>

        <button
          onClick={logout}
          className="flex items-center gap-4 px-8 py-4 hover:bg-[#173d7a] text-left"
        >
          <FaSignOutAlt />
          Logout
        </button>

      </nav>

    </div>
  );
};

export default SidebarAdmin;