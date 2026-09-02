import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

const projectData = [
  {
    name: "On Track",
    projects: 20,
    color: "#22c55e",
  },
  {
    name: "Delayed",
    projects: 14,
    color: "#f59e0b",
  },
  {
    name: "At Risk",
    projects: 8,
    color: "#ef4444",
  },
  {
    name: "Completed",
    projects: 6,
    color: "#3b82f6",
  },
];

function ProjectStatus() {
  return (
    <div className="dashboard-card project-status-card">
      <div className="card-header">
        <h3>Projects by Status</h3>
      </div>

      <div className="project-status-chart">
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
      </div>

      <div className="project-status-summary">
        <span>Total Projects</span>
        <strong>48</strong>
      </div>
    </div>
  );
}

export default ProjectStatus;