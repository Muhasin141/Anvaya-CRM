import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import LeadCard from "../components/LeadCard";
import SideBar from "../components/SideBar";
import { Link } from "react-router-dom";

const LeadsList = () => {
  const { leads, loading, agents } = useContext(AppContext);

  // Filter states
  const [statusFilter, setStatusFilter] = useState("");
  const [agentFilter, setAgentFilter] = useState("");

  // Sort state
  const [sortOption, setSortOption] = useState("");

  // Filter leads
  let filteredLeads = leads.filter((lead) => {
    const statusMatch = statusFilter ? lead.status === statusFilter : true;
    const agentMatch = agentFilter
      ? lead.salesAgent?._id === agentFilter
      : true;
    return statusMatch && agentMatch;
  });

  // Sort leads
  if (sortOption === "priority") {
    filteredLeads.sort((a, b) => {
      const priorityOrder = { High: 1, Medium: 2, Low: 3 };
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    });
  } else if (sortOption === "timeToClose") {
    filteredLeads.sort((a, b) => a.timeToClose - b.timeToClose);
  }

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <SideBar />
      <main style={{ flex: 1, padding: "1rem" }}>
        <h1>Leads List</h1>
        <Link to="/add-lead">Add New Lead</Link>

        {/* Filters */}
        <div style={{ margin: "1rem 0" }}>
          <label>
            Status:{" "}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="">All</option>
              <option value="New">New</option>
              <option value="Contacted">Contacted</option>
              <option value="Qualified">Qualified</option>
              <option value="Proposal Sent">Proposal Sent</option>
            </select>
          </label>

          <label style={{ marginLeft: "1rem" }}>
            Sales Agent:{" "}
            <select
              value={agentFilter}
              onChange={(e) => setAgentFilter(e.target.value)}
            >
              <option value="">All</option>
              {agents.map((agent) => (
                <option key={agent._id} value={agent._id}>
                  {agent.name}
                </option>
              ))}
            </select>
          </label>

          <label style={{ marginLeft: "1rem" }}>
            Sort by:{" "}
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
            >
              <option value="">None</option>
              <option value="priority">Priority</option>
              <option value="timeToClose">Time to Close</option>
            </select>
          </label>
        </div>

        {loading && <p>Loading leads...</p>}

        {/* Leads List */}
        <div>
          {filteredLeads.length === 0 ? (
            <p>No leads found</p>
          ) : (
            filteredLeads.map((lead) => <LeadCard key={lead._id} lead={lead} />)
          )}
        </div>
      </main>
    </div>
  );
};

export default LeadsList;
