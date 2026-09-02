import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { ChevronDown } from "lucide-react";

const analyticsData = [
  {
    date: "1 May",
    users: 65,
    projects: 38,
  },
  {
    date: "5 May",
    users: 100,
    projects: 42,
  },
  {
    date: "10 May",
    users: 112,
    projects: 48,
  },
  {
    date: "15 May",
    users: 140,
    projects: 44,
  },
  {
    date: "22 May",
    users: 132,
    projects: 75,
  },
];

function SystemAnalytics() {
  return (
    <div className="dashboard-card system-analytics-card">

      <div className="card-header">
        <h3>System Analytics</h3>

        <button className="card-filter">
          This Month
          <ChevronDown size={14} />
        </button>
      </div>

      <div className="analytics-legend">
        <div>
          <span className="legend-color users-color"></span>
          Users
        </div>

        <div>
          <span className="legend-color projects-color"></span>
          Projects
        </div>
      </div>

      <div className="analytics-chart">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={analyticsData}
            margin={{
              top: 10,
              right: 5,
              left: -20,
              bottom: 0,
            }}
          >
            <XAxis
              dataKey="date"
              tick={{
                fontSize: 9,
                fill: "#94a3b8",
              }}
              axisLine={false}
              tickLine={false}
            />

            <YAxis
              tick={{
                fontSize: 9,
                fill: "#94a3b8",
              }}
              axisLine={false}
              tickLine={false}
            />

            <Tooltip />

            <Line
              type="monotone"
              dataKey="users"
              stroke="#3b82f6"
              strokeWidth={2}
              dot={{
                r: 3,
              }}
            />

            <Line
              type="monotone"
              dataKey="projects"
              stroke="#1f9d70"
              strokeWidth={2}
              dot={{
                r: 3,
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
}

export default SystemAnalytics;