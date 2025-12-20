import React, { useContext, useState, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import SideBar from "../components/SideBar";
import LeadCard from "../components/LeadCard";

const LeadsByStatusPage = () => {
  const { leads, agents, loading } = useContext(AppContext);

  const [statusFilter, setStatusFilter] = useState("");
  const [agentFilter, setAgentFilter] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("");
  const [sortByTime, setSortByTime] = useState("");
  const [filteredLeads, setFilteredLeads] = useState([]);

  useEffect(() => {
    let tempLeads = [...leads];

    if (statusFilter)
      tempLeads = tempLeads.filter((l) => l.status === statusFilter);
    if (agentFilter)
      tempLeads = tempLeads.filter((l) => l.salesAgent?._id === agentFilter);
    if (priorityFilter)
      tempLeads = tempLeads.filter((l) => l.priority === priorityFilter);

    if (sortByTime) {
      tempLeads.sort((a, b) =>
        sortByTime === "asc"
          ? a.timeToClose - b.timeToClose
          : b.timeToClose - a.timeToClose
      );
    }

    setFilteredLeads(tempLeads);
  }, [leads, statusFilter, agentFilter, priorityFilter, sortByTime]);

  return (
   <div className="d-flex flex-column flex-md-row min-vh-100">
  <SideBar />
  <main className="flex-fill p-3 p-md-4">
        <h1 className="mb-4">Leads By Status</h1>

        {/* Filters */}
        <div className="row g-2 mb-4">
          <div className="col-12 col-md-3">
            <select
              className="form-select"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="">All Status</option>
              <option value="New">New</option>
              <option value="Contacted">Contacted</option>
              <option value="Qualified">Qualified</option>
            </select>
          </div>

          <div className="col-12 col-md-3">
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

          <div className="col-12 col-md-3">
            <select
              className="form-select"
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
            >
              <option value="">All Priorities</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>

          <div className="col-12 col-md-3">
            <select
              className="form-select"
              value={sortByTime}
              onChange={(e) => setSortByTime(e.target.value)}
            >
              <option value="">Sort by Time to Close</option>
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
          </div>
        </div>

        {/* Leads list */}
        {loading ? (
          <div className="alert alert-info">Loading leads...</div>
        ) : filteredLeads.length === 0 ? (
          <div className="alert alert-warning">No leads found.</div>
        ) : (
          <div className="row g-3">
            {filteredLeads.map((lead) => (
              <div key={lead._id} className="col-12 col-md-6 col-lg-4">
                <LeadCard lead={lead} />
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default LeadsByStatusPage;

