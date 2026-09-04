import ProjectStats from "../../components/projectManager/ProjectStats";
import ProjectProgress from "../../components/projectManager/ProjectProgress";
import BudgetUtilization from "../../components/projectManager/BudgetUtilization";

function ProjectManagerDashboard() {
  return (
    <>
      <div className="pm-welcome-section">
        <h1>Good Morning, Project Manager! 👋</h1>
        <p>Here's what's happening with your projects today.</p>
      </div>

      <ProjectStats />

      <div className="pm-charts-grid">
        <ProjectProgress />
        <BudgetUtilization />
      </div>
    </>
  );
}

export default ProjectManagerDashboard;