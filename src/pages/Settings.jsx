import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import SideBar from "../components/SideBar";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const SettingsPage = () => {
  const { leads, agents, deleteLead, deleteAgent, loading } =
    useContext(AppContext);
  const navigate = useNavigate();

  const handleDeleteLead = (id) => {
    
    try {
      deleteLead(id);
      toast.success("Lead deleted successfully");
      navigate("/settings");
    } catch (err) {
      toast.error("Failed to delete lead: " + err.message);
    }
  };

  const handleDeleteAgent = async (id) => {
   

    try {
      await deleteAgent(id);
      toast.success("Agent deleted successfully");
      navigate("/settings");
    } catch (err) {
      toast.error(err.message || "Failed to delete agent");
    }
  };

  return (
    <div className="d-flex flex-column flex-md-row min-vh-100">
      <SideBar />
      <main className="flex-fill p-3 p-md-4">
        <h1 className="mb-4">Settings</h1>

        {/* Leads Section */}
        <div className="card mb-4 shadow-sm">
          <div className="card-body">
            <h5 className="card-title">Leads</h5>
            {loading ? (
              <p>Loading leads...</p>
            ) : leads.length === 0 ? (
              <p>No leads found.</p>
            ) : (
              <ul style={{ padding: 0 }}>
                {leads.map((lead) => (
                  <li
                    key={lead._id}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "0.5rem 0",
                      borderBottom: "1px solid #ddd",
                      flexWrap: "wrap",
                      wordBreak: "break-word",
                      overflowWrap: "anywhere",
                    }}
                  >
                    <span>
                      {lead.name} - {lead.status}
                    </span>
                    <button
                      style={{
                        background: "red",
                        color: "white",
                        border: "none",
                        padding: "0.3rem 0.6rem",
                        cursor: "pointer",
                        marginTop: "0.3rem",
                      }}
                      onClick={() => handleDeleteLead(lead._id)}
                    >
                      Delete
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Agents Section */}
        <div className="card mb-4 shadow-sm">
          <div className="card-body">
            <h5 className="card-title">Sales Agents</h5>
            {agents.length === 0 ? (
              <p>No agents found.</p>
            ) : (
              <ul style={{ padding: 0 }}>
                {agents.map((agent) => (
                  <li
                    key={agent._id}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "0.5rem 0",
                      borderBottom: "1px solid #ddd",
                      flexWrap: "wrap",
                      wordBreak: "break-word",
                      overflowWrap: "anywhere",
                    }}
                  >
                    <span>
                      {agent.name} - {agent.email}
                    </span>
                    <button
                      style={{
                        background: "red",
                        color: "white",
                        border: "none",
                        padding: "0.3rem 0.6rem",
                        cursor: "pointer",
                        marginTop: "0.3rem",
                      }}
                      onClick={() => handleDeleteAgent(agent._id)}
                    >
                      Delete
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </main>

      {/* Responsive layout */}
      <style>
        {`
          @media (max-width: 768px) {
            .layout {
              flex-direction: column;
            }
          }
        `}
      </style>
    </div>
  );
};

export default SettingsPage;


