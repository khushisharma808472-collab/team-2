import { AlertTriangle, CheckCircle2, Clock } from "lucide-react";

const milestones = [
  {
    name: "Basement Slab Pouring",
    due: "05 Mar 2026",
    status: "Completed",
    delay: "0 days",
    badgeType: "good",
    icon: CheckCircle2,
  },
  {
    name: "Floor 4 Column Casting",
    due: "12 Mar 2026",
    status: "Delayed",
    delay: "+3 days (Weather)",
    badgeType: "warning",
    icon: AlertTriangle,
  },
  {
    name: "HVAC Conduit Routing",
    due: "20 Mar 2026",
    status: "At Risk",
    delay: "+5 days (Material wait)",
    badgeType: "danger",
    icon: Clock,
  },
  {
    name: "Structural Fire Safety Check",
    due: "27 Mar 2026",
    status: "On Schedule",
    delay: "0 days",
    badgeType: "good",
    icon: CheckCircle2,
  },
];

function SiteDelayTracker() {
  return (
    <div className="dashboard-card site-delay-card">
      <div className="card-header">
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <AlertTriangle size={18} color="#ef4444" />
          <h3>Milestone & Delay Tracker</h3>
        </div>
        <span className="delay-alert-pill">2 Active Delays</span>
      </div>

      <div className="delay-list">
        {milestones.map((item) => {
          const Icon = item.icon;
          return (
            <div className="delay-item" key={item.name}>
              <div className={`delay-icon-box ${item.badgeType}`}>
                <Icon size={16} />
              </div>

              <div className="delay-details">
                <strong>{item.name}</strong>
                <span>Due Date: {item.due}</span>
              </div>

              <div className="delay-status-col">
                <span className={`status-pill ${item.badgeType}`}>
                  {item.status}
                </span>
                <small>{item.delay}</small>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default SiteDelayTracker;

