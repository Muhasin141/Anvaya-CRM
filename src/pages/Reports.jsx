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

  const leadsByAgent = useMemo(() => {
    const counts = {};
    agents.forEach((agent) => (counts[agent.name] = 0));
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

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div className="d-flex flex-column flex-md-row min-vh-100">
      {/* Sidebar */}
      <SideBar />

      {/* Main Content */}
      <main className="flex-fill p-3 p-md-4">
        <h1 className="mb-4">Anvaya CRM Reports</h1>

        {/* Pipeline vs Closed */}
        <div className="card mb-4 shadow-sm">
          <div className="card-body">
            <h5 className="card-title">Pipeline vs Closed</h5>
            <div
              className="w-100"
              style={{ maxWidth: "500px", height: "300px" }}
            >
              <Pie data={pipelineVsClosed} options={chartOptions} />
            </div>
          </div>
        </div>

        {/* Leads Closed by Agent */}
        <div className="card mb-4 shadow-sm">
          <div className="card-body">
            <h5 className="card-title">Leads Closed by Sales Agent</h5>
            <div
              className="w-100"
              style={{ maxWidth: "700px", height: "400px" }}
            >
              <Bar data={leadsByAgent} options={chartOptions} />
            </div>
          </div>
        </div>

        {/* Lead Status Distribution */}
        <div className="card mb-4 shadow-sm">
          <div className="card-body">
            <h5 className="card-title">Lead Status Distribution</h5>
            <div
              className="w-100"
              style={{ maxWidth: "500px", height: "300px" }}
            >
              <Pie data={statusDistribution} options={chartOptions} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Reports;


