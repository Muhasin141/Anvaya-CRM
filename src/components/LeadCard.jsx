import React from "react";
import { Link } from "react-router-dom";

const LeadCard = ({ lead }) => {
  return (
    <div
      style={{
        border: "1px solid #ddd",
        padding: "1rem",
        marginBottom: "0.75rem",
      }}
    >
      <h3>{lead.name}</h3>
      <p>Status: {lead.status}</p>
      <p>Agent: {lead.salesAgent?.name}</p>
      <p>Priority: {lead.priority}</p>

      <Link to={`/leads/${lead._id}`}>View Details</Link>
    </div>
  );
};

export default LeadCard;
