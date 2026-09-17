import { useState, useEffect, useMemo } from "react";
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

  const workforceTradeData = useMemo(() => {
    const counts = {
      "Supervisors & Engineers": 0,
      "Masons & Structural": 0,
      "Electricians & MEP": 0,
      "Carpenters & Riggers": 0,
      "General Site Labor": 0,
    };

    if (Array.isArray(attendance)) {
      attendance.forEach((record) => {
        const status = (record.status || "Present").trim().toLowerCase();
        if (status === "absent") return;

        const trade = (record.trade || "").trim().toLowerCase();
        if (trade.includes("supervisor") || trade.includes("engineer")) {
          counts["Supervisors & Engineers"] += 1;
        } else if (
          trade.includes("mason") ||
          trade.includes("structural") ||
          trade.includes("rebar")
        ) {
          counts["Masons & Structural"] += 1;
        } else if (
          trade.includes("electri") ||
          trade.includes("mep") ||
          trade.includes("plumb")
        ) {
          counts["Electricians & MEP"] += 1;
        } else if (
          trade.includes("carpenter") ||
          trade.includes("rigger")
        ) {
          counts["Carpenters & Riggers"] += 1;
        } else {
          counts["General Site Labor"] += 1;
        }
      });
    }

    return [
      {
        name: "Supervisors & Engineers",
        value: counts["Supervisors & Engineers"],
        color: "#3b82f6",
      },
      {
        name: "Masons & Structural",
        value: counts["Masons & Structural"],
        color: "#f59e0b",
      },
      {
        name: "Electricians & MEP",
        value: counts["Electricians & MEP"],
        color: "#10b981",
      },
      {
        name: "Carpenters & Riggers",
        value: counts["Carpenters & Riggers"],
        color: "#8b5cf6",
      },
      {
        name: "General Site Labor",
        value: counts["General Site Labor"],
        color: "#64748b",
      },
    ];
  }, [attendance]);

  return (
    <>
      <div className="pm-welcome-section">
        <h1>Workforce Deployment 👥</h1>
        <p>Subcontractor deployment, crew attendance, and trade rosters across active project sites.</p>
      </div>

      <div className="dashboard-grid role-grid">
        <WorkforceTradeAllocation data={workforceTradeData} />

        <div className="dashboard-card">
          <div className="card-header">
            <h3>Active Duty Personnel</h3>
            <span style={{ fontSize: "11px", color: "#64748b" }}>Live Attendance</span>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {attendance.length === 0 ? (
              <div style={{ padding: "30px", textAlign: "center", color: "#64748b" }}>
                No personnel on duty.
              </div>
            ) : (
            attendance.map((att) => (
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
            ))
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default PMWorkforce;
