import { ClipboardCheck, CheckCircle2, AlertCircle, FileText } from "lucide-react";

const logs = [
  {
    title: "Rebar Spacing Verification",
    location: "Block B - Level 3 Slab",
    time: "45 mins ago",
    status: "Passed",
    type: "inspection",
    icon: CheckCircle2,
  },
  {
    title: "Concrete Slump Test #04",
    location: "Foundation Pile 12",
    time: "2 hours ago",
    status: "Passed (120mm)",
    type: "inspection",
    icon: CheckCircle2,
  },
  {
    title: "Electrical Conduit Snag Logged",
    location: "Zone A - Corridor 2",
    time: "4 hours ago",
    status: "Action Required",
    type: "issue",
    icon: AlertCircle,
  },
  {
    title: "Daily Labor & Material Log Filed",
    location: "North Gate Entrance",
    time: "Today 08:30 AM",
    status: "Recorded",
    type: "report",
    icon: FileText,
  },
];

function SiteActivityLogs() {
  return (
    <div className="dashboard-card site-logs-card">
      <div className="card-header">
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <ClipboardCheck size={18} color="#10b981" />
          <h3>Site Activity & Inspection Logs</h3>
        </div>
        <span style={{ fontSize: "11px", color: "#64748b" }}>Today</span>
      </div>

      <div className="site-logs-list">
        {logs.map((log, idx) => {
          const Icon = log.icon;
          return (
            <div className="site-log-item" key={idx}>
              <div className={`log-icon-wrap ${log.type}`}>
                <Icon size={16} />
              </div>

              <div className="log-details">
                <strong>{log.title}</strong>
                <span>{log.location}</span>
              </div>

              <div className="log-meta">
                <span className={`log-badge ${log.type}`}>{log.status}</span>
                <small>{log.time}</small>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default SiteActivityLogs;

