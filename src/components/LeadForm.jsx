import React, { useState, useContext } from "react";
import AppContext from "../context/AppContext";

const LeadForm = ({ existingLead, onClose }) => {
  const { createLead, updateLead, agents, tags } = useContext(AppContext);
  const [formData, setFormData] = useState(
    existingLead || {
      name: "",
      source: "",
      salesAgent: "",
      status: "New",
      priority: "Medium",
      timeToClose: 0,
      tags: [],
    }
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (existingLead) {
      updateLead(existingLead.id, formData);
    } else {
      createLead(formData);
    }
    onClose();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        value={formData.name}
        placeholder="Lead Name"
        onChange={handleChange}
        required
      />
      <select name="source" value={formData.source} onChange={handleChange}>
        <option value="">Select Source</option>
        <option value="Referral">Referral</option>
        <option value="Website">Website</option>
      </select>
      <select
        name="salesAgent"
        value={formData.salesAgent}
        onChange={handleChange}
      >
        <option value="">Select Agent</option>
        {agents.map((agent) => (
          <option key={agent.id} value={agent.id}>
            {agent.name}
          </option>
        ))}
      </select>
      <select name="status" value={formData.status} onChange={handleChange}>
        <option value="New">New</option>
        <option value="Contacted">Contacted</option>
        <option value="Qualified">Qualified</option>
        <option value="Proposal Sent">Proposal Sent</option>
        <option value="Closed">Closed</option>
      </select>
      <select name="priority" value={formData.priority} onChange={handleChange}>
        <option value="High">High</option>
        <option value="Medium">Medium</option>
        <option value="Low">Low</option>
      </select>
      <input
        type="number"
        name="timeToClose"
        value={formData.timeToClose}
        onChange={handleChange}
        placeholder="Time to Close"
      />
      <select
        multiple
        name="tags"
        value={formData.tags}
        onChange={(e) =>
          setFormData({
            ...formData,
            tags: Array.from(e.target.selectedOptions, (o) => o.value),
          })
        }
      >
        {tags.map((tag) => (
          <option key={tag.id} value={tag.name}>
            {tag.name}
          </option>
        ))}
      </select>
      <button type="submit">{existingLead ? "Update" : "Create"}</button>
    </form>
  );
};

export default LeadForm;
