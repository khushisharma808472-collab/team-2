import { useNavigate } from "react-router-dom";
import StatCard from "../../components/dashboard/StatCard";
import SiteProgressCategories from "../../components/siteEngineer/SiteProgressCategories";
import SiteDelayTracker from "../../components/siteEngineer/SiteDelayTracker";
import EquipmentStatusWidget from "../../components/siteEngineer/EquipmentStatusWidget";
import SiteActivityLogs from "../../components/siteEngineer/SiteActivityLogs";
import { PlusCircle, FileText, AlertTriangle, HardHat } from "lucide-react";

function SiteEngineerDashboard() {
  const navigate = useNavigate();

  const getUserName = () => {
    try {
      const storedUser =
        localStorage.getItem("user") || sessionStorage.getItem("user");
      const user = storedUser ? JSON.parse(storedUser) : null;
      if (user && user.role === "site_engineer" && user.name) {
        return user.name;
      }
    } catch {
      // fallback
    }
    return "Site Engineer";
  };
  const userName = getUserName();

  return (
    <>
      {/* WELCOME SECTION */}
      <div className="welcome-section">
        <div>
          <h1>Welcome back, {userName}! 👷</h1>
          <p>Site progress monitoring, inspections, and machinery operations.</p>
        </div>

        <button className="date-button">
          📅 Today, 26 Aug 2026
        </button>
      </div>

      {/* KPI STATISTICS */}
      <div className="stats-grid">
        <StatCard
          title="ASSIGNED ZONES"
          value="4 Sites"
          change="Active"
          type="projects"
        />
        <StatCard
          title="OVERALL COMPLETION"
          value="72.4%"
          change="4.2%"
          type="active"
        />
        <StatCard
          title="INSPECTIONS TODAY"
          value="18"
          change="94% pass"
          type="users"
        />
        <StatCard
          title="SITE DELAYS / ISSUES"
          value="3"
          change="2 critical"
          type="alerts"
        />
        <StatCard
          title="MACHINERY ON SITE"
          value="12 Units"
          change="85% uptime"
          type="pending"
        />
      </div>

      {/* MAIN WIDGETS GRID */}
      <div className="dashboard-grid role-grid">
        {/* 1. Progress by Construction Phase */}
        <SiteProgressCategories />

        {/* 2. Delay & Milestone Tracker */}
        <SiteDelayTracker />

        {/* 3. Site Activity & Inspection Logs */}
        <SiteActivityLogs />

        {/* 4. Machinery & Equipment Availability */}
        <EquipmentStatusWidget />

        {/* 5. Site Quick Actions */}
        <div className="dashboard-card quick-actions-card">
          <div className="card-header">
            <h3>Site Quick Actions</h3>
          </div>

          <div className="quick-actions-list">
            <button
              className="quick-action-item"
              onClick={() => navigate("/site-engineer/daily-reports")}
            >
              <div className="quick-action-icon project">
                <FileText size={18} />
              </div>
              <div className="quick-action-content">
                <h4>Log Daily Report</h4>
                <p>Submit daily site progress and workforce counts</p>
              </div>
            </button>

            <button
              className="quick-action-item"
              onClick={() => navigate("/site-engineer/inspections")}
            >
              <div className="quick-action-icon user">
                <HardHat size={18} />
              </div>
              <div className="quick-action-content">
                <h4>Record Inspection</h4>
                <p>Log rebar, concrete, or safety checks</p>
              </div>
            </button>

            <button
              className="quick-action-item"
              onClick={() => navigate("/site-engineer/delays")}
            >
              <div className="quick-action-icon alerts">
                <AlertTriangle size={18} />
              </div>
              <div className="quick-action-content">
                <h4>Report Site Delay</h4>
                <p>Log weather, material, or design bottlenecks</p>
              </div>
            </button>

            <button
              className="quick-action-item"
              onClick={() => navigate("/site-engineer/equipment")}
            >
              <div className="quick-action-icon manage">
                <PlusCircle size={18} />
              </div>
              <div className="quick-action-content">
                <h4>Request Equipment</h4>
                <p>Requisition cranes, transit mixers, or tools</p>
              </div>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default SiteEngineerDashboard;
