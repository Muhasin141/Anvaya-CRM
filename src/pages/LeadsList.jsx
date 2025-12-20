import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import LeadCard from "../components/LeadCard";
import SideBar from "../components/SideBar";
import { Link } from "react-router-dom";

const LeadsList = () => {
  const { leads, loading, agents } = useContext(AppContext);

  const [statusFilter, setStatusFilter] = useState("");
  const [agentFilter, setAgentFilter] = useState("");
  const [sortOption, setSortOption] = useState("");

  let filteredLeads = leads.filter((lead) => {
    const statusMatch = statusFilter ? lead.status === statusFilter : true;
    const agentMatch = agentFilter
      ? lead.salesAgent?._id === agentFilter
      : true;
    return statusMatch && agentMatch;
  });

  if (sortOption === "priority") {
    filteredLeads.sort((a, b) => {
      const priorityOrder = { High: 1, Medium: 2, Low: 3 };
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    });
  } else if (sortOption === "timeToClose") {
    filteredLeads.sort((a, b) => a.timeToClose - b.timeToClose);
  }

  return (
    <div className="d-flex flex-column flex-md-row min-vh-100">
      <SideBar />
      <main className="flex-fill p-3 p-md-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h1>Leads List</h1>
          <Link className="btn btn-primary" to="/add-lead">
            + Add New Lead
          </Link>
        </div>

        {/* Filters */}
        <div className="row g-2 mb-4">
          <div className="col-12 col-md-4">
            <select
              className="form-select"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="">All Status</option>
              <option value="New">New</option>
              <option value="Contacted">Contacted</option>
              <option value="Qualified">Qualified</option>
              <option value="Proposal Sent">Proposal Sent</option>
              <option value="Closed">Closed</option>
            </select>
          </div>

          <div className="col-12 col-md-4">
            <select
              className="form-select"
              value={agentFilter}
              onChange={(e) => setAgentFilter(e.target.value)}
            >
              <option value="">All Agents</option>
              {agents.map((agent) => (
                <option key={agent._id} value={agent._id}>
                  {agent.name}
                </option>
              ))}
            </select>
          </div>

          <div className="col-12 col-md-4">
            <select
              className="form-select"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
            >
              <option value="">Sort by</option>
              <option value="priority">Priority</option>
              <option value="timeToClose">Time to Close</option>
            </select>
          </div>
        </div>

        {loading && <div className="alert alert-info">Loading leads...</div>}

        {/* Leads List */}
        <div className="row g-3">
          {filteredLeads.length === 0 ? (
            <div className="alert alert-warning">No leads found</div>
          ) : (
            filteredLeads.map((lead) => (
              <div key={lead._id} className="col-12 col-md-6 col-lg-4">
                <LeadCard lead={lead} />
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
};

export default LeadsList;



