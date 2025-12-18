import React, { useContext, useState, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import SideBar from "../components/SideBar";
import LeadCard from "../components/LeadCard";

const LeadsByStatusPage = () => {
  const { leads, agents, loading } = useContext(AppContext);

  const [statusFilter, setStatusFilter] = useState(""); // New, Contacted, Qualified, etc.
  const [agentFilter, setAgentFilter] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("");
  const [sortByTime, setSortByTime] = useState(""); // "asc" or "desc"
  const [filteredLeads, setFilteredLeads] = useState([]);

  useEffect(() => {
    let tempLeads = [...leads];

    if (statusFilter) {
      tempLeads = tempLeads.filter((lead) => lead.status === statusFilter);
    }

    if (agentFilter) {
      tempLeads = tempLeads.filter(
        (lead) => lead.salesAgent?._id === agentFilter
      );
    }

    if (priorityFilter) {
      tempLeads = tempLeads.filter((lead) => lead.priority === priorityFilter);
    }

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
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <SideBar />
      <main style={{ flex: 1, padding: "1rem" }}>
        <h1>Leads By Status</h1>

        {/* Filters */}
        <div style={{ marginBottom: "1rem" }}>
          <label>
            Status:
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="">All</option>
              <option value="New">New</option>
              <option value="Contacted">Contacted</option>
              <option value="Qualified">Qualified</option>
            </select>
          </label>

          <label style={{ marginLeft: "1rem" }}>
            Sales Agent:
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
            Priority:
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
            >
              <option value="">All</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </label>

          <label style={{ marginLeft: "1rem" }}>
            Sort by Time to Close:
            <select
              value={sortByTime}
              onChange={(e) => setSortByTime(e.target.value)}
            >
              <option value="">None</option>
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
          </label>
        </div>

        {/* Leads list */}
        {loading ? (
          <p>Loading leads...</p>
        ) : filteredLeads.length === 0 ? (
          <p>No leads found.</p>
        ) : (
          filteredLeads.map((lead) => <LeadCard key={lead._id} lead={lead} />)
        )}
      </main>
    </div>
  );
};

export default LeadsByStatusPage;
