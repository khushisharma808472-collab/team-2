import { Outlet } from "react-router-dom";
import ClientSidebar from "./ClientSidebar";
import Header from "./Header";
import "../../styles/dashboard.css";
import "../../styles/roleDashboards.css";

function ClientLayout() {
  return (
    <div className="dashboard-layout">
      <ClientSidebar />
      <main className="dashboard-main">
        <Header title="Client Portal" />
        <div className="dashboard-content">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default ClientLayout;
