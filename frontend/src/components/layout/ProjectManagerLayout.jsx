import { Outlet } from "react-router-dom";
import ProjectManagerSidebar from "./ProjectManagerSidebar";
import ProjectManagerHeader from "./ProjectManagerHeader";
import "../../styles/projectManagerDashboard.css";

function ProjectManagerLayout() {
  return (
    <div className="pm-dashboard-layout">
      <ProjectManagerSidebar />
      <div className="pm-main-section">
        <ProjectManagerHeader />
        <main className="pm-dashboard-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default ProjectManagerLayout;
