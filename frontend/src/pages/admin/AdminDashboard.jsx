import Sidebar from "../../components/layout/Sidebar";
import Header from "../../components/layout/Header";

import StatCard from "../../components/dashboard/StatCard";
import ProjectOverview from "../../components/dashboard/ProjectOverview";
import SystemAnalytics from "../../components/dashboard/SystemAnalytics";
import RecentActivity from "../../components/dashboard/RecentActivity";
import UserRolesChart from "../../components/dashboard/UserRolesChart";
import ProjectStatus from "../../components/dashboard/ProjectStatus";
import QuickActions from "../../components/dashboard/QuickActions";

import "../../styles/dashboard.css";

function AdminDashboard() {
  return (
    <div className="dashboard-layout">

      <Sidebar />

      <main className="dashboard-main">

        <Header />

        <div className="dashboard-content">

          {/* Welcome Section */}
          <div className="welcome-section">
            <div>
              <h1>Welcome back, Admin! 👋</h1>
              <p>Here's an overview of the system and all projects.</p>
            </div>

            <button className="date-button">
              📅 26 Aug 2026
            </button>
          </div>

          {/* Statistics */}
          <div className="stats-grid">

            <StatCard
              title="TOTAL USERS"
              value="256"
              change="12%"
              type="users"
            />

            <StatCard
              title="TOTAL PROJECTS"
              value="48"
              change="8%"
              type="projects"
            />

            <StatCard
              title="ACTIVE PROJECTS"
              value="32"
              change="15%"
              type="active"
            />

            <StatCard
              title="PENDING APPROVALS"
              value="14"
              change="5%"
              type="pending"
            />

            <StatCard
              title="SYSTEM ALERTS"
              value="7"
              change="12%"
              type="alerts"
            />

          </div>

          {/* Dashboard Grid */}
          <div className="dashboard-grid">

            <ProjectOverview />

            <SystemAnalytics />

            <RecentActivity />

            <UserRolesChart />

            <ProjectStatus />

            <QuickActions />

          </div>

        </div>

      </main>

    </div>
  );
}

export default AdminDashboard;