import React from "react";
import { NavLink, useLocation } from "react-router-dom";

const SideBar = () => {
  const location = useLocation();
  const isDashboard = location.pathname === "/";

  return (
    <aside
      className="bg-dark text-white d-flex flex-column p-3"
      style={{
        width: "30%",           // Sidebar takes 30% of screen width
        minWidth: "220px",      // Optional minimum width
        minHeight: "100vh",     // Full height on desktop
      }}
    >
      <h4 className="text-center mb-4">Anvaya</h4>

      {isDashboard ? (
        <nav className="nav nav-pills flex-column gap-2">
          <NavLink to="/" end className={({ isActive }) => `nav-link ${isActive ? "active" : "text-white"}`}>
            Dashboard
          </NavLink>
          <NavLink to="/leads" className={({ isActive }) => `nav-link ${isActive ? "active" : "text-white"}`}>
            Leads
          </NavLink>
          <NavLink to="/agents" className={({ isActive }) => `nav-link ${isActive ? "active" : "text-white"}`}>
            Sales Agents
          </NavLink>
          <NavLink to="/reports" className={({ isActive }) => `nav-link ${isActive ? "active" : "text-white"}`}>
            Reports
          </NavLink>
          <NavLink to="/leads/status" className={({ isActive }) => `nav-link ${isActive ? "active" : "text-white"}`}>
            Leads By Status
          </NavLink>
          <NavLink to="/settings" className={({ isActive }) => `nav-link ${isActive ? "active" : "text-white"}`}>
            Settings
          </NavLink>
        </nav>
      ) : (
        <NavLink to="/" className="btn btn-outline-light mt-3 align-self-start">
          ← Back to Dashboard
        </NavLink>
      )}

      {/* Responsive: Sidebar full width on mobile */}
      <style>
        {`
          @media (max-width: 768px) {
            aside {
              width: 100% !important;
              min-height: auto !important;
              flex-direction: row;
              overflow-x: auto;
            }

            aside nav {
              flex-direction: row !important;
              justify-content: space-around;
              width: 100%;
            }

            aside nav .nav-link {
              white-space: nowrap;
              text-align: center;
              flex: 1;
            }
          }
        `}
      </style>
    </aside>
  );
};

export default SideBar;






