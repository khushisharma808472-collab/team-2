import {
  UserPlus,
  FolderPen,
  ShieldCheck,
  FileText,
} from "lucide-react";

const activities = [
  {
    title: "New user registered",
    description: "Prashant Kumar joined the platform.",
    time: "10m ago",
    icon: UserPlus,
    type: "user",
  },
  {
    title: "Project 'Helix Tower' updated",
    description: "Project details & timelines modified.",
    time: "1h ago",
    icon: FolderPen,
    type: "project",
  },
  {
    title: "User role changed",
    description: "Mike Smith role updated to PM.",
    time: "3h ago",
    icon: ShieldCheck,
    type: "role",
  },
  {
    title: "New report generated",
    description: "System usage & bandwidth report.",
    time: "1d ago",
    icon: FileText,
    type: "report",
  },
];

function RecentActivity() {
  return (
    <div className="dashboard-card recent-activity-card">
      <div className="card-header">
        <h3>Recent Activity</h3>
      </div>

      <div className="activity-list">
        {activities.map((activity, index) => {
          const Icon = activity.icon;

          return (
            <div className="activity-item" key={index}>
              <div className={`activity-icon ${activity.type}`}>
                <Icon size={18} />
              </div>

              <div className="activity-content">
                <h4>{activity.title}</h4>
                <p>{activity.description}</p>
              </div>

              <span className="activity-time">
                {activity.time}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default RecentActivity;