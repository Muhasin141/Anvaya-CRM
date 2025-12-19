import React from "react";
import { Link } from "react-router-dom";

const LeadCard = ({ lead }) => {
  return (
    <div className="card mb-3 shadow-sm">
      <div className="card-body">
        <h5 className="card-title">{lead.name}</h5>
        <p className="card-text mb-1">
          <strong>Status:</strong> {lead.status}
        </p>
        <p className="card-text mb-1">
          <strong>Agent:</strong> {lead.salesAgent?.name || "Unassigned"}
        </p>
        <p className="card-text mb-2">
          <strong>Priority:</strong> {lead.priority}
        </p>
        <Link to={`/leads/${lead._id}`} className="btn btn-sm btn-primary">
          View Details
        </Link>
      </div>
    </div>
  );
};

export default LeadCard;
