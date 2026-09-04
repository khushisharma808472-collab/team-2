import StatCard from "../../components/dashboard/StatCard";
import SiteProgressCategories from "../../components/siteEngineer/SiteProgressCategories";
import SiteDelayTracker from "../../components/siteEngineer/SiteDelayTracker";

function AdminSiteProgress() {
  return (
    <>
      <div className="welcome-section">
        <div>
          <h1>Site Progress & Monitoring 🗺️</h1>
          <p>Real-time construction phase progress, milestone bottlenecks, and field operations.</p>
        </div>
        <button className="date-button">📅 Today, 26 Aug 2026</button>
      </div>

      <div className="stats-grid">
        <StatCard title="TOTAL ACTIVE SITES" value="4 Sites" change="On Schedule" type="projects" />
        <StatCard title="AVERAGE COMPLETION" value="72.4%" change="+4.2%" type="active" />
        <StatCard title="ACTIVE DELAYS" value="2" change="1 critical" type="alerts" />
        <StatCard title="FIELD ENGINEERS" value="6 On Duty" change="Active" type="users" />
        <StatCard title="PHASES IN PROGRESS" value="5 Phases" change="Verified" type="pending" />
      </div>

      <div className="dashboard-grid role-grid">
        <SiteProgressCategories />
        <SiteDelayTracker />
      </div>
    </>
  );
}

export default AdminSiteProgress;
