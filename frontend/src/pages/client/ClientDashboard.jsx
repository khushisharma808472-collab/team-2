import { useNavigate } from "react-router-dom";
import StatCard from "../../components/dashboard/StatCard";
import ClientMilestoneTimeline from "../../components/client/ClientMilestoneTimeline";
import ClientFinancialOverview from "../../components/client/ClientFinancialOverview";
import ClientSiteUpdates from "../../components/client/ClientSiteUpdates";
import { Download, Receipt, PhoneCall, Eye } from "lucide-react";

function ClientDashboard() {
  const navigate = useNavigate();

  const getUserName = () => {
    try {
      const storedUser =
        localStorage.getItem("user") || sessionStorage.getItem("user");
      const user = storedUser ? JSON.parse(storedUser) : null;
      if (user && user.role === "client" && user.name) {
        return user.name;
      }
    } catch {
      // fallback
    }
    return "Client";
  };
  const userName = getUserName();

  return (
    <>
      {/* WELCOME SECTION */}
      <div className="welcome-section">
        <div>
          <h1>Welcome back, {userName}! 🏢</h1>
          <p>Real-time construction progress, milestone disbursements, and site verification.</p>
        </div>

        <button className="date-button">
          📅 Today, 26 Aug 2026
        </button>
      </div>

      {/* KPI STATISTICS */}
      <div className="stats-grid">
        <StatCard
          title="MY PROJECTS"
          value="2 Sites"
          change="Active"
          type="projects"
        />
        <StatCard
          title="OVERALL COMPLETION"
          value="68.5%"
          change="5.2%"
          type="active"
        />
        <StatCard
          title="TOTAL DISBURSED"
          value="₹ 6.8 Cr"
          change="68% paid"
          type="users"
        />
        <StatCard
          title="MILESTONES SIGNED"
          value="8 / 12"
          change="Quality pass"
          type="pending"
        />
        <StatCard
          title="NEXT HANDOVER"
          value="Aug 2026"
          change="On track"
          type="alerts"
        />
      </div>

      {/* MAIN WIDGETS GRID */}
      <div className="dashboard-grid role-grid">
        {/* 1. Milestone Timeline Roadmap */}
        <ClientMilestoneTimeline />

        {/* 2. Financial Overview & Expenditure */}
        <ClientFinancialOverview />

        {/* 3. Site Updates & Inspection Logs */}
        <ClientSiteUpdates />

        {/* 4. Client Quick Actions */}
        <div className="dashboard-card quick-actions-card">
          <div className="card-header">
            <h3>Client Services</h3>
          </div>

          <div className="quick-actions-list">
            <button
              className="quick-action-item"
              onClick={() => navigate("/client/reports")}
            >
              <div className="quick-action-icon project">
                <Download size={18} />
              </div>
              <div className="quick-action-content">
                <h4>Progress Reports</h4>
                <p>View verified monthly progress summaries</p>
              </div>
            </button>

            <button
              className="quick-action-item"
              onClick={() => navigate("/client/payments")}
            >
              <div className="quick-action-icon user">
                <Receipt size={18} />
              </div>
              <div className="quick-action-content">
                <h4>Milestone Invoices</h4>
                <p>Review and download verified payment receipts</p>
              </div>
            </button>

            <button
              className="quick-action-item"
              onClick={() => navigate("/client/gallery")}
            >
              <div className="quick-action-icon manage">
                <Eye size={18} />
              </div>
              <div className="quick-action-content">
                <h4>Site Photo Gallery</h4>
                <p>View drone imagery and high-res progress photos</p>
              </div>
            </button>

            <button
              className="quick-action-item"
              onClick={() => navigate("/client/notifications")}
            >
              <div className="quick-action-icon alerts">
                <PhoneCall size={18} />
              </div>
              <div className="quick-action-content">
                <h4>Project Notifications</h4>
                <p>Track milestone clearances and status alerts</p>
              </div>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ClientDashboard;
