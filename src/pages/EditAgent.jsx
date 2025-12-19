import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import SideBar from "../components/SideBar";
import { toast } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";

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
    <div className="d-flex min-vh-100">
      {/* Sidebar */}
      <SideBar />

      {/* Main content */}
      <main className="flex-fill p-3 p-md-4" style={{ minWidth: 0 }}>
        <h1 className="mb-4">Edit Agent</h1>

        <div className="card shadow-sm">
          <div className="card-body">
            {error && <div className="alert alert-danger">{error}</div>}

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

              {/* Email */}
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
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

export default EditAgent;

