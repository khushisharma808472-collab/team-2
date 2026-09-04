import { useState } from "react";
import WorkerSafetyChecklist from "../../components/worker/WorkerSafetyChecklist";
import StatCard from "../../components/dashboard/StatCard";
import { ShieldCheck, AlertOctagon, PhoneCall, Plus } from "lucide-react";

function WorkerSafety() {
  const [hazards, setHazards] = useState([
    { id: 1, title: "Exposed rebar ends near Staircase 3", zone: "Tower A - Level 8", status: "Resolved", time: "Yesterday" },
    { id: 2, title: "Slippery wet surface near mortar mixer", zone: "Ground Yard", status: "Resolved", time: "24 Aug" },
  ]);
  const [showModal, setShowModal] = useState(false);
  const [hazardText, setHazardText] = useState("");
  const [hazardZone, setHazardZone] = useState("Floor 8 East Wing");

  const handleSubmit = (e) => {
    e.preventDefault();
    setHazards([
      { id: Date.now(), title: hazardText, zone: hazardZone, status: "Under Review", time: "Just now" },
      ...hazards,
    ]);
    setHazardText("");
    setShowModal(false);
    alert("Hazard reported to Site Safety Officer Suresh Patil.");
  };

  return (
    <>
      <div className="welcome-section" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h1>Site Safety Protocols & Clearance 🦺</h1>
          <p>Mandatory PPE checklist, safety compliance certifications, emergency contacts, and hazard reports.</p>
        </div>
        <button
          className="date-button"
          style={{ background: "#ef4444", color: "#ffffff", border: "none", display: "flex", alignItems: "center", gap: "6px" }}
          onClick={() => setShowModal(true)}
        >
          <AlertOctagon size={16} /> Report Hazard / Snag
        </button>
      </div>

      <div className="stats-grid">
        <StatCard title="PPE CLEARANCE" value="100% Cleared" change="Verified today" type="active" />
        <StatCard title="DAYS INCIDENT FREE" value="142 Days" change="Zero injury" type="projects" />
        <StatCard title="SAFETY OFFICER" value="Suresh Patil" change="Ext. 108" type="users" />
        <StatCard title="MANDATORY PPE" value="5 Items" change="Enforced" type="pending" />
        <StatCard title="SITE AID STATION" value="Ground Bay" change="Open 24/7" type="alerts" />
      </div>

      <div className="dashboard-grid role-grid" style={{ marginBottom: "20px" }}>
        <WorkerSafetyChecklist />

        <div className="dashboard-card">
          <div className="card-header">
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <AlertOctagon size={18} color="#ef4444" />
              <h3>Reported Snags & Hazards</h3>
            </div>
            <span style={{ fontSize: "11px", color: "#64748b" }}>Live Safety Log</span>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {hazards.map((h) => (
              <div
                key={h.id}
                style={{
                  padding: "10px",
                  background: "#f8fafc",
                  borderRadius: "8px",
                  border: "1px solid #f1f5f9",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div>
                  <strong style={{ fontSize: "12px", color: "#1e293b", display: "block" }}>{h.title}</strong>
                  <span style={{ fontSize: "10px", color: "#64748b" }}>Zone: {h.zone} • {h.time}</span>
                </div>
                <span className={`status-pill ${h.status === "Resolved" ? "good" : "warning"}`}>{h.status}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {showModal && (
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
          <div className="dashboard-card" style={{ width: "380px" }}>
            <h3 style={{ margin: "0 0 16px" }}>Report Site Hazard</h3>
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <div>
                <label style={{ fontSize: "11px", color: "#64748b" }}>Hazard Description</label>
                <textarea
                  rows="3"
                  required
                  placeholder="e.g. Missing safety net on Level 8 East perimeter..."
                  value={hazardText}
                  onChange={(e) => setHazardText(e.target.value)}
                  style={{ width: "100%", padding: "8px", border: "1px solid #e2e8f0", borderRadius: "6px" }}
                />
              </div>

              <div>
                <label style={{ fontSize: "11px", color: "#64748b" }}>Location / Zone</label>
                <input
                  type="text"
                  value={hazardZone}
                  onChange={(e) => setHazardZone(e.target.value)}
                  style={{ width: "100%", padding: "8px", border: "1px solid #e2e8f0", borderRadius: "6px" }}
                />
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: "8px" }}>
                <button type="button" className="date-button" onClick={() => setShowModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="date-button" style={{ background: "#ef4444", color: "#ffffff", border: "none" }}>
                  Submit Alert
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default WorkerSafety;
