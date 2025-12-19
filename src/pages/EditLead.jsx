import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import SideBar from "../components/SideBar";
import { toast } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";

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
      <div className="d-flex min-vh-100">
        <SideBar />
        <main className="flex-fill p-3 p-md-4">Loading lead...</main>
      </div>
    );
  }

  return (
    <div className="d-flex min-vh-100">
      {/* Fixed Sidebar */}
      <SideBar />

      {/* Main Content */}
      <main className="flex-fill p-3 p-md-4" style={{ minWidth: 0 }}>
        <h1 className="mb-4">Edit Lead</h1>

        <div className="card shadow-sm">
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              {/* Name */}
              <div className="mb-3">
                <label className="form-label">Name</label>
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>

              {/* Status */}
              <div className="mb-3">
                <label className="form-label">Status</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="form-select"
                >
                  <option value="New">New</option>
                  <option value="Contacted">Contacted</option>
                  <option value="Qualified">Qualified</option>
                  <option value="Proposal Sent">Proposal Sent</option>
                  <option value="Closed">Closed</option>
                </select>
              </div>

              {/* Source */}
              <div className="mb-3">
                <label className="form-label">Source</label>
                <select
                  name="source"
                  value={formData.source}
                  onChange={handleChange}
                  className="form-select"
                >
                  <option value="Website">Website</option>
                  <option value="Referral">Referral</option>
                  <option value="Cold Call">Cold Call</option>
                  <option value="Advertisement">Advertisement</option>
                  <option value="Email">Email</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* Priority */}
              <div className="mb-3">
                <label className="form-label">Priority</label>
                <select
                  name="priority"
                  value={formData.priority}
                  onChange={handleChange}
                  className="form-select"
                >
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
              </div>

              {/* Time to Close */}
              <div className="mb-3">
                <label className="form-label">Time to Close (days)</label>
                <input
                  type="number"
                  name="timeToClose"
                  min={1}
                  value={formData.timeToClose}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>

              {/* Sales Agent */}
              <div className="mb-3">
                <label className="form-label">Sales Agent</label>
                <select
                  name="salesAgent"
                  value={formData.salesAgent}
                  onChange={handleChange}
                  className="form-select"
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

              {/* Buttons */}
              <div className="d-flex flex-wrap gap-2">
                <button type="submit" className="btn btn-primary">
                  Save Changes
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => navigate(-1)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default EditLead;

