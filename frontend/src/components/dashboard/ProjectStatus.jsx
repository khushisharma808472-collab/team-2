import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

// ================= PROJECT STATUS CONFIGURATION =================

const projectStatusConfig = [
  {
    name: "Planning",
    color: "#8b5cf6",
  },
  {
    name: "On Track",
    color: "#22c55e",
  },
  {
    name: "Delayed",
    color: "#f59e0b",
  },
  {
    name: "At Risk",
    color: "#ef4444",
  },
  {
    name: "Completed",
    color: "#3b82f6",
  },
];

function ProjectStatus({
  projectStatusDistribution = {},
  totalProjects = 0,
  loading = false,
}) {
  // Convert API data into chart format
  const projectData = projectStatusConfig.map((status) => ({
    name: status.name,
    projects: projectStatusDistribution[status.name] || 0,
    color: status.color,
  }));

  return (
    <div className="dashboard-card project-status-card">
      <div className="card-header">
        <h3>Projects by Status</h3>
      </div>

      <div className="project-status-chart">
        {loading ? (
          <div
            style={{
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            Loading project data...
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={projectData}
              margin={{
                top: 10,
                right: 5,
                left: -20,
                bottom: 0,
              }}
            >
              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{
                  fontSize: 9,
                  fill: "#64748b",
                }}
              />

              <YAxis
                allowDecimals={false}
                axisLine={false}
                tickLine={false}
                tick={{
                  fontSize: 9,
                  fill: "#94a3b8",
                }}
              />

              <Tooltip />

              <Bar
                dataKey="projects"
                radius={[5, 5, 0, 0]}
              >
                {projectData.map((entry) => (
                  <Cell
                    key={entry.name}
                    fill={entry.color}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>

      <div className="project-status-summary">
        <span>Total Projects</span>

        <strong>{totalProjects}</strong>
      </div>
    </div>
  );
}

export default ProjectStatus;