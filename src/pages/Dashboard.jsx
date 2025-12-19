import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import LeadCard from "../components/LeadCard";
import SideBar from "../components/SideBar";

const Dashboard = () => {
  const { leads, loading } = useContext(AppContext);
  const [selectedStatus, setSelectedStatus] = useState("All");

  const newLeads = leads.filter((lead) => lead.status === "New");
  const contactedLeads = leads.filter((lead) => lead.status === "Contacted");
  const qualifiedLeads = leads.filter((lead) => lead.status === "Qualified");

  const filteredLeads =
    selectedStatus === "All"
      ? leads
      : leads.filter((lead) => lead.status === selectedStatus);

  return (
    <div className="d-flex min-vh-100">
      <SideBar />

      <main className="flex-fill p-3 p-md-4">
        <h1 className="mb-4">Anvaya CRM Dashboard</h1>

        {loading && <p>Loading leads...</p>}

        {/* STATUS SUMMARY CARDS */}
        <section className="mb-4">
          <div className="row g-3">
            <div className="col-12 col-md-4">
              <div className="card text-center shadow-sm">
                <div className="card-body">
                  <h6 className="text-muted">New Leads</h6>
                  <h3 className="text-primary">{newLeads.length}</h3>
                </div>
              </div>
            </div>

            <div className="col-12 col-md-4">
              <div className="card text-center shadow-sm">
                <div className="card-body">
                  <h6 className="text-muted">Contacted</h6>
                  <h3 className="text-warning">{contactedLeads.length}</h3>
                </div>
              </div>
            </div>

            <div className="col-12 col-md-4">
              <div className="card text-center shadow-sm">
                <div className="card-body">
                  <h6 className="text-muted">Qualified</h6>
                  <h3 className="text-success">{qualifiedLeads.length}</h3>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* QUICK FILTERS */}
        <section className="mb-4">
          <h5 className="mb-2">Quick Filters</h5>

          <div className="d-flex flex-wrap gap-2">
            {["All", "New", "Contacted", "Qualified"].map((status) => (
              <button
                key={status}
                onClick={() => setSelectedStatus(status)}
                className={`btn btn-sm ${
                  selectedStatus === status
                    ? "btn-primary"
                    : "btn-outline-secondary"
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </section>

        {/* LEAD LIST */}
        <section>
          <h5 className="mb-3">Leads</h5>

          {filteredLeads.length === 0 && (
            <div className="alert alert-info">No leads found</div>
          )}

          <div className="row g-3">
            {filteredLeads.map((lead) => (
              <div key={lead._id} className="col-12 col-md-6 col-lg-4">
                <LeadCard lead={lead} />
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;

