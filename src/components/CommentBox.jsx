import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CommentBox = ({ leadId, comments, addComment }) => {
  const { agents } = useContext(AppContext);

  const [commentText, setCommentText] = useState("");
  const [author, setAuthor] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!commentText.trim() || !author) {
      toast.warning("Please select an agent and enter a comment.");
      return;
    }

    try {
      await addComment(leadId, commentText, author);
      toast.success("Comment added successfully!");
      setCommentText("");
      setAuthor("");
    } catch (err) {
      console.error("Failed to add comment:", err);
      toast.error("Failed to add comment.");
    }
  };

  return (
    <div>
      {/* Add Comment Form */}
      <form onSubmit={handleSubmit} className="mb-3 d-flex flex-wrap gap-2">
        <select
          className="form-select"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
          style={{ minWidth: "200px" }}
        >
          <option value="">Select Agent</option>
          {agents.map((agent) => (
            <option key={agent._id} value={agent._id}>
              {agent.name}
            </option>
          ))}
        </select>

        <input
          type="text"
          className="form-control"
          placeholder="Add a comment"
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          required
          style={{ flex: "1" }}
        />

        <button type="submit" className="btn btn-primary">
          Add Comment
        </button>
      </form>

      {/* Comments List */}
      <div className="list-group">
        {comments.length === 0 ? (
          <p className="text-muted">No comments yet.</p>
        ) : (
          comments.map((comment) => (
            <div
              key={comment._id}
              className="list-group-item list-group-item-light mb-2"
            >
              <strong>{comment.author?.name || "Unknown Agent"}</strong>
              <p className="mb-0">{comment.commentText}</p>
            </div>
          ))
        )}
      </div>

      {/* Toast container */}
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default CommentBox;

