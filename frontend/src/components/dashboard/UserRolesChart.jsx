import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";

const rolesData = [
  { name: "Administrators", value: 12, color: "#3b82f6" },
  { name: "Project Managers", value: 28, color: "#22c55e" },
  { name: "Site Engineers", value: 27, color: "#f59e0b" },
  { name: "Contractors", value: 38, color: "#8b5cf6" },
  { name: "Clients", value: 20, color: "#14b8a6" },
];

const totalUsers = rolesData.reduce(
  (total, role) => total + role.value,
  0
);

function UserRolesChart() {
  return (
    <div className="dashboard-card user-roles-card">

      <div className="card-header">
        <h3>User Roles Distribution</h3>
      </div>

      <div className="roles-content">

        <div className="roles-chart">

          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie
                data={rolesData}
                cx="50%"
                cy="50%"
                innerRadius={48}
                outerRadius={70}
                dataKey="value"
                stroke="none"
              >
                {rolesData.map((role) => (
                  <Cell
                    key={role.name}
                    fill={role.color}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>

          <div className="roles-center-text">
            <strong>{totalUsers}</strong>
            <span>Total Users</span>
          </div>

        </div>

        <div className="roles-legend">
          {rolesData.map((role) => (
            <div className="role-legend-item" key={role.name}>
              
              <span
                className="role-dot"
                style={{
                  backgroundColor: role.color,
                }}
              />

              <span className="role-name">
                {role.name}
              </span>

              <strong>
                {role.value}
              </strong>

              <span className="role-percent">
                ({Math.round((role.value / totalUsers) * 100)}%)
              </span>

            </div>
          ))}
        </div>

      </div>

    </div>
  );
}

export default UserRolesChart;