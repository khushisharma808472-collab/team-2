import SystemAnalytics from "../../components/dashboard/SystemAnalytics";
import UserRolesChart from "../../components/dashboard/UserRolesChart";
import ProjectStatus from "../../components/dashboard/ProjectStatus";
import StatCard from "../../components/dashboard/StatCard";

function AdminAnalytics() {
  return (
    <>
      <div className="welcome-section">
        <div>
          <h1>System & Project Analytics 📈</h1>
          <p>System traffic, project delivery trends, milestone velocity, and role distribution.</p>
        </div>
        <button className="date-button">📅 This Month</button>
        
      </div>

      <div className="stats-grid">
        <StatCard title="SYSTEM UPTIME" value="99.98%" change="Optimal" type="active" />
        <StatCard title="AVG SPRINT VELOCITY" value="84.2%" change="+6.1%" type="projects" />
        <StatCard title="API RESPONSE" value="42 ms" change="Fast" type="users" />
        <StatCard title="COST VARIANCE" value="-2.4%" change="Under budget" type="pending" />
        <StatCard title="CRITICAL SNAGS" value="0" change="All cleared" type="alerts" />
      </div>

      <div className="dashboard-grid">
        <SystemAnalytics />
        <UserRolesChart />
        <ProjectStatus />
      </div>
    </>
  );
}

export default AdminAnalytics;
