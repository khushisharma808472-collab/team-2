import { Camera, FileCheck2, ShieldAlert, Award } from "lucide-react";

const updates = [
  {
    title: "Level 11 Slab Structural Signoff",
    desc: "Certified by Lead Site Engineer Rajesh S. Quality pass 100%.",
    date: "Yesterday, 04:30 PM",
    icon: Award,
    type: "verified",
    badge: "Certified",
  },
  {
    title: "16 New Site Drone Photos Uploaded",
    desc: "Bird's eye perspective of external masonry & perimeter glazing.",
    date: "02 Mar 2026",
    icon: Camera,
    type: "media",
    badge: "Photos",
  },
  {
    title: "Electrical Rough-in Quality Audit",
    desc: "Independent third-party inspection passed without snags.",
    date: "28 Feb 2026",
    icon: FileCheck2,
    type: "verified",
    badge: "Audit Pass",
  },
  {
    title: "Monsoon Weather Mitigation Logged",
    desc: "Drainage sump pumps placed. Zero impact on structural timeline.",
    date: "25 Feb 2026",
    icon: ShieldAlert,
    type: "info",
    badge: "Advisory",
  },
];

function ClientSiteUpdates() {
  return (
    <div className="dashboard-card client-updates-card">
      <div className="card-header">
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <FileCheck2 size={18} color="#059669" />
          <h3>Site Bulletins & Quality Reports</h3>
        </div>
        <span style={{ fontSize: "11px", color: "#64748b" }}>Live Feed</span>
      </div>

      <div className="client-updates-list">
        {updates.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div className="client-update-item" key={idx}>
              <div className={`update-icon-box ${item.type}`}>
                <Icon size={16} />
              </div>

              <div className="update-content">
                <div className="update-top">
                  <strong>{item.title}</strong>
                  <span className={`update-badge ${item.type}`}>{item.badge}</span>
                </div>
                <p>{item.desc}</p>
                <small>{item.date}</small>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ClientSiteUpdates;

