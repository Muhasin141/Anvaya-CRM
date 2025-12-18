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

    // Email validation
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
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <SideBar />
      <main style={{ flex: 1, padding: "1rem" }}>
        <h1>Add New Lead</h1>

        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </label>
          <br />

          <label>
            Email:
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </label>
          <br />

          <label>
            Phone:
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </label>
          <br />

          <label>
            Sales Agent:
            <select
              name="salesAgent"
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
          </label>
          <br />

          <label>
            Status:
            <select
              name="status"
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
          </label>
          <br />

          <label>
            Source:
            <select
              name="source"
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
          </label>
          <br />

          <label>
            Priority:
            <select
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              required
            >
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </label>
          <br />

          <label>
            Time to Close (days):
            <input
              type="number"
              name="timeToClose"
              min={1}
              value={formData.timeToClose}
              onChange={handleChange}
              required
            />
          </label>
          <br />

          <button type="submit">Add Lead</button>
        </form>
      </main>
    </div>
  );
};

export default AddLead;
