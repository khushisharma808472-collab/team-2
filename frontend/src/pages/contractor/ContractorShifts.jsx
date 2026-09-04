import { useState } from "react";
import { Calendar, Clock, Plus, Users, UserCheck } from "lucide-react";
import StatCard from "../../components/dashboard/StatCard";

const initialShifts = [
  { id: 1, name: "Day Shift A - RCC & Framing", timing: "08:00 AM – 05:00 PM", crewCount: 92, supervisor: "Amit Sharma", zone: "Tower A Core" },
  { id: 2, name: "Day Shift B - Electrical & MEP", timing: "08:30 AM – 05:30 PM", crewCount: 46, supervisor: "Manish Kumar", zone: "Floors 4-8" },
  { id: 3, name: "Night Shift - Concrete Pouring", timing: "08:00 PM – 04:00 AM", crewCount: 30, supervisor: "Vikas Verma", zone: "Basement Slab" },
];

function ContractorShifts() {
  const [shifts, setShifts] = useState(initialShifts);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    timing: "08:00 AM – 05:00 PM",
    crewCount: 25,
    supervisor: "Supervisor Lead",
    zone: "Zone B",
  });

  const handleAdd = (e) => {
    e.preventDefault();
    setShifts([...shifts, { ...formData, id: Date.now() }]);
    setShowModal(false);
  };

  return (
    <>
      <div className="welcome-section">
        <div>
          <h1>Shift Scheduling & Duty Rosters 📅</h1>
          <p>Plan and assign workforce shifts, day and night concrete pouring rotations, and supervisor duty charts.</p>
        </div>
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
          <Plus size={16} /> Add Shift Schedule
        </button>
      </div>

      <div className="stats-grid">
        <StatCard title="ACTIVE SHIFTS" value="2 Operating" change="Day & Night" type="projects" />
        <StatCard title="DAY SHIFT CREW" value="138 Crew" change="On duty" type="active" />
        <StatCard title="NIGHT SHIFT CREW" value="30 Crew" change="Pouring batch" type="pending" />
        <StatCard title="TOTAL HOURS TODAY" value="1,344 Hrs" change="Standard 8h" type="users" />
        <StatCard title="SUPERVISOR COVERAGE" value="100%" change="3 Foremen" type="alerts" />
      </div>

      <div className="dashboard-grid role-grid">
        {shifts.map((s) => (
          <div className="dashboard-card" key={s.id} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span className="status-pill good">Active Shift</span>
              <span style={{ fontSize: "11px", color: "#64748b" }}>{s.zone}</span>
            </div>

            <h3 style={{ margin: "2px 0", fontSize: "14px", color: "#1e293b" }}>{s.name}</h3>

            <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "12px", color: "#475569" }}>
              <Clock size={14} color="#d97706" />
              <strong>{s.timing}</strong>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11px", color: "#64748b", borderTop: "1px solid #f1f5f9", paddingTop: "8px" }}>
              <span>Supervisor: <strong>{s.supervisor}</strong></span>
              <span>Crew: <strong>{s.crewCount} Workers</strong></span>
            </div>
          </div>
        ))}
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
            <h3 style={{ margin: "0 0 16px" }}>Add Shift Schedule</h3>
            <form onSubmit={handleAdd} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <div>
                <label style={{ fontSize: "11px", color: "#64748b" }}>Shift Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Afternoon Plastering Shift"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  style={{ width: "100%", padding: "8px", border: "1px solid #e2e8f0", borderRadius: "6px" }}
                />
              </div>

              <div>
                <label style={{ fontSize: "11px", color: "#64748b" }}>Timing</label>
                <input
                  type="text"
                  required
                  value={formData.timing}
                  onChange={(e) => setFormData({ ...formData, timing: e.target.value })}
                  style={{ width: "100%", padding: "8px", border: "1px solid #e2e8f0", borderRadius: "6px" }}
                />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                <div>
                  <label style={{ fontSize: "11px", color: "#64748b" }}>Crew Size</label>
                  <input
                    type="number"
                    value={formData.crewCount}
                    onChange={(e) => setFormData({ ...formData, crewCount: Number(e.target.value) })}
                    style={{ width: "100%", padding: "8px", border: "1px solid #e2e8f0", borderRadius: "6px" }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: "11px", color: "#64748b" }}>Zone</label>
                  <input
                    type="text"
                    value={formData.zone}
                    onChange={(e) => setFormData({ ...formData, zone: e.target.value })}
                    style={{ width: "100%", padding: "8px", border: "1px solid #e2e8f0", borderRadius: "6px" }}
                  />
                </div>
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: "8px" }}>
                <button type="button" className="date-button" onClick={() => setShowModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="date-button" style={{ background: "#d97706", color: "#ffffff", border: "none" }}>
                  Add Shift
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default ContractorShifts;
