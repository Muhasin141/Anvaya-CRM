import React, { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import SideBar from "../components/SideBar";
import { toast } from "react-toastify";

const AgentsList = () => {
  const { agents, deleteAgent } = useContext(AppContext);
  const navigate = useNavigate();

  const handleDelete = async (id) => {
  

    try {
      await deleteAgent(id);
      toast.success("Agent deleted successfully");
    } catch (err) {
      toast.error(err.message || "Failed to delete agent");
    }
  };

  return (
    <div className="layout" style={{ display: "flex", minHeight: "100vh" }}>
      <SideBar />

      <main style={{ flex: 1, padding: "1rem", overflowX: "auto" }}>
        <h1>Agents List</h1>

        <Link
          to="/add-agent"
          style={{ marginBottom: "1rem", display: "inline-block" }}
        >
          Add New Agent
        </Link>

        {agents.length === 0 ? (
          <p>No agents found.</p>
        ) : (
          <ul style={{ padding: 0 }}>
            {agents.map((agent) => (
              <li
                key={agent._id}
                style={{
                  listStyle: "none",
                  padding: "0.5rem 0",
                  borderBottom: "1px solid #ccc",
                  wordBreak: "break-word",
                }}
              >
                <strong>{agent.name}</strong> – {agent.email}
                <div style={{ marginTop: "0.5rem" }}>
                  <button
                    onClick={() => navigate(`/agents/${agent._id}/edit`)}
                    style={{ marginRight: "10px" }}
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(agent._id)}
                    style={{ color: "red" }}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </main>

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

export default AgentsList;


