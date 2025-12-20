import React from "react";
import { NavLink, useLocation } from "react-router-dom";

const SideBar = () => {
  const location = useLocation();
  const isDashboard = location.pathname === "/";

  return (
    <aside
      className="
        bg-dark text-white
        w-100 w-md-auto
      "
      style={{
        width: "220px", // desktop width
      }}
    >
      {/* BRAND */}
      <div className="p-3 text-center border-bottom border-secondary">
        <h5 className="mb-0">Anvaya</h5>
      </div>

      {/* NAV */}
      {isDashboard ? (
        <nav
          className="
            nav
            flex-row flex-md-column
            nav-pills
            p-2
            gap-2
            justify-content-center justify-content-md-start
          "
        >
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
            Agents
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
            Status
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
        <div className="p-2 text-center">
          <NavLink to="/" className="btn btn-outline-light btn-sm">
            ← Back
          </NavLink>
        </div>
      )}
    </aside>
  );
};

export default SideBar;






