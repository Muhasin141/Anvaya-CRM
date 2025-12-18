import React, { useContext, useMemo } from "react";
import { AppContext } from "../context/AppContext";
import SideBar from "../components/SideBar";

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";

import { Pie, Bar } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
);

const Reports = () => {
  const { leads, agents } = useContext(AppContext);

  // ------------------------------
  // 1. Pipeline vs Closed
  // ------------------------------
  const pipelineVsClosed = useMemo(() => {
    const closed = leads.filter((l) => l.status === "Closed").length;
    const pipeline = leads.length - closed;

    return {
      labels: ["Pipeline", "Closed"],
      datasets: [
        {
          data: [pipeline, closed],
          backgroundColor: ["#36A2EB", "#4CAF50"],
        },
      ],
    };
  }, [leads]);

  // ------------------------------
  // 2. Leads Closed by Agent
  // ------------------------------
  const leadsByAgent = useMemo(() => {
    const counts = {};

    agents.forEach((agent) => {
      counts[agent.name] = 0;
    });

    leads.forEach((lead) => {
      if (lead.status === "Closed" && lead.salesAgent) {
        counts[lead.salesAgent.name]++;
      }
    });

    return {
      labels: Object.keys(counts),
      datasets: [
        {
          label: "Leads Closed",
          data: Object.values(counts),
          backgroundColor: "#FF9800",
        },
      ],
    };
  }, [leads, agents]);

  // ------------------------------
  // 3. Lead Status Distribution
  // ------------------------------
  const statusDistribution = useMemo(() => {
    const statuses = {};

    leads.forEach((lead) => {
      statuses[lead.status] = (statuses[lead.status] || 0) + 1;
    });

    return {
      labels: Object.keys(statuses),
      datasets: [
        {
          data: Object.values(statuses),
          backgroundColor: [
            "#2196F3",
            "#FFC107",
            "#9C27B0",
            "#4CAF50",
            "#F44336",
          ],
        },
      ],
    };
  }, [leads]);

  // Chart options for responsiveness
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false, // allows height to be flexible
  };

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        flexDirection: "row",
      }}
      className="layout"
    >
      <SideBar />

      <main
        style={{
          flex: 1,
          padding: "1.5rem",
          minWidth: 0,
        }}
      >
        <h1>Anvaya CRM Reports</h1>

        {/* Pipeline vs Closed */}
        <section style={{ marginBottom: "2rem" }}>
          <h3>Total Leads: Pipeline vs Closed</h3>
          <div style={{ width: "100%", maxWidth: "500px", height: "300px" }}>
            <Pie data={pipelineVsClosed} options={chartOptions} />
          </div>
        </section>

        {/* Leads Closed by Agent */}
        <section style={{ marginBottom: "2rem" }}>
          <h3>Leads Closed by Sales Agent</h3>
          <div style={{ width: "100%", maxWidth: "700px", height: "400px" }}>
            <Bar data={leadsByAgent} options={chartOptions} />
          </div>
        </section>

        {/* Lead Status Distribution */}
        <section>
          <h3>Lead Status Distribution</h3>
          <div style={{ width: "100%", maxWidth: "500px", height: "300px" }}>
            <Pie data={statusDistribution} options={chartOptions} />
          </div>
        </section>
      </main>

      {/* Responsive layout for small screens */}
      <style>
        {`
          @media (max-width: 768px) {
            .layout {
              flex-direction: column;
            }
          }
        `}
      </style>
    </div>
  );
};

export default Reports;
