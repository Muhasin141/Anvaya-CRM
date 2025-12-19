import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import SideBar from "../components/SideBar";
import CommentBox from "../components/CommentBox";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";

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
    if (!window.confirm("Are you sure you want to delete this lead?")) return;

    try {
      deleteLead(lead._id);
      toast.success("Lead deleted successfully");
      navigate("/leads");
    } catch (err) {
      toast.error("Failed to delete lead: " + err.message);
    }
  };

  const handleEdit = () => {
    navigate(`/edit-lead/${lead._id}`);
  };

  if (!lead) {
    return (
      <div className="d-flex min-vh-100">
        <SideBar />
        <main className="flex-fill p-3 p-md-4">
          <p>Loading lead...</p>
        </main>
      </div>
    );
  }

  return (
    <div className="d-flex min-vh-100">
      {/* Sidebar */}
      <SideBar />

      {/* Main Content */}
      <main className="flex-fill p-3 p-md-4" style={{ minWidth: 0 }}>
        <h1 className="mb-4">Lead Details</h1>

        {/* Lead Card */}
        <div className="card mb-4 shadow-sm">
          <div className="card-body">
            <h2 className="card-title">{lead.name}</h2>
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

            {/* Action Buttons */}
            <div className="mt-3 d-flex flex-wrap gap-2">
              <button className="btn btn-primary" onClick={handleEdit}>
                Edit Lead
              </button>
              <button className="btn btn-danger" onClick={handleDelete}>
                Delete Lead
              </button>
            </div>
          </div>
        </div>

        {/* Comments Card */}
        <div className="card shadow-sm">
          <div className="card-body">
            <h3 className="card-title">Comments</h3>
            <CommentBox
              leadId={lead._id}
              comments={comments}
              addComment={addComment}
            />
          </div>
        </div>

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
