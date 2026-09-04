import { useNavigate } from "react-router-dom";
import StatCard from "../../components/dashboard/StatCard";
import WorkerShiftInfo from "../../components/worker/WorkerShiftInfo";
import WorkerDailyTasks from "../../components/worker/WorkerDailyTasks";
import WorkerSafetyChecklist from "../../components/worker/WorkerSafetyChecklist";
import { LogOut, AlertOctagon, Wallet, Calendar } from "lucide-react";

function WorkerDashboard() {
  const navigate = useNavigate();

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
    <>
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
            <button
              className="quick-action-item"
              onClick={() => navigate("/worker/attendance")}
            >
              <div className="quick-action-icon user">
                <LogOut size={18} />
              </div>
              <div className="quick-action-content">
                <h4>Clock-in / Punch Out</h4>
                <p>Record daily punch in or end of shift clock-out</p>
              </div>
            </button>

            <button
              className="quick-action-item"
              onClick={() => navigate("/worker/safety")}
            >
              <div className="quick-action-icon alerts">
                <AlertOctagon size={18} />
              </div>
              <div className="quick-action-content">
                <h4>Safety & PPE Rules</h4>
                <p>View mandatory safety rules and emergency contacts</p>
              </div>
            </button>

            <button
              className="quick-action-item"
              onClick={() => navigate("/worker/wages")}
            >
              <div className="quick-action-icon project">
                <Wallet size={18} />
              </div>
              <div className="quick-action-content">
                <h4>Wage Slips & Hours</h4>
                <p>View daily wage earnings and payout history</p>
              </div>
            </button>

            <button
              className="quick-action-item"
              onClick={() => navigate("/worker/shifts")}
            >
              <div className="quick-action-icon manage">
                <Calendar size={18} />
              </div>
              <div className="quick-action-content">
                <h4>Weekly Schedule</h4>
                <p>View upcoming assigned shifts and worksites</p>
              </div>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default WorkerDashboard;
