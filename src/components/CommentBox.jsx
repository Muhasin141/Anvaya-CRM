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
      toast.warning("Please select an agent and enter a comment."); // Warning toast for empty input
      return;
    }

    try {
      await addComment(leadId, commentText, author);
      toast.success("Comment added successfully!"); // Success toast
      setCommentText("");
      setAuthor("");
    } catch (err) {
      console.error("Failed to add comment:", err);
      toast.error("Failed to add comment."); // Error toast
    }
  };

  return (
    <div>
      {/* Add Comment Form */}
      <form onSubmit={handleSubmit} style={{ marginBottom: "1rem" }}>
        {/* Agent Dropdown */}
        <select
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
          style={{ marginRight: "10px" }}
        >
          <option value="">Select Agent</option>
          {agents.map((agent) => (
            <option key={agent._id} value={agent._id}>
              {agent.name}
            </option>
          ))}
        </select>

        {/* Comment Input */}
        <input
          type="text"
          placeholder="Add a comment"
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          required
          style={{ marginRight: "10px", width: "300px" }}
        />

        <button type="submit">Add Comment</button>
      </form>

      {/* Comments List */}
      <div>
        {comments.length === 0 ? (
          <p>No comments yet.</p>
        ) : (
          comments.map((comment) => (
            <div
              key={comment._id}
              style={{
                border: "1px solid #ddd",
                padding: "0.5rem",
                marginBottom: "0.5rem",
              }}
            >
              <strong>{comment.author?.name || "Unknown Agent"}</strong>
              <p>{comment.commentText}</p>
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
