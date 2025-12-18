import React, { createContext, useState, useEffect } from "react";

export const AppContext = createContext();

const API_URL = "https://anvaya-backend-tan.vercel.app";

const AppProvider = ({ children }) => {
  const [leads, setLeads] = useState([]);
  const [agents, setAgents] = useState([]);
  const [tags, setTags] = useState([]);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);

  // -------------------- FETCH LEADS --------------------
  const fetchLeads = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_URL}/leads`);
      const data = await res.json();
      setLeads(data);
    } catch (err) {
      console.error("Fetch leads failed:", err);
    } finally {
      setLoading(false);
    }
  };

  // -------------------- FETCH AGENTS --------------------
  const fetchAgents = async () => {
    try {
      const res = await fetch(`${API_URL}/agents`);
      const data = await res.json();
      setAgents(data);
    } catch (err) {
      console.error("Fetch agents failed:", err);
    }
  };

  // -------------------- FETCH TAGS --------------------
  const fetchTags = async () => {
    try {
      const res = await fetch(`${API_URL}/tags`);
      const data = await res.json();
      setTags(data);
    } catch (err) {
      console.error("Fetch tags failed:", err);
    }
  };

  // -------------------- CREATE LEAD --------------------
  const createLead = async (lead) => {
    try {
      const res = await fetch(`${API_URL}/leads`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(lead),
      });

      const data = await res.json();

      if (!res.ok) {
        // Throw an error so the frontend catch block can handle it
        throw new Error(data.error || "Failed to create lead");
      }

      // Only update leads if request succeeded
      setLeads((prev) => [...prev, data]);
      return data; // optional: return the newly created lead
    } catch (err) {
      console.error("Error creating lead:", err);
      throw err; // rethrow to be handled in component
    }
  };

  // -------------------- UPDATE LEAD --------------------
  // -------------------- UPDATE LEAD --------------------
  const updateLead = async (id, payload) => {
    try {
      // Convert timeToClose to number
      if (payload.timeToClose)
        payload.timeToClose = Number(payload.timeToClose);

      // Remove salesAgent if empty
      if (!payload.salesAgent) delete payload.salesAgent;

      const res = await fetch(`${API_URL}/leads/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to update lead");
      }

      setLeads((prev) => prev.map((lead) => (lead._id === id ? data : lead)));
      return data;
    } catch (err) {
      console.error("Update lead failed:", err);
      throw err;
    }
  };

  // -------------------- DELETE LEAD --------------------
  const deleteLead = async (id) => {
    try {
      await fetch(`${API_URL}/leads/${id}`, { method: "DELETE" });
      setLeads((prev) => prev.filter((lead) => lead._id !== id));
    } catch (err) {
      console.error("Delete lead failed:", err);
    }
  };

  // -------------------- FETCH COMMENTS --------------------
  const fetchComments = async (leadId) => {
    try {
      const res = await fetch(`${API_URL}/leads/${leadId}/comments`);
      const data = await res.json();
      setComments(data);
    } catch (err) {
      console.error("Fetch comments failed:", err);
    }
  };

  // -------------------- ADD COMMENT --------------------
  const addComment = async (leadId, commentText, authorId) => {
    try {
      const res = await fetch(`${API_URL}/leads/${leadId}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ commentText, author: authorId }),
      });
      const data = await res.json();

      // Find the agent name from agents list
      const agent = agents.find((a) => a._id === authorId);
      const populatedComment = {
        ...data,
        author: { _id: authorId, name: agent ? agent.name : "Unknown Agent" },
      };

      setComments((prev) => [...prev, populatedComment]);
    } catch (err) {
      console.error("Add comment failed:", err);
      throw err;
    }
  };

  const createAgent = async (agent) => {
    try {
      const res = await fetch(`${API_URL}/agents`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(agent),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to create agent");
      }

      setAgents((prev) => [...prev, data]);
      return data;
    } catch (error) {
      console.error("Create agent failed:", error);
      throw error;
    }
  };

  const deleteAgent = async (id) => {
    const res = await fetch(`${API_URL}/agents/${id}`, {
      method: "DELETE",
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || "Failed to delete agent");
    }

    setAgents((prev) => prev.filter((agent) => agent._id !== id));
  };

  // -------------------- UPDATE AGENT --------------------
  const updateAgent = async (id, payload) => {
    try {
      const res = await fetch(`${API_URL}/agents/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to update agent");
      }

      setAgents((prev) =>
        prev.map((agent) => (agent._id === id ? data : agent))
      );

      return data;
    } catch (err) {
      console.error("Update agent failed:", err);
      throw err;
    }
  };

  // -------------------- INITIAL LOAD --------------------
  useEffect(() => {
    fetchLeads();
    fetchAgents();
    fetchTags();
  }, []);

  return (
    <AppContext.Provider
      value={{
        leads,
        agents,
        tags,
        comments,
        loading,
        fetchLeads,
        fetchComments,
        createLead,
        updateLead,
        deleteLead,
        addComment,
        createAgent,
        deleteAgent,
        updateAgent,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
