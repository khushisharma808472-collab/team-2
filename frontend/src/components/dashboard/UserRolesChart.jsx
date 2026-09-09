import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";

// ================= ROLE CONFIGURATION =================

const rolesConfig = [
  {
    name: "Administrators",
    apiRole: "admin",
    color: "#3b82f6",
  },
  {
    name: "Project Managers",
    apiRole: "projectManager",
    color: "#22c55e",
  },
  {
    name: "Site Engineers",
    apiRole: "siteEngineer",
    color: "#f59e0b",
  },
  {
    name: "Contractors",
    apiRole: "contractor",
    color: "#8b5cf6",
  },
  {
    name: "Clients",
    apiRole: "client",
    color: "#14b8a6",
  },
];

// ================= COMPONENT =================

function UserRolesChart({
  roleDistribution = {},
  totalUsers = 0,
  loading = false,
}) {
  // API data ko chart format mein convert karna
  const rolesData = rolesConfig.map((role) => ({
    name: role.name,
    value: roleDistribution[role.apiRole] || 0,
    color: role.color,
  }));

  return (
    <div className="dashboard-card user-roles-card">
      <div className="card-header">
        <h3>User Roles Distribution</h3>
      </div>

      <div className="roles-content">
        {loading ? (
          <div
            style={{
              height: "180px",
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            Loading user roles...
          </div>
        ) : (
          <>
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
                <div
                  className="role-legend-item"
                  key={role.name}
                >
                  <span
                    className="role-dot"
                    style={{
                      backgroundColor: role.color,
                    }}
                  />

                  <span className="role-name">
                    {role.name}
                  </span>

                  <strong>{role.value}</strong>

                  <span className="role-percent">
                    (
                    {totalUsers > 0
                      ? Math.round(
                          (role.value / totalUsers) * 100
                        )
                      : 0}
                    %)
                  </span>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default UserRolesChart;