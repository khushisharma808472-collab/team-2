function BudgetUtilization() {
  const percentage = 68;

  return (
    <div className="budget-utilization-card">
      <div className="budget-header">
        <h3>Budget Utilization</h3>

        <p>Current project budget usage</p>
      </div>

      <div className="budget-content">
        <div
          className="budget-chart"
          style={{
            background: `conic-gradient(
              #f59e0b 0% ${percentage}%,
              #e5e7eb ${percentage}% 100%
            )`,
          }}
        >
          <div className="budget-chart-inner">
            <h2>{percentage}%</h2>

            <span>Budget</span>

            <small>Utilized</small>
          </div>
        </div>

        <div className="budget-details">
          <div className="budget-detail">
            <span className="budget-dot total"></span>

            <div>
              <p>Total Budget</p>

              <strong>₹ 12.5 Cr</strong>
            </div>
          </div>

          <div className="budget-detail">
            <span className="budget-dot used"></span>

            <div>
              <p>Used</p>

              <strong>₹ 8.5 Cr</strong>
            </div>
          </div>

          <div className="budget-detail">
            <span className="budget-dot remaining"></span>

            <div>
              <p>Remaining</p>

              <strong>₹ 4.0 Cr</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BudgetUtilization;