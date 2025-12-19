import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import SideBar from "../components/SideBar";
import { toast } from "react-toastify";

const AddLead = () => {
  const { createLead, agents } = useContext(AppContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    salesAgent: "",
    status: "New",
    source: "",
    priority: "Medium",
    timeToClose: 1,
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(formData.email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    if (!formData.salesAgent) {
      toast.error("Please select a sales agent");
      return;
    }

    try {
      await createLead({
        ...formData,
        timeToClose: Number(formData.timeToClose),
      });

      toast.success("New lead created successfully 🎉");
      navigate("/leads");
    } catch (err) {
      toast.error(err.message || "Failed to create lead");
    }
  };

  return (
    <div className="d-flex min-vh-100">
      <SideBar />

      <main className="flex-fill p-3 p-md-4">
        <div className="container-fluid px-0 px-md-3">
          <form
            onSubmit={handleSubmit}
            className="card shadow-sm p-3 p-md-4 mx-auto"
            style={{ maxWidth: "800px" }}
          >
            <h3 className="mb-4 text-center text-md-start">Add New Lead</h3>

            {/* Name */}
            <div className="mb-3">
              <label className="form-label">Name</label>
              <input
                type="text"
                name="name"
                className="form-control"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            {/* Email & Phone */}
            <div className="row">
              <div className="col-12 col-md-6 mb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-12 col-md-6 mb-3">
                <label className="form-label">Phone</label>
                <input
                  type="text"
                  name="phone"
                  className="form-control"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Sales Agent */}
            <div className="mb-3">
              <label className="form-label">Sales Agent</label>
              <select
                name="salesAgent"
                className="form-select"
                value={formData.salesAgent}
                onChange={handleChange}
                required
              >
                <option value="">Select agent</option>
                {agents.map((agent) => (
                  <option key={agent._id} value={agent._id}>
                    {agent.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Status & Priority */}
            <div className="row">
              <div className="col-12 col-md-6 mb-3">
                <label className="form-label">Status</label>
                <select
                  name="status"
                  className="form-select"
                  value={formData.status}
                  onChange={handleChange}
                  required
                >
                  <option value="New">New</option>
                  <option value="Contacted">Contacted</option>
                  <option value="Qualified">Qualified</option>
                  <option value="Proposal Sent">Proposal Sent</option>
                  <option value="Closed">Closed</option>
                </select>
              </div>

              <div className="col-12 col-md-6 mb-3">
                <label className="form-label">Priority</label>
                <select
                  name="priority"
                  className="form-select"
                  value={formData.priority}
                  onChange={handleChange}
                  required
                >
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
              </div>
            </div>

            {/* Source */}
            <div className="mb-3">
              <label className="form-label">Source</label>
              <select
                name="source"
                className="form-select"
                value={formData.source}
                onChange={handleChange}
                required
              >
                <option value="">Select source</option>
                <option value="Website">Website</option>
                <option value="Referral">Referral</option>
                <option value="Cold Call">Cold Call</option>
                <option value="Advertisement">Advertisement</option>
                <option value="Email">Email</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Time to Close */}
            <div className="mb-4">
              <label className="form-label">Time to Close (days)</label>
              <input
                type="number"
                name="timeToClose"
                min={1}
                className="form-control"
                value={formData.timeToClose}
                onChange={handleChange}
                required
              />
            </div>

            {/* Buttons */}
            <div className="d-flex flex-column flex-md-row justify-content-end gap-2">
              <button
                type="button"
                className="btn btn-outline-secondary w-100 w-md-auto"
                onClick={() => navigate(-1)}
              >
                Cancel
              </button>

              <button type="submit" className="btn btn-primary w-100 w-md-auto">
                Add Lead
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default AddLead;

