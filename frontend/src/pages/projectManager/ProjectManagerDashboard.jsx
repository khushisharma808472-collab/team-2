import ProjectManagerSidebar from "../../components/layout/ProjectManagerSidebar";
import ProjectManagerHeader from "../../components/layout/ProjectManagerHeader";
import ProjectStats from "../../components/projectManager/ProjectStats";
import ProjectProgress from "../../components/projectManager/ProjectProgress";
import BudgetUtilization from "../../components/projectManager/BudgetUtilization";

import "../../styles/projectManagerDashboard.css";

function ProjectManagerDashboard() {
  return (
    <div className="pm-dashboard-layout">
      <ProjectManagerSidebar />

      <div className="pm-main-section">
        <ProjectManagerHeader />

        <main className="pm-dashboard-content">
          <div className="pm-welcome-section">
            <h1>Good Morning, Project Manager! 👋</h1>

            <p>
              Here's what's happening with your projects today.
            </p>
          </div>

          <ProjectStats />

          <div className="pm-charts-grid">
            <ProjectProgress />

            <BudgetUtilization />
          </div>
        </main>
      </div>
    </div>
  );
}

export default ProjectManagerDashboard;