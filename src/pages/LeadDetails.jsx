import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import SideBar from "../components/SideBar";
import CommentBox from "../components/CommentBox";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LeadDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { leads, fetchComments, comments, addComment, deleteLead } =
    useContext(AppContext);

  const [lead, setLead] = useState(null);

  useEffect(() => {
    const foundLead = leads.find((l) => l._id === id);
    setLead(foundLead);

    if (foundLead) {
      fetchComments(foundLead._id);
    }
  }, [id, leads]);

  const handleDelete = () => {
    if (!lead) return;

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this lead?"
    );
    if (!confirmDelete) return;

    try {
      deleteLead(lead._id);
      toast.success("Lead deleted successfully");
      navigate("/leads"); // redirect after delete
    } catch (err) {
      toast.error("Failed to delete lead: " + err.message);
    }
  };

  const handleEdit = () => {
    navigate(`/edit-lead/${lead._id}`);
  };

  if (!lead) {
    return (
      <div style={{ display: "flex", minHeight: "100vh" }}>
        <SideBar />
        <main style={{ flex: 1, padding: "1rem" }}>
          <p>Loading lead...</p>
        </main>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <SideBar />

      <main style={{ flex: 1, padding: "1rem" }}>
        <h1>{lead.name}</h1>

        <p>
          <strong>Status:</strong> {lead.status}
        </p>
        <p>
          <strong>Source:</strong> {lead.source}
        </p>
        <p>
          <strong>Priority:</strong> {lead.priority}
        </p>
        <p>
          <strong>Time to Close:</strong> {lead.timeToClose} days
        </p>

        <p>
          <strong>Assigned Agent:</strong>{" "}
          {lead.salesAgent?.name || "Unassigned"}
        </p>

        {/* ACTION BUTTONS */}
        <div style={{ marginBottom: "1rem" }}>
          <button
            onClick={handleEdit}
            style={{ marginRight: "10px", cursor: "pointer" }}
          >
            Edit Lead
          </button>

          <button
            onClick={handleDelete}
            style={{ cursor: "pointer", background: "red", color: "white" }}
          >
            Delete Lead
          </button>
        </div>

        <h2>Comments</h2>
        <CommentBox
          leadId={lead._id}
          comments={comments}
          addComment={addComment}
        />

        {/* Toast container */}
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          pauseOnHover
          draggable
        />
      </main>
    </div>
  );
};

export default LeadDetails;
