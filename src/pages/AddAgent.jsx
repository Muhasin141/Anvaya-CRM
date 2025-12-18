import React, { useContext, useState } from "react";
import SideBar from "../components/SideBar";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AddAgent = () => {
  const [formData, setFormData] = useState({ name: "", email: "" });
  const { createAgent } = useContext(AppContext);
  const navigate = useNavigate();

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

    try {
      await createAgent(formData);
      toast.success("New agent added successfully 🎉");
      navigate("/agents");
    } catch (err) {
      toast.error(err.message || "Failed to create agent");
    }
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <SideBar />
      <main style={{ flex: 1, padding: "1rem" }}>
        <h1>Add New Agent</h1>
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input
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
          <button type="submit">Add Agent</button>
        </form>
      </main>
    </div>
  );
};

export default AddAgent;
