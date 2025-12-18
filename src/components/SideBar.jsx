import React from "react";
import { NavLink, useLocation } from "react-router-dom";

const SideBar = () => {
  const location = useLocation();

  // If NOT on dashboard
  const isDashboard = location.pathname === "/";

  return (
    <aside
      style={{
        width: "220px",
        padding: "1rem",
        borderRight: "1px solid #ddd",
        height: "100vh",
      }}
    >
      <h2>Anvaya</h2>

      {/* DASHBOARD SIDEBAR */}
      {isDashboard ? (
        <nav
          style={{ display: "flex", flexDirection: "column", gap: "0.8rem" }}
        >
          <NavLink to="/" end>
            Dashboard
          </NavLink>
          <NavLink to="/leads">Leads</NavLink>
          <NavLink to="/agents">Sales Agents</NavLink>
          <NavLink to="/reports">Reports</NavLink>
          <NavLink to="/leads/status">Leads By Status</NavLink>
          <NavLink to="/settings">Settings</NavLink>
        </nav>
      ) : (
        /* BACK BUTTON SIDEBAR */
        <NavLink
          to="/"
          style={{
            display: "inline-block",
            marginTop: "1rem",
            fontWeight: "bold",
          }}
        >
          ← Back to Dashboard
        </NavLink>
      )}
    </aside>
  );
};

export default SideBar;
