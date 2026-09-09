import { useEffect, useState } from "react";

import ProjectStats from "../../components/projectManager/ProjectStats";
import ProjectProgress from "../../components/projectManager/ProjectProgress";
import BudgetUtilization from "../../components/projectManager/BudgetUtilization";

import api from "../../services/api";

function ProjectManagerDashboard() {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);

        const response = await api.get(
          "/projects/dashboard"
        );

        if (response.data.success) {
          setDashboardData(response.data);
        }
      } catch (error) {
        console.error(
          "Failed to fetch Project Manager dashboard:",
          error.response?.data || error.message
        );
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const stats = dashboardData?.stats || {};

  const projectProgressData =
    dashboardData?.projectProgressData || [];

  const budgetData =
    dashboardData?.budgetData || {};

  return (
    <>
      <div className="pm-welcome-section">
        <h1>Good Morning, Project Manager! 👋</h1>

        <p>
          Here's what's happening with your projects today.
        </p>
      </div>

      {loading ? (
        <div
          style={{
            padding: "40px",
            textAlign: "center",
          }}
        >
          Loading dashboard...
        </div>
      ) : (
        <>
          <ProjectStats stats={stats} />

          <div className="pm-charts-grid">
            <ProjectProgress
              data={projectProgressData}
            />

            <BudgetUtilization
              data={budgetData}
            />
          </div>
        </>
      )}
    </>
  );
}

export default ProjectManagerDashboard;