import { Layers } from "lucide-react";

const categories = [
  {
    name: "Foundation Work",
    progress: 95,
    status: "Completed",
    statusClass: "completed",
    targetDate: "10 Mar 2026",
  },
  {
    name: "Structural Work",
    progress: 80,
    status: "In Progress",
    statusClass: "in-progress",
    targetDate: "28 Mar 2026",
  },
  {
    name: "Electrical Work",
    progress: 55,
    status: "In Progress",
    statusClass: "in-progress",
    targetDate: "15 Apr 2026",
  },
  {
    name: "Plumbing Work",
    progress: 40,
    status: "In Progress",
    statusClass: "in-progress",
    targetDate: "22 Apr 2026",
  },
  {
    name: "Finishing Work",
    progress: 18,
    status: "Starting",
    statusClass: "pending",
    targetDate: "10 May 2026",
  },
  {
    name: "Inspection Work",
    progress: 70,
    status: "On Track",
    statusClass: "completed",
    targetDate: "Ongoing",
  },
];

function SiteProgressCategories() {
  return (
    <div className="dashboard-card site-categories-card">
      <div className="card-header">
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <Layers size={18} color="#d97706" />
          <h3>Site Progress by Phase</h3>
        </div>
        <span style={{ fontSize: "11px", color: "#64748b", fontWeight: 600 }}>
          Phase 1 & 2
        </span>
      </div>

      <div className="categories-list">
        {categories.map((cat) => (
          <div className="category-item" key={cat.name}>
            <div className="category-info">
              <span className="category-name">{cat.name}</span>
              <span className={`category-status ${cat.statusClass}`}>
                {cat.status}
              </span>
            </div>

            <div className="progress-track">
              <div
                className="progress-fill"
                style={{ width: `${cat.progress}%` }}
              />
            </div>

            <div className="category-footer">
              <span className="category-target">Target: {cat.targetDate}</span>
              <span className="category-percent">{cat.progress}%</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SiteProgressCategories;

