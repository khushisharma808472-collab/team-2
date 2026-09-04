import { useState } from "react";
import { AlertTriangle, Plus, CheckCircle2, Clock } from "lucide-react";
import StatCard from "../../components/dashboard/StatCard";
import { canEdit } from "../../utils/auth";

const initialDelays = [
  { id: 1, name: "Basement Slab Pouring", due: "05 Mar 2026", status: "Completed", delay: "0 days", badgeType: "good" },
  { id: 2, name: "Floor 4 Column Casting", due: "12 Mar 2026", status: "Delayed", delay: "+3 days (Weather)", badgeType: "warning" },
  { id: 3, name: "HVAC Conduit Routing", due: "20 Mar 2026", status: "At Risk", delay: "+5 days (Material wait)", badgeType: "danger" },
  { id: 4, name: "Structural Fire Safety Check", due: "27 Mar 2026", status: "On Schedule", delay: "0 days", badgeType: "good" },
];

function SiteEngineerDelays() {
  const [delays, setDelays] = useState(initialDelays);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    due: "15 Apr 2026",
    delay: "+2 days (Supplier)",
    status: "Delayed",
  });

  const isAuthorized = canEdit("delays");

  const handleAdd = (e) => {
    e.preventDefault();
    setDelays([
      ...delays,
      {
        id: Date.now(),
        name: formData.name,
        due: formData.due,
        delay: formData.delay,
        status: formData.status,
        badgeType: formData.status === "Delayed" ? "warning" : "danger",
      },
    ]);
    setShowModal(false);
  };

  return (
    <>
      <div className="welcome-section">
        <div>
          <h1>Site Delays & Bottlenecks ⚠️</h1>
          <p>Log weather disruptions, supply chain delays, structural clashes, and critical path recovery.</p>
        </div>
        {isAuthorized && (
          <button
            className="date-button"
            style={{
              background: "#d97706",
              color: "#ffffff",
              border: "none",
              fontWeight: 600,
              display: "flex",
              alignItems: "center",
              gap: "6px",
            }}
            onClick={() => setShowModal(true)}
          >
            <Plus size={16} /> Report Site Delay
          </button>
        )}
      </div>

      <div className="stats-grid">
        <StatCard title="TRACKED BOTTLENECKS" value={String(delays.length)} change="Active" type="projects" />
        <StatCard title="ACTIVE DELAYS" value="2 Critical" change="Action required" type="alerts" />
        <StatCard title="AVG DELAY RECOVERY" value="3.2 Days" change="Mitigated" type="active" />
        <StatCard title="WEATHER STOPPAGES" value="1 Incident" change="Monsoon" type="pending" />
        <StatCard title="SUPPLY DISRUPTIONS" value="1 Item" change="Pipe transit" type="users" />
      </div>

      <div className="dashboard-card site-delay-card" style={{ maxWidth: "800px" }}>
        <div className="card-header">
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <AlertTriangle size={18} color="#ef4444" />
            <h3>Milestone & Delay Tracker</h3>
          </div>
          <span className="delay-alert-pill">Live Bottlenecks</span>
        </div>

        <div className="delay-list">
          {delays.map((item) => {
            const Icon = item.badgeType === "good" ? CheckCircle2 : item.badgeType === "warning" ? AlertTriangle : Clock;
            return (
              <div className="delay-item" key={item.id}>
                <div className={`delay-icon-box ${item.badgeType}`}>
                  <Icon size={16} />
                </div>

                <div className="delay-details">
                  <strong>{item.name}</strong>
                  <span>Due Date: {item.due}</span>
                </div>

                <div className="delay-status-col">
                  <span className={`status-pill ${item.badgeType}`}>{item.status}</span>
                  <small>{item.delay}</small>
                </div>
              </div>
            );
          })}
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
            <h3 style={{ margin: "0 0 16px" }}>Report Site Delay</h3>
            <form onSubmit={handleAdd} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <div>
                <label style={{ fontSize: "11px", color: "#64748b" }}>Activity / Phase Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Electrical Conduit Routing"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  style={{ width: "100%", padding: "8px", border: "1px solid #e2e8f0", borderRadius: "6px" }}
                />
              </div>

              <div>
                <label style={{ fontSize: "11px", color: "#64748b" }}>Target Due Date</label>
                <input
                  type="text"
                  value={formData.due}
                  onChange={(e) => setFormData({ ...formData, due: e.target.value })}
                  style={{ width: "100%", padding: "8px", border: "1px solid #e2e8f0", borderRadius: "6px" }}
                />
              </div>

              <div>
                <label style={{ fontSize: "11px", color: "#64748b" }}>Delay Impact & Reason</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. +3 days (Weather rain)"
                  value={formData.delay}
                  onChange={(e) => setFormData({ ...formData, delay: e.target.value })}
                  style={{ width: "100%", padding: "8px", border: "1px solid #e2e8f0", borderRadius: "6px" }}
                />
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: "8px" }}>
                <button type="button" className="date-button" onClick={() => setShowModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="date-button" style={{ background: "#d97706", color: "#ffffff", border: "none" }}>
                  Log Delay
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default SiteEngineerDelays;
