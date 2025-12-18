import React from "react";
import { Routes, Route } from "react-router-dom";

import Dashboard from "../pages/Dashboard";
import LeadsList from "../pages/LeadsList";
import LeadDetails from "../pages/LeadDetails";
import AddLead from "../pages/AddLead";
import AddAgent from "../pages/AddAgent";
import AgentsList from "../pages/AgentsList";
import Reports from "../pages/Reports";
import EditLead from "../pages/EditLead";
import LeadsByStatus from "../pages/LeadsByStatus";
import SettingsPage from "../pages/Settings";
import EditAgent from "../pages/EditAgent";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/leads" element={<LeadsList />} />
      <Route path="/leads/:id" element={<LeadDetails />} />
      <Route path="/add-lead" element={<AddLead />} />
      <Route path="/agents" element={<AgentsList />} />
      <Route path="/add-agent" element={<AddAgent />} />
      <Route path="/reports" element={<Reports />} />
      <Route path="/edit-lead/:id" element={<EditLead />} />
      <Route path="/leads/status" element={<LeadsByStatus />} />
      <Route path="/settings" element={<SettingsPage />} />
      <Route path="/agents/:id/edit" element={<EditAgent />} />
    </Routes>
  );
};

export default AppRoutes;
