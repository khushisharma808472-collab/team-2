import {
  UserPlus,
  FolderPlus,
  FileText,
  Users,
} from "lucide-react";

const actions = [
  {
    title: "Add New User",
    description: "Create a new system user",
    icon: UserPlus,
    type: "user",
  },
  {
    title: "Create Project",
    description: "Start a new project",
    icon: FolderPlus,
    type: "project",
  },
  {
    title: "Generate Report",
    description: "Create system reports",
    icon: FileText,
    type: "report",
  },
  {
    title: "Manage Users",
    description: "View and manage users",
    icon: Users,
    type: "manage",
  },
];

function QuickActions() {
  return (
    <div className="dashboard-card quick-actions-card">
      <div className="card-header">
        <h3>Quick Actions</h3>
      </div>

      <div className="quick-actions-list">
        {actions.map((action) => {
          const Icon = action.icon;

          return (
            <button
              className="quick-action-item"
              key={action.title}
            >
              <div className={`quick-action-icon ${action.type}`}>
                <Icon size={19} />
              </div>

              <div className="quick-action-content">
                <h4>{action.title}</h4>
                <p>{action.description}</p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default QuickActions;