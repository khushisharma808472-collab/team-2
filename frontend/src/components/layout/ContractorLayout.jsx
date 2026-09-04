import { Outlet } from "react-router-dom";
import ContractorSidebar from "./ContractorSidebar";
import Header from "./Header";
import "../../styles/dashboard.css";
import "../../styles/roleDashboards.css";

function ContractorLayout() {
  return (
    <div className="dashboard-layout">
      <ContractorSidebar />
      <main className="dashboard-main">
        <Header title="Contractor Portal" />
        <div className="dashboard-content">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default ContractorLayout;
