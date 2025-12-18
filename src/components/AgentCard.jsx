import React from "react";

const AgentCard = ({ agent }) => {
  return (
    <div
      className="agent-card"
      style={{
        border: "1px solid #ddd",
        borderRadius: "8px",
        padding: "1rem",
        marginBottom: "1rem",
        boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
        backgroundColor: "#fff",
      }}
    >
      <h3 style={{ margin: "0 0 0.5rem 0" }}>{agent.name}</h3>
      <p style={{ margin: "0.25rem 0" }}>
        <strong>Email:</strong> {agent.email}
      </p>
      <p style={{ margin: "0.25rem 0" }}>
        <strong>Phone:</strong> {agent.phone}
      </p>
      {/* Add more fields as needed, e.g. role, department */}
    </div>
  );
};

export default AgentCard;
