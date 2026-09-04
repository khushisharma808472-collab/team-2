import { useNavigate } from "react-router-dom";
import StatCard from "../../components/dashboard/StatCard";
import WorkforceTradeAllocation from "../../components/contractor/WorkforceTradeAllocation";
import ContractorWorkOrders from "../../components/contractor/ContractorWorkOrders";
import MaterialRequestsWidget from "../../components/contractor/MaterialRequestsWidget";
import { UserCheck, PackagePlus, HardHat, ClipboardCheck } from "lucide-react";

function ContractorDashboard() {
  const navigate = useNavigate();

  const getUserName = () => {
    try {
      const storedUser =
        localStorage.getItem("user") || sessionStorage.getItem("user");
      const user = storedUser ? JSON.parse(storedUser) : null;
      if (user && user.role === "contractor" && user.name) {
        return user.name;
      }
    } catch {
      // fallback
    }
    return "Contractor";
  };
  const userName = getUserName();

  return (
    <>
      {/* WELCOME SECTION */}
      <div className="welcome-section">
        <div>
          <h1>Welcome back, {userName}! 🏗️</h1>
          <p>Workforce deployment, work package status, and material requisitions.</p>
        </div>

        <button className="date-button">
          📅 Today, 26 Aug 2026
        </button>
      </div>

      {/* KPI STATISTICS */}
      <div className="stats-grid">
        <StatCard
          title="ACTIVE CREW ON-SITE"
          value="168"
          change="12%"
          type="users"
        />
        <StatCard
          title="ATTENDANCE RATE"
          value="96.4%"
          change="2.1%"
          type="active"
        />
        <StatCard
          title="ACTIVE WORK ORDERS"
          value="4"
          change="8% on time"
          type="projects"
        />
        <StatCard
          title="MATERIAL REQUISITIONS"
          value="6"
          change="1 pending"
          type="pending"
        />
        <StatCard
          title="MACHINERY DEPLOYED"
          value="8 Units"
          change="Active"
          type="alerts"
        />
      </div>

      {/* MAIN WIDGETS GRID */}
      <div className="dashboard-grid role-grid">
        {/* 1. Workforce Allocation by Trade */}
        <WorkforceTradeAllocation />

        {/* 2. Active Work Orders */}
        <ContractorWorkOrders />

        {/* 3. Material Requests & Requisitions */}
        <MaterialRequestsWidget />

        {/* 4. Contractor Quick Actions */}
        <div className="dashboard-card quick-actions-card">
          <div className="card-header">
            <h3>Contractor Actions</h3>
          </div>

          <div className="quick-actions-list">
            <button
              className="quick-action-item"
              onClick={() => navigate("/contractor/attendance")}
            >
              <div className="quick-action-icon user">
                <UserCheck size={18} />
              </div>
              <div className="quick-action-content">
                <h4>Log Daily Attendance</h4>
                <p>Mark crew presence and shifts</p>
              </div>
            </button>

            <button
              className="quick-action-item"
              onClick={() => navigate("/contractor/material-requests")}
            >
              <div className="quick-action-icon project">
                <PackagePlus size={18} />
              </div>
              <div className="quick-action-content">
                <h4>Request Materials</h4>
                <p>Order cement, steel, or aggregate</p>
              </div>
            </button>

            <button
              className="quick-action-item"
              onClick={() => navigate("/contractor/work-orders")}
            >
              <div className="quick-action-icon manage">
                <ClipboardCheck size={18} />
              </div>
              <div className="quick-action-content">
                <h4>Update Work Order</h4>
                <p>Log milestone completion percentages</p>
              </div>
            </button>

            <button
              className="quick-action-item"
              onClick={() => navigate("/contractor/equipment")}
            >
              <div className="quick-action-icon alerts">
                <HardHat size={18} />
              </div>
              <div className="quick-action-content">
                <h4>Report Incident / Equipment</h4>
                <p>Notify Site Engineer of machinery or stoppages</p>
              </div>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ContractorDashboard;
