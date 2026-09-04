import { Outlet } from "react-router-dom";
import SiteEngineerSidebar from "./SiteEngineerSidebar";
import Header from "./Header";
import "../../styles/dashboard.css";
import "../../styles/roleDashboards.css";

function SiteEngineerLayout() {
  return (
    <div className="dashboard-layout">
      <SiteEngineerSidebar />
      <main className="dashboard-main">
        <Header title="Site Engineer Dashboard" />
        <div className="dashboard-content">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default SiteEngineerLayout;
