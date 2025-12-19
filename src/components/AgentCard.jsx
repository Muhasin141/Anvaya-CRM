import React from "react";

const AgentCard = ({ agent }) => {
  return (
    <div className="card mb-3 shadow-sm">
      <div className="card-body">
        <h5 className="card-title">{agent.name}</h5>
        <p className="card-text mb-1">
          <strong>Email:</strong> {agent.email}
        </p>
        <p className="card-text mb-1">
          <strong>Phone:</strong> {agent.phone || "N/A"}
        </p>
        {/* Add more fields if needed */}
      </div>
    </div>
  );
};

export default AgentCard;


