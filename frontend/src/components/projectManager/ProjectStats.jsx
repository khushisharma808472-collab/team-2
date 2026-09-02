import {
  FolderKanban,
  Activity,
  CheckCircle2,
  TriangleAlert,
} from "lucide-react";

const stats = [
  {
    title: "Total Projects",
    value: "24",
    subtitle: "All assigned projects",
    icon: FolderKanban,
    type: "orange",
  },

  {
    title: "Active Projects",
    value: "12",
    subtitle: "Currently in progress",
    icon: Activity,
    type: "orange",
  },

  {
    title: "Completed",
    value: "8",
    subtitle: "Successfully completed",
    icon: CheckCircle2,
    type: "green",
  },

  {
    title: "Delayed",
    value: "4",
    subtitle: "Require immediate attention",
    icon: TriangleAlert,
    type: "red",
  },
];

function ProjectStats() {
  return (
    <div className="pm-stats-grid">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <div
            className="pm-stat-card"
            key={stat.title}
          >
            <div className="pm-stat-top">
              <div>
                <p className="pm-stat-title">
                  {stat.title}
                </p>

                <h2>{stat.value}</h2>
              </div>

              <div
                className={`pm-stat-icon ${stat.type}`}
              >
                <Icon size={22} />
              </div>
            </div>

            <p className="pm-stat-subtitle">
              {stat.subtitle}
            </p>
          </div>
        );
      })}
    </div>
  );
}

export default ProjectStats;