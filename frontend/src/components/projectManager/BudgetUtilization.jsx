import { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";

import api from "../../services/api";

// ==========================================
// CONVERT DIFFERENT BUDGET FORMATS TO CRORES
// ==========================================

const parseAmountToCrores = (amount) => {
  if (!amount) return 0;

  // Agar database mein number stored hai
  if (typeof amount === "number") {
    // Agar number bahut bada hai, assume INR hai
    if (amount >= 1000000) {
      return amount / 10000000;
    }

    return amount;
  }

  const value = String(amount)
    .replace(/[₹,\s]/g, "")
    .toLowerCase();

  // Example: "15Cr"
  if (value.includes("cr")) {
    const number = parseFloat(
      value.replace("cr", "")
    );

    return isNaN(number) ? 0 : number;
  }

  // Example: ₹150000000
  const numericValue = parseFloat(value);

  if (isNaN(numericValue)) {
    return 0;
  }

  // Large values ko Indian Rupees maan kar Crores mein convert karo
  if (numericValue >= 1000000) {
    return numericValue / 10000000;
  }

  return numericValue;
};


// ==========================================
// FORMAT CRORES
// ==========================================

const formatCrores = (amount) => {
  return `₹ ${amount.toFixed(1)} Cr`;
};


function BudgetUtilization() {
  const [budgetData, setBudgetData] = useState({
    totalBudget: 0,
    totalSpent: 0,
    remaining: 0,
    utilization: 0,
  });

  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchBudgetData = async () => {
      try {
        const response = await api.get("/projects");

        if (response.data.success) {
          const projects =
            response.data.data || [];

          let totalBudget = 0;
          let totalSpent = 0;


          // ==========================================
          // CALCULATE TOTAL BUDGET AND SPENT
          // ==========================================

          projects.forEach((project) => {
            const projectBudget =
              parseAmountToCrores(
                project.budget
              );

            const projectSpent =
              parseAmountToCrores(
                project.spent
              );

            totalBudget += projectBudget;

            totalSpent += projectSpent;
          });


          // Prevent spent from exceeding budget
          if (totalSpent > totalBudget) {
            totalSpent = totalBudget;
          }


          const remaining =
            Math.max(
              totalBudget - totalSpent,
              0
            );


          const utilization =
            totalBudget > 0
              ? Math.round(
                  (totalSpent / totalBudget) * 100
                )
              : 0;


          setBudgetData({
            totalBudget,
            totalSpent,
            remaining,
            utilization,
          });
        }

      } catch (error) {
        console.error(
          "Failed to fetch budget data:",
          error.response?.data ||
          error.message
        );

      } finally {
        setLoading(false);
      }
    };

    fetchBudgetData();
  }, []);


  // ==========================================
  // CHART DATA
  // ==========================================

  const chartData = [
    {
      name: "Used",
      value:
        budgetData.totalSpent > 0
          ? budgetData.totalSpent
          : 0,
      color: "#f59e0b",
    },

    {
      name: "Remaining",
      value:
        budgetData.remaining > 0
          ? budgetData.remaining
          : 0,
      color: "#e2e8f0",
    },
  ];


  return (
    <div className="budget-utilization-card">

      {/* HEADER */}

      <div className="chart-header">
        <div>
          <h3>Budget Utilization</h3>

          <p>
            Overall project budget overview
          </p>
        </div>

        <span className="live-data-badge">
          Live Data
        </span>
      </div>


      {loading ? (

        <div className="budget-loading">
          Loading budget data...
        </div>

      ) : (

        <div className="budget-content">


          {/* PIE CHART */}

          <div className="budget-chart-wrapper">

            <ResponsiveContainer
              width={230}
              height={230}
            >
              <PieChart>

                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={65}
                  outerRadius={92}
                  startAngle={90}
                  endAngle={-270}
                  dataKey="value"
                  stroke="none"
                  paddingAngle={1}
                >

                  {chartData.map((entry) => (

                    <Cell
                      key={entry.name}
                      fill={entry.color}
                    />

                  ))}

                </Pie>

              </PieChart>

            </ResponsiveContainer>


            {/* CENTER TEXT */}

            <div className="budget-center-text">

              <strong>
                {budgetData.utilization}%
              </strong>

              <span>
                Budget
              </span>

              <small>
                Utilized
              </small>

            </div>

          </div>


          {/* BUDGET DETAILS */}

          <div className="budget-details">


            <div className="budget-detail-item">

              <span className="budget-dot total-dot" />

              <div>

                <p>Total Budget</p>

                <strong>
                  {formatCrores(
                    budgetData.totalBudget
                  )}
                </strong>

              </div>

            </div>


            <div className="budget-detail-item">

              <span className="budget-dot used-dot" />

              <div>

                <p>Used Budget</p>

                <strong>
                  {formatCrores(
                    budgetData.totalSpent
                  )}
                </strong>

              </div>

            </div>


            <div className="budget-detail-item">

              <span className="budget-dot remaining-dot" />

              <div>

                <p>Remaining</p>

                <strong>
                  {formatCrores(
                    budgetData.remaining
                  )}
                </strong>

              </div>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}


export default BudgetUtilization;