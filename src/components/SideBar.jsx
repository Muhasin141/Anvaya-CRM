import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

const SideBar = () => {
  const location = useLocation();
  const isDashboard = location.pathname === "/";
  const [isOpen, setIsOpen] = useState(false); // for mobile menu toggle

  const navLinks = [
    { to: "/", label: "Dashboard" },
    { to: "/leads", label: "Leads" },
    { to: "/agents", label: "Agents" },
    { to: "/reports", label: "Reports" },
    { to: "/leads/status", label: "Status" },
    { to: "/settings", label: "Settings" },
  ];

  return (
    <>
      {/* Sidebar for medium+ screens */}
      <aside
        className="bg-dark text-white d-none d-md-flex flex-column"
        style={{ width: "12%", minWidth: "150px" }}
      >
        {/* BRAND */}
        <div className="p-3 text-center border-bottom border-secondary">
          <h5 className="mb-0">Anvaya</h5>
        </div>

        {/* NAV */}
        {isDashboard ? (
          <nav className="nav flex-column nav-pills p-2 gap-2">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === "/"}
                className={({ isActive }) =>
                  `nav-link ${isActive ? "active" : "text-white"}`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
        ) : (
          <div className="p-2 text-center">
            <NavLink to="/" className="btn btn-outline-light btn-sm">
              ← Back
            </NavLink>
          </div>
        )}
      </aside>

      {/* Top navbar for small screens */}
      <nav className="navbar navbar-dark bg-dark d-flex d-md-none p-2">
        <div className="container-fluid">
          <span className="navbar-brand mb-0 h6">Anvaya</span>
          <button
            className="navbar-toggler"
            type="button"
            onClick={() => setIsOpen(!isOpen)}
          >
            <span className="navbar-toggler-icon"></span>
          </button>
        </div>

        {isOpen && isDashboard && (
          <div className="bg-dark w-100 text-center">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === "/"}
                className={({ isActive }) =>
                  `nav-link ${isActive ? "active" : "text-white"}`
                }
                onClick={() => setIsOpen(false)} // close on click
              >
                {link.label}
              </NavLink>
            ))}
          </div>
        )}
      </nav>
    </>
  );
};

export default SideBar;



