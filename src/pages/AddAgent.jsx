import React, { useContext, useState } from "react";
import SideBar from "../components/SideBar";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddAgent = () => {
  const [formData, setFormData] = useState({ name: "", email: "" });
  const { createAgent } = useContext(AppContext);
  const navigate = useNavigate();

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

    try {
      await createAgent(formData);
      toast.success("New agent added successfully 🎉");
      navigate("/agents");
    } catch (err) {
      toast.error(err.message || "Failed to create agent");
    }
  };

  return (
  <div className="d-flex flex-column flex-md-row min-vh-100">
  <SideBar />
  <main className="flex-fill p-3 p-md-4">
        <div className="card shadow-sm">
          <div className="card-body">
            <h2 className="card-title mb-4">Add New Agent</h2>

            <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
              <div className="form-group">
                <label>Name:</label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Email:</label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="d-flex gap-2">
                <button type="submit" className="btn btn-primary">
                  Add Agent
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
        <ToastContainer position="top-right" autoClose={3000} />
      </main>
    </div>
  );
};

export default AddAgent;

