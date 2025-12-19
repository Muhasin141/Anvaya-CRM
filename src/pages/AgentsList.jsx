import React, { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import SideBar from "../components/SideBar";
import { toast } from "react-toastify";

const AgentsList = () => {
  const { agents, deleteAgent } = useContext(AppContext);
  const navigate = useNavigate();

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this agent?"
    );

    if (!confirmDelete) return;

    try {
      await deleteAgent(id);
      toast.success("Agent deleted successfully");
    } catch (err) {
      toast.error(err.message || "Failed to delete agent");
    }
  };

  return (
    <div className="d-flex" style={{ minHeight: "100vh" }}>
      {/* Sidebar */}
      <aside
        className="bg-light"
        style={{
          width: "220px",
          minWidth: "220px",
          borderRight: "1px solid #ddd",
          position: "sticky",
          top: 0,
          height: "100vh",
        }}
      >
        <SideBar />
      </aside>

      {/* Main Content */}
      <main className="flex-grow-1 p-3">
        <div className="d-flex justify-content-between align-items-center flex-wrap mb-3">
          <h1 className="mb-2 mb-md-0">Agents List</h1>
          <Link className="btn btn-primary" to="/add-agent">
            + Add New Agent
          </Link>
        </div>

        {agents.length === 0 ? (
          <div className="alert alert-warning">No agents found.</div>
        ) : (
          <div className="row g-3">
            {agents.map((agent) => (
              <div key={agent._id} className="col-12 col-sm-6 col-lg-4">
                <div className="card h-100">
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{agent.name}</h5>
                    <p className="card-text text-truncate">{agent.email}</p>
                    <div className="mt-auto d-flex justify-content-between">
                      <button
                        className="btn btn-sm btn-outline-primary"
                        onClick={() => navigate(`/agents/${agent._id}/edit`)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => handleDelete(agent._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default AgentsList;


