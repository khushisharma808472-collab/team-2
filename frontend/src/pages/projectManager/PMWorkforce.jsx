import { useState, useEffect } from "react";
import WorkforceTradeAllocation from "../../components/contractor/WorkforceTradeAllocation";
import API from "../../services/api";

function PMWorkforce() {
  const [attendance, setAttendance] = useState([]);

  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const res = await API.get("/attendance");
        if (res.data?.data) setAttendance(res.data.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchAttendance();
  }, []);

  return (
    <>
      <div className="pm-welcome-section">
        <h1>Workforce Deployment 👥</h1>
        <p>Subcontractor deployment, crew attendance, and trade rosters across active project sites.</p>
      </div>

      <div className="dashboard-grid role-grid">
        <WorkforceTradeAllocation />

        <div className="dashboard-card">
          <div className="card-header">
            <h3>Active Duty Personnel</h3>
            <span style={{ fontSize: "11px", color: "#64748b" }}>Live Attendance</span>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {attendance.map((att) => (
              <div
                key={att._id}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "10px",
                  background: "#f8fafc",
                  borderRadius: "8px",
                }}
              >
                <div>
                  <strong style={{ fontSize: "12px", color: "#1e293b", display: "block" }}>{att.userName}</strong>
                  <span style={{ fontSize: "10px", color: "#64748b" }}>{att.trade} • {att.site}</span>
                </div>
                <span className="status-pill good">{att.status}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default PMWorkforce;
