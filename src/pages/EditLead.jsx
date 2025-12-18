import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import SideBar from "../components/SideBar";
import { toast } from "react-toastify";

const EditLead = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { leads, agents, updateLead } = useContext(AppContext);

  const [formData, setFormData] = useState({
    name: "",
    status: "New",
    source: "Website",
    priority: "Medium",
    timeToClose: 1,
    salesAgent: "",
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!leads.length) return;

    const lead = leads.find((l) => l._id === id);

    if (!lead) {
      toast.error("Lead not found");
      navigate("/leads");
      return;
    }

    setFormData({
      name: lead.name,
      status: lead.status,
      source: lead.source,
      priority: lead.priority,
      timeToClose: lead.timeToClose,
      salesAgent: lead.salesAgent?._id || "",
    });

    setLoading(false);
  }, [id, leads, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await updateLead(id, {
        ...formData,
        timeToClose: Number(formData.timeToClose),
      });

      toast.success("Lead updated successfully");
      navigate(`/leads/${id}`);
    } catch (err) {
      toast.error(err.message || "Failed to update lead");
    }
  };

  if (loading) {
    return (
      <div style={{ display: "flex", minHeight: "100vh" }}>
        <SideBar />
        <main style={{ padding: "1rem" }}>Loading lead...</main>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <SideBar />
      <main style={{ flex: 1, padding: "1rem" }}>
        <h1>Edit Lead</h1>

        <form onSubmit={handleSubmit}>
          <div>
            <label>Name:</label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label>Status:</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="New">New</option>
              <option value="Contacted">Contacted</option>
              <option value="Qualified">Qualified</option>
              <option value="Proposal Sent">Proposal Sent</option>
              <option value="Closed">Closed</option>
            </select>
          </div>

          <div>
            <label>Source:</label>
            <select
              name="source"
              value={formData.source}
              onChange={handleChange}
            >
              <option value="Website">Website</option>
              <option value="Referral">Referral</option>
              <option value="Cold Call">Cold Call</option>
              <option value="Advertisement">Advertisement</option>
              <option value="Email">Email</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label>Priority:</label>
            <select
              name="priority"
              value={formData.priority}
              onChange={handleChange}
            >
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>

          <div>
            <label>Time to Close (days):</label>
            <input
              type="number"
              name="timeToClose"
              min={1}
              value={formData.timeToClose}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label>Sales Agent:</label>
            <select
              name="salesAgent"
              value={formData.salesAgent}
              onChange={handleChange}
              required
            >
              <option value="">Select Agent</option>
              {agents.map((agent) => (
                <option key={agent._id} value={agent._id}>
                  {agent.name}
                </option>
              ))}
            </select>
          </div>

          <button type="submit" style={{ marginRight: "10px" }}>
            Save Changes
          </button>

          <button type="button" onClick={() => navigate(-1)}>
            Cancel
          </button>
        </form>
      </main>
    </div>
  );
};

export default EditLead;
