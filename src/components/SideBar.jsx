import React from "react";
import { NavLink, useLocation } from "react-router-dom";

const SideBar = () => {
  const location = useLocation();
  const isDashboard = location.pathname === "/";

  return (
    <aside
      className="
        bg-dark text-white
        d-flex flex-row flex-md-column
        align-items-center align-items-md-start
        p-2 p-md-3
        w-100
      "
      style={{
        minHeight: "auto",
      }}
    >
      {/* Logo */}
      <h4 className="mb-0 mb-md-4 me-3 me-md-0">Anvaya</h4>

      {/* Navigation */}
      {isDashboard ? (
        <nav className="nav nav-pills flex-row flex-md-column gap-2 w-100">
          <NavLink to="/" end className="nav-link text-white">
            Dashboard
          </NavLink>
          <NavLink to="/leads" className="nav-link text-white">
            Leads
          </NavLink>
          <NavLink to="/agents" className="nav-link text-white">
            Sales Agents
          </NavLink>
          <NavLink to="/reports" className="nav-link text-white">
            Reports
          </NavLink>
          <NavLink to="/leads/status" className="nav-link text-white">
            Leads By Status
          </NavLink>
          <NavLink to="/settings" className="nav-link text-white">
            Settings
          </NavLink>
        </nav>
      ) : (
        <NavLink to="/" className="btn btn-outline-light ms-auto ms-md-0">
          ← Back
        </NavLink>
      )}
    </aside>
  );
};

export default SideBar;





