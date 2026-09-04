import { useState } from "react";
import { Layers, CheckCircle2, Edit2 } from "lucide-react";
import StatCard from "../../components/dashboard/StatCard";
import { canEdit } from "../../utils/auth";

const initialPhases = [
  { id: 1, name: "Foundation Work", progress: 95, status: "Completed", statusClass: "completed", targetDate: "10 Mar 2026" },
  { id: 2, name: "Structural Work", progress: 80, status: "In Progress", statusClass: "in-progress", targetDate: "28 Mar 2026" },
  { id: 3, name: "Electrical Work", progress: 55, status: "In Progress", statusClass: "in-progress", targetDate: "15 Apr 2026" },
  { id: 4, name: "Plumbing Work", progress: 40, status: "In Progress", statusClass: "in-progress", targetDate: "22 Apr 2026" },
  { id: 5, name: "Finishing Work", progress: 18, status: "Starting", statusClass: "pending", targetDate: "10 May 2026" },
  { id: 6, name: "Inspection Work", progress: 70, status: "On Track", statusClass: "completed", targetDate: "Ongoing" },
];

function SiteEngineerProgress() {
  const [phases, setPhases] = useState(initialPhases);
  const [editingPhase, setEditingPhase] = useState(null);
  const [progressVal, setProgressVal] = useState(50);

  const isAuthorized = canEdit("site_progress");

  const handleOpenEdit = (phase) => {
    setEditingPhase(phase);
    setProgressVal(phase.progress);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!editingPhase) return;
    const val = Number(progressVal);
    const newStatus = val >= 95 ? "Completed" : val > 20 ? "In Progress" : "Starting";
    const newClass = val >= 95 ? "completed" : val > 20 ? "in-progress" : "pending";

    setPhases(
      phases.map((p) =>
        p.id === editingPhase.id
          ? { ...p, progress: val, status: newStatus, statusClass: newClass }
          : p
      )
    );
    setEditingPhase(null);
  };

  return (
    <>
      <div className="welcome-section">
        <div>
          <h1>Site Construction Progress 🗺️</h1>
          <p>Phase-by-phase structural tracking, zone milestones, and progress certification.</p>
        </div>
        <button className="date-button">📅 Active Zones: 4</button>
      </div>

      <div className="stats-grid">
        <StatCard title="TOTAL PHASES" value="6 Phases" change="Active" type="projects" />
        <StatCard title="OVERALL COMPLETION" value="72.4%" change="+4.2%" type="active" />
        <StatCard title="FOUNDATION" value="95%" change="Signed off" type="users" />
        <StatCard title="SUPERSTRUCTURE" value="80%" change="Level 12" type="pending" />
        <StatCard title="QUALITY CLEARANCE" value="100%" change="Verified" type="alerts" />
      </div>

      <div className="dashboard-card site-categories-card" style={{ maxWidth: "800px" }}>
        <div className="card-header">
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <Layers size={18} color="#d97706" />
            <h3>Phase Execution Progress</h3>
          </div>
          <span style={{ fontSize: "11px", color: "#64748b" }}>Tower A & B</span>
        </div>

        <div className="categories-list">
          {phases.map((cat) => (
            <div className="category-item" key={cat.id} style={{ padding: "10px 0", borderBottom: "1px solid #f1f5f9" }}>
              <div className="category-info">
                <span className="category-name" style={{ fontSize: "13px" }}>{cat.name}</span>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <span className={`category-status ${cat.statusClass}`}>{cat.status}</span>
                  {isAuthorized && (
                    <button
                      className="menu-item"
                      style={{ width: "auto", height: "24px", padding: "0 6px", fontSize: "11px" }}
                      onClick={() => handleOpenEdit(cat)}
                    >
                      <Edit2 size={12} />
                    </button>
                  )}
                </div>
              </div>

              <div className="progress-track" style={{ height: "7px", margin: "6px 0" }}>
                <div className="progress-fill" style={{ width: `${cat.progress}%` }} />
              </div>

              <div className="category-footer">
                <span className="category-target">Target Completion: {cat.targetDate}</span>
                <span className="category-percent">{cat.progress}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {editingPhase && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(15, 23, 42, 0.4)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
          }}
        >
          <div className="dashboard-card" style={{ width: "360px" }}>
            <h3 style={{ margin: "0 0 16px" }}>Update {editingPhase.name}</h3>
            <form onSubmit={handleSave} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <div>
                <label style={{ fontSize: "11px", color: "#64748b" }}>Completion Percentage ({progressVal}%)</label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={progressVal}
                  onChange={(e) => setProgressVal(e.target.value)}
                  style={{ width: "100%", margin: "10px 0" }}
                />
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: "8px" }}>
                <button type="button" className="date-button" onClick={() => setEditingPhase(null)}>
                  Cancel
                </button>
                <button type="submit" className="date-button" style={{ background: "#d97706", color: "#ffffff", border: "none" }}>
                  Update Progress
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default SiteEngineerProgress;
