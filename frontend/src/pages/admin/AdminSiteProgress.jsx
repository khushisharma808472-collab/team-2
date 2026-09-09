import { useEffect, useState } from "react";

import StatCard from "../../components/dashboard/StatCard";
import SiteProgressCategories from "../../components/siteEngineer/SiteProgressCategories";
import SiteDelayTracker from "../../components/siteEngineer/SiteDelayTracker";

import api from "../../services/api";

function AdminSiteProgress() {
  // ==========================================
  // STATES
  // ==========================================

  const [siteProgressData, setSiteProgressData] = useState(null);

  const [loading, setLoading] = useState(true);

  // ==========================================
  // FETCH SITE PROGRESS DATA
  // ==========================================

  useEffect(() => {
    const fetchSiteProgress = async () => {
      try {
        setLoading(true);

        const response = await api.get(
          "/admin/site-progress"
        );

        if (response.data.success) {
          setSiteProgressData(response.data);
        }
      } catch (error) {
        console.error(
          "Failed to fetch site progress:",
          error.response?.data || error.message
        );
      } finally {
        setLoading(false);
      }
    };

    fetchSiteProgress();
  }, []);

  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {
    return (
      <div
        style={{
          minHeight: "400px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        Loading site progress...
      </div>
    );
  }

  // ==========================================
  // SAFE DEFAULT VALUES
  // ==========================================

  const stats = siteProgressData?.stats || {};

  const milestones =
    siteProgressData?.milestones || [];

  const delayedMilestones =
    siteProgressData?.delayedMilestones || [];

  // ==========================================
  // DATE
  // ==========================================

  const today = new Date().toLocaleDateString(
    "en-IN",
    {
      day: "numeric",
      month: "short",
      year: "numeric",
    }
  );

  return (
    <>
      {/* ======================================
          PAGE HEADER
      ====================================== */}

      <div className="welcome-section">
        <div>
          <h1>
            Site Progress & Monitoring 🗺️
          </h1>

          <p>
            Real-time construction phase progress,
            milestone bottlenecks, and field
            operations.
          </p>
        </div>

        <button className="date-button">
          📅 Today, {today}
        </button>
      </div>

      {/* ======================================
          DYNAMIC STATISTICS
      ====================================== */}

      <div className="stats-grid">

        {/* TOTAL ACTIVE SITES */}

        <StatCard
          title="TOTAL ACTIVE SITES"
          value={`${stats.totalActiveSites || 0} Sites`}
          change="On Schedule"
          type="projects"
        />

        {/* AVERAGE COMPLETION */}

        <StatCard
          title="AVERAGE COMPLETION"
          value={`${stats.averageCompletion || 0}%`}
          change="Live Progress"
          type="active"
        />

        {/* ACTIVE DELAYS */}

        <StatCard
          title="ACTIVE DELAYS"
          value={stats.activeDelays || 0}
          change={`${stats.criticalDelays || 0} critical`}
          type="alerts"
        />

        {/* FIELD ENGINEERS */}

        <StatCard
          title="FIELD ENGINEERS"
          value={`${stats.fieldEngineers || 0} On Duty`}
          change="Active"
          type="users"
        />

        {/* PHASES IN PROGRESS */}

        <StatCard
          title="PHASES IN PROGRESS"
          value={`${stats.phasesInProgress || 0} Phases`}
          change="Verified"
          type="pending"
        />

      </div>

      {/* ======================================
          DASHBOARD CONTENT
      ====================================== */}

      <div className="dashboard-grid role-grid">

        {/* SITE PROGRESS BY PHASE */}

        <SiteProgressCategories
          milestones={milestones}
        />

        {/* DELAY TRACKER */}

        <SiteDelayTracker
          milestones={delayedMilestones}
          activeDelays={stats.activeDelays || 0}
        />

      </div>
    </>
  );
}

export default AdminSiteProgress;