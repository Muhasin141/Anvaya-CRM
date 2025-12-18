import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import SideBar from "../components/SideBar";
import { toast } from "react-toastify";

const EditAgent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { agents, updateAgent } = useContext(AppContext);

  const [formData, setFormData] = useState({ name: "", email: "" });
  const [error, setError] = useState("");

  useEffect(() => {
    const agent = agents.find((a) => a._id === id);
    if (agent) {
      setFormData({ name: agent.name, email: agent.email });
    }
  }, [id, agents]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError("Invalid email format");
      return;
    }

    try {
      await updateAgent(id, formData);
      toast.success("Agent updated successfully");
      navigate("/agents");
    } catch (err) {
      setError(err.message);
      toast.error(err.message);
    }
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <SideBar />
      <main style={{ flex: 1, padding: "1rem" }}>
        <h1>Edit Agent</h1>

        {error && <p style={{ color: "red" }}>{error}</p>}

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
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
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

export default EditAgent;
