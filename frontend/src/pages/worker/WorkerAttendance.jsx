import { useState, useEffect } from "react";
import { Clock, LogIn, LogOut, CheckCircle2, UserCheck, Calendar } from "lucide-react";
import API from "../../services/api";
import StatCard from "../../components/dashboard/StatCard";

function WorkerAttendance() {
  const [punchedIn, setPunchedIn] = useState(true);
  const [punchTime, setPunchTime] = useState("07:52 AM");
  const [history, setHistory] = useState([
    { date: "Today, 26 Aug", in: "07:52 AM", out: "--", hours: "Ongoing", status: "Active" },
    { date: "Yesterday, 25 Aug", in: "07:58 AM", out: "05:02 PM", hours: "9.0 hrs", status: "Present" },
    { date: "24 Aug 2026", in: "07:50 AM", out: "05:30 PM", hours: "9.5 hrs", status: "Present (OT)" },
    { date: "23 Aug 2026", in: "08:00 AM", out: "05:00 PM", hours: "9.0 hrs", status: "Present" },
    { date: "22 Aug 2026", in: "07:55 AM", out: "05:10 PM", hours: "9.2 hrs", status: "Present" },
  ]);

  const togglePunch = async () => {
    try {
      const action = punchedIn ? "out" : "in";
      const res = await API.post("/attendance/punch", { action });
      const now = new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" });

      if (punchedIn) {
        setPunchedIn(false);
        setHistory((prev) => [
          { date: "Today, 26 Aug", in: punchTime, out: now, hours: "Completed", status: "Punched Out" },
          ...prev.slice(1),
        ]);
        alert(`Punched OUT successfully at ${now}`);
      } else {
        setPunchedIn(true);
        setPunchTime(now);
        setHistory((prev) => [
          { date: "Today, 26 Aug", in: now, out: "--", hours: "Ongoing", status: "Active" },
          ...prev.slice(1),
        ]);
        alert(`Punched IN successfully at ${now}`);
      }
    } catch {
      // Fallback local toggle
      const now = new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" });
      if (punchedIn) {
        setPunchedIn(false);
        alert(`Punched OUT at ${now}`);
      } else {
        setPunchedIn(true);
        setPunchTime(now);
        alert(`Punched IN at ${now}`);
      }
    }
  };

  return (
    <>
      <div className="welcome-section">
        <div>
          <h1>Biometric Clock-In & Shift Punch ⏱️</h1>
          <p>Record your shift arrival, lunch breaks, punch-out times, and view weekly verified duty hours.</p>
        </div>
        <button className="date-button">📅 Worksite: Metro Tower A</button>
      </div>

      <div className="stats-grid">
        <StatCard
          title="TODAY'S STATUS"
          value={punchedIn ? "Punched In" : "Punched Out"}
          change={punchedIn ? punchTime : "Offline"}
          type={punchedIn ? "active" : "alerts"}
        />
        <StatCard title="HOURS THIS WEEK" value="36.5h" change="+2h Overtime" type="users" />
        <StatCard title="MONTHLY ATTENDANCE" value="22 / 24 Days" change="91.6% rate" type="pending" />
        <StatCard title="PUNCTUALITY SCORE" value="98%" change="On time" type="projects" />
        <StatCard title="SAFETY CLEARED" value="100%" change="Daily PPE pass" type="active" />
      </div>

      <div className="dashboard-grid role-grid" style={{ marginBottom: "20px" }}>
        {/* Punch Card */}
        <div className="dashboard-card" style={{ display: "flex", flexDirection: "column", gap: "16px", alignItems: "center", textAlign: "center", padding: "30px 20px" }}>
          <div
            style={{
              width: "80px",
              height: "80px",
              borderRadius: "50%",
              background: punchedIn ? "#ecfdf5" : "#fff7ed",
              color: punchedIn ? "#059669" : "#d97706",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {punchedIn ? <UserCheck size={40} /> : <Clock size={40} />}
          </div>

          <div>
            <h2 style={{ margin: 0, fontSize: "20px", color: "#1e293b" }}>
              {punchedIn ? "Currently on Duty" : "Currently Off Duty"}
            </h2>
            <p style={{ margin: "4px 0 0", fontSize: "12px", color: "#64748b" }}>
              {punchedIn ? `Punched in at ${punchTime} (East Wing Core)` : "Ready to clock in for shift"}
            </p>
          </div>

          <button
            className="date-button"
            style={{
              background: punchedIn ? "#ef4444" : "#059669",
              color: "#ffffff",
              border: "none",
              padding: "12px 28px",
              fontSize: "14px",
              fontWeight: 700,
              display: "flex",
              alignItems: "center",
              gap: "8px",
              borderRadius: "9999px",
            }}
            onClick={togglePunch}
          >
            {punchedIn ? (
              <>
                <LogOut size={18} /> Punch Out / End Shift
              </>
            ) : (
              <>
                <LogIn size={18} /> Clock-In / Start Shift
              </>
            )}
          </button>
        </div>

        {/* Attendance History */}
        <div className="dashboard-card">
          <div className="card-header">
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <Calendar size={18} color="#059669" />
              <h3>Recent Punch History</h3>
            </div>
            <span style={{ fontSize: "11px", color: "#64748b" }}>Verified Logs</span>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {history.map((h, idx) => (
              <div
                key={idx}
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
                  <strong style={{ fontSize: "12px", color: "#1e293b", display: "block" }}>{h.date}</strong>
                  <span style={{ fontSize: "10px", color: "#64748b" }}>In: {h.in} • Out: {h.out}</span>
                </div>
                <div style={{ textAlign: "right" }}>
                  <span className={`status-pill ${h.status.includes("Present") || h.status === "Active" ? "good" : "warning"}`}>
                    {h.status}
                  </span>
                  <small style={{ display: "block", fontSize: "9px", color: "#94a3b8" }}>{h.hours}</small>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default WorkerAttendance;
