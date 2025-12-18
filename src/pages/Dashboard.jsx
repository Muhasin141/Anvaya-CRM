import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import LeadCard from "../components/LeadCard";
import SideBar from "../components/SideBar";

const Dashboard = () => {
  const { leads, loading } = useContext(AppContext);

  const [selectedStatus, setSelectedStatus] = useState("All");

  // Count leads by status
  const newLeads = leads.filter((lead) => lead.status === "New");
  const contactedLeads = leads.filter((lead) => lead.status === "Contacted");
  const qualifiedLeads = leads.filter((lead) => lead.status === "Qualified");

  // Filter leads based on selected status
  const filteredLeads =
    selectedStatus === "All"
      ? leads
      : leads.filter((lead) => lead.status === selectedStatus);

  return (
    <div className="dashboard-container" style={{ display: "flex" }}>
      <SideBar />

      <main style={{ flex: 1, padding: "1rem" }}>
        <h1>Anvaya CRM Dashboard</h1>

        {loading && <p>Loading leads...</p>}

        {/* Lead Status Summary */}
        <section>
          <h2>Lead Status</h2>
          <p>New: {newLeads.length} Leads</p>
          <p>Contacted: {contactedLeads.length} Leads</p>
          <p>Qualified: {qualifiedLeads.length} Leads</p>
        </section>

        {/* Quick Filters */}
        <section style={{ margin: "1rem 0" }}>
          <h3>Quick Filters</h3>
          {["All", "New", "Contacted", "Qualified"].map((status) => (
            <button
              key={status}
              onClick={() => setSelectedStatus(status)}
              style={{
                marginRight: "0.5rem",
                padding: "6px 12px",
                background: selectedStatus === status ? "#2563eb" : "#e5e7eb",
                color: selectedStatus === status ? "#fff" : "#000",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              {status}
            </button>
          ))}
        </section>

        {/* Lead List */}
        <section>
          <h2>Leads</h2>
          {filteredLeads.length === 0 && <p>No leads found</p>}
          {filteredLeads.map((lead) => (
            <LeadCard key={lead._id} lead={lead} />
          ))}
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
