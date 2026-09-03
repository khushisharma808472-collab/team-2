import WorkerSidebar from "../../components/layout/WorkerSidebar";
import Header from "../../components/layout/Header";
import StatCard from "../../components/dashboard/StatCard";
import WorkerShiftInfo from "../../components/worker/WorkerShiftInfo";
import WorkerDailyTasks from "../../components/worker/WorkerDailyTasks";
import WorkerSafetyChecklist from "../../components/worker/WorkerSafetyChecklist";
import { LogOut, AlertOctagon, Wallet, Calendar } from "lucide-react";
import "../../styles/dashboard.css";
import "../../styles/roleDashboards.css";

function WorkerDashboard() {
  const getUserName = () => {
    try {
      const storedUser =
        localStorage.getItem("user") || sessionStorage.getItem("user");
      const user = storedUser ? JSON.parse(storedUser) : null;
      if (user && user.role === "worker" && user.name) {
        return user.name;
      }
    } catch {
      // fallback
    }
    return "Site Worker";
  };
  const userName = getUserName();

  return (
    <div className="dashboard-layout">
      {/* WORKER SIDEBAR */}
      <WorkerSidebar />

      {/* MAIN CONTENT AREA */}
      <main className="dashboard-main">
        <Header title="Worker Dashboard" />

        <div className="dashboard-content">
          {/* WELCOME SECTION */}
          <div className="welcome-section">
            <div>
              <h1>Welcome back, {userName}! 🔨</h1>
              <p>Daily shift assignments, task checklists, and site safety protocols.</p>
            </div>

            <button className="date-button">
              📅 Today, 26 Aug 2026
            </button>
          </div>

          {/* KPI STATISTICS */}
          <div className="stats-grid">
            <StatCard
              title="ASSIGNED SITE"
              value="Tower A"
              change="Floor 8 Core"
              type="projects"
            />
            <StatCard
              title="TODAY'S SHIFT"
              value="Punched In"
              change="07:52 AM"
              type="active"
            />
            <StatCard
              title="HOURS THIS WEEK"
              value="36.5h"
              change="+2h OT"
              type="users"
            />
            <StatCard
              title="MONTHLY ATTENDANCE"
              value="22 / 24 Days"
              change="91.6%"
              type="pending"
            />
            <StatCard
              title="SAFETY COMPLIANCE"
              value="100%"
              change="PPE Verified"
              type="alerts"
            />
          </div>

          {/* MAIN WIDGETS GRID */}
          <div className="dashboard-grid role-grid">
            {/* 1. Shift & Duty Details */}
            <WorkerShiftInfo />

            {/* 2. Daily Tasks Checklist */}
            <WorkerDailyTasks />

            {/* 3. Safety Clearance & PPE */}
            <WorkerSafetyChecklist />

            {/* 4. Worker Quick Actions */}
            <div className="dashboard-card quick-actions-card">
              <div className="card-header">
                <h3>Worker Actions</h3>
              </div>

              <div className="quick-actions-list">
                <button className="quick-action-item">
                  <div className="quick-action-icon user">
                    <LogOut size={18} />
                  </div>
                  <div className="quick-action-content">
                    <h4>Punch Out / End Shift</h4>
                    <p>Clock out at the end of daily duty</p>
                  </div>
                </button>

                <button className="quick-action-item">
                  <div className="quick-action-icon alerts">
                    <AlertOctagon size={18} />
                  </div>
                  <div className="quick-action-content">
                    <h4>Report Hazard / Snag</h4>
                    <p>Report safety issues to Site Engineer</p>
                  </div>
                </button>

                <button className="quick-action-item">
                  <div className="quick-action-icon project">
                    <Wallet size={18} />
                  </div>
                  <div className="quick-action-content">
                    <h4>Wage Slip & Balance</h4>
                    <p>View daily wage earnings and payouts</p>
                  </div>
                </button>

                <button className="quick-action-item">
                  <div className="quick-action-icon manage">
                    <Calendar size={18} />
                  </div>
                  <div className="quick-action-content">
                    <h4>Request Day Off</h4>
                    <p>Submit advance leave request to supervisor</p>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default WorkerDashboard;

