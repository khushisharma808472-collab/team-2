import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";
import { ChevronDown, ArrowRight } from "lucide-react";

const data = [
  { name: "On Track", value: 20, color: "#1f9d70" },
  { name: "Delayed", value: 14, color: "#f59e0b" },
  { name: "At Risk", value: 8, color: "#ef4444" },
  { name: "Completed", value: 6, color: "#3b82f6" },
];

function ProjectOverview() {
  return (
    <div className="dashboard-card project-overview-card">
      
      <div className="card-header">
        <h3>Project Overview</h3>

        <button className="card-filter">
          This Month
          <ChevronDown size={14} />
        </button>
      </div>

      <div className="project-overview-content">
        
        <div className="project-chart">

          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={48}
                outerRadius={70}
                paddingAngle={0}
                dataKey="value"
                stroke="none"
              >
                {data.map((entry) => (
                  <Cell
                    key={entry.name}
                    fill={entry.color}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>

          <div className="chart-center-text">
            <strong>48</strong>
            <span>Total Projects</span>
          </div>

        </div>

        <div className="project-legend">

          {data.map((item) => (
            <div
              className="legend-item"
              key={item.name}
            >
              <span
                className="legend-dot"
                style={{
                  backgroundColor: item.color,
                }}
              />

              <span>
                {item.name}
              </span>

              <strong>
                {item.value}
              </strong>

              <span className="percentage">
                ({Math.round((item.value / 48) * 100)}%)
              </span>
            </div>
          ))}

        </div>

      </div>

      <button className="view-projects-btn">
        View all projects
        <ArrowRight size={15} />
      </button>

    </div>
  );
}

export default ProjectOverview;