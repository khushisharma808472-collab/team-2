import WorkerShiftInfo from "../../components/worker/WorkerShiftInfo";
import StatCard from "../../components/dashboard/StatCard";
import { Calendar, Clock, MapPin } from "lucide-react";

const weekSchedule = [
  { day: "Monday", shift: "Day Shift (08:00 AM – 05:00 PM)", site: "Tower A - Floor 8 Core", trade: "Masonry & Rebar", status: "Completed" },
  { day: "Tuesday", shift: "Day Shift (08:00 AM – 05:00 PM)", site: "Tower A - Floor 8 Core", trade: "Masonry & Rebar", status: "Completed" },
  { day: "Wednesday (Today)", shift: "Day Shift (08:00 AM – 05:00 PM)", site: "Tower A - Floor 8 Core", trade: "Masonry & Rebar", status: "Active" },
  { day: "Thursday", shift: "Day Shift (08:00 AM – 05:00 PM)", site: "Tower A - Floor 9 Core", trade: "Rebar Caging", status: "Upcoming" },
  { day: "Friday", shift: "Day Shift (08:00 AM – 05:00 PM)", site: "Tower A - Floor 9 Core", trade: "Rebar Caging", status: "Upcoming" },
  { day: "Saturday", shift: "Half Day (08:00 AM – 01:00 PM)", site: "Tool Maintenance Bay", trade: "Gear Inspection", status: "Upcoming" },
];

function WorkerShifts() {
  return (
    <>
      <div className="welcome-section">
        <div>
          <h1>Weekly Duty & Shift Schedule 📅</h1>
          <p>Review upcoming shift timings, worksite zone relocations, and allocated supervisor leads.</p>
        </div>
        <button className="date-button">📅 Week 34 Roster</button>
      </div>

      <div className="stats-grid">
        <StatCard title="TODAY'S SHIFT" value="Day Shift" change="08:00 – 17:00" type="active" />
        <StatCard title="ASSIGNED SITE" value="Tower A" change="Floor 8 Core" type="projects" />
        <StatCard title="SUPERVISOR LEAD" value="Amit Sharma" change="Foreman" type="users" />
        <StatCard title="PLANNED HOURS" value="44.0 hrs" change="This week" type="pending" />
        <StatCard title="SAFETY GEAR" value="Mandatory" change="Level 8 harness" type="alerts" />
      </div>

      <div className="dashboard-grid role-grid" style={{ marginBottom: "20px" }}>
        <WorkerShiftInfo />

        <div className="dashboard-card">
          <div className="card-header">
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <Calendar size={18} color="#0d9488" />
              <h3>Weekly Work Schedule</h3>
            </div>
            <span style={{ fontSize: "11px", color: "#64748b" }}>Assigned Shifts</span>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {weekSchedule.map((item, idx) => (
              <div
                key={idx}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "10px",
                  background: item.status === "Active" ? "#ecfdf5" : "#f8fafc",
                  borderRadius: "8px",
                  border: item.status === "Active" ? "1px solid #a7f3d0" : "1px solid #f1f5f9",
                }}
              >
                <div>
                  <strong style={{ fontSize: "12px", color: "#1e293b", display: "block" }}>{item.day}</strong>
                  <span style={{ fontSize: "11px", color: "#475569", display: "flex", alignItems: "center", gap: "4px" }}>
                    <Clock size={12} color="#0d9488" /> {item.shift}
                  </span>
                  <small style={{ fontSize: "10px", color: "#64748b" }}>{item.site} • {item.trade}</small>
                </div>
                <span className={`status-pill ${item.status === "Completed" || item.status === "Active" ? "good" : "warning"}`}>
                  {item.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default WorkerShifts;
