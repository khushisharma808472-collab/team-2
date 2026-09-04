import { Outlet } from "react-router-dom";
import WorkerSidebar from "./WorkerSidebar";
import Header from "./Header";
import "../../styles/dashboard.css";
import "../../styles/roleDashboards.css";

function WorkerLayout() {
  return (
    <div className="dashboard-layout">
      <WorkerSidebar />
      <main className="dashboard-main">
        <Header title="Worker Portal" />
        <div className="dashboard-content">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default WorkerLayout;
