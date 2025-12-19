import React from "react";
import { NavLink, useLocation } from "react-router-dom";

const SideBar = () => {
  const location = useLocation();

  // If NOT on dashboard
  const isDashboard = location.pathname === "/";

  return (
    <aside
      className="bg-dark text-white d-flex flex-column p-3"
      style={{ width: "220px", minHeight: "100vh" }}
    >
      <h4 className="text-center mb-4">Anvaya</h4>

      {/* DASHBOARD SIDEBAR */}
      {isDashboard ? (
        <nav className="nav nav-pills flex-column gap-2">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `nav-link ${isActive ? "active" : "text-white"}`
            }
          >
            Dashboard
          </NavLink>

          <NavLink
            to="/leads"
            className={({ isActive }) =>
              `nav-link ${isActive ? "active" : "text-white"}`
            }
          >
            Leads
          </NavLink>

          <NavLink
            to="/agents"
            className={({ isActive }) =>
              `nav-link ${isActive ? "active" : "text-white"}`
            }
          >
            Sales Agents
          </NavLink>

          <NavLink
            to="/reports"
            className={({ isActive }) =>
              `nav-link ${isActive ? "active" : "text-white"}`
            }
          >
            Reports
          </NavLink>

          <NavLink
            to="/leads/status"
            className={({ isActive }) =>
              `nav-link ${isActive ? "active" : "text-white"}`
            }
          >
            Leads By Status
          </NavLink>

          <NavLink
            to="/settings"
            className={({ isActive }) =>
              `nav-link ${isActive ? "active" : "text-white"}`
            }
          >
            Settings
          </NavLink>
        </nav>
      ) : (
        /* BACK BUTTON SIDEBAR */
        <NavLink to="/" className="btn btn-outline-light mt-3 align-self-start">
          ← Back to Dashboard
        </NavLink>
      )}
    </aside>
  );
};

export default SideBar;


