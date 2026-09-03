import { ShieldCheck, Check } from "lucide-react";

const ppeItems = [
  { item: "Hard Hat / Safety Helmet", status: "Equipped & Inspected", required: true },
  { item: "Steel-Toe Safety Boots", status: "Equipped & Inspected", required: true },
  { item: "High-Visibility Safety Vest", status: "Equipped & Inspected", required: true },
  { item: "Fall Arrest Safety Harness", status: "Certified for Level 8", required: true },
  { item: "Reinforced Work Gloves", status: "In Use", required: true },
  { item: "Eye Protection / Safety Goggles", status: "In Use", required: false },
];

function WorkerSafetyChecklist() {
  return (
    <div className="dashboard-card worker-safety-card">
      <div className="card-header">
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <ShieldCheck size={18} color="#059669" />
          <h3>Mandatory PPE & Safety Clearance</h3>
        </div>
        <span className="safety-cleared-pill">
          100% Cleared
        </span>
      </div>

      <div className="ppe-list">
        {ppeItems.map((ppe, idx) => (
          <div className="ppe-item" key={idx}>
            <div className="ppe-check-circle">
              <Check size={13} strokeWidth={3} />
            </div>

            <div className="ppe-info">
              <strong>{ppe.item}</strong>
              <span>{ppe.status}</span>
            </div>

            {ppe.required && (
              <span className="ppe-mandatory-badge">Mandatory</span>
            )}
          </div>
        ))}
      </div>

      <div className="safety-emergency-box">
        <span>Site Safety Officer: <strong>Suresh Patil (Ext. 108)</strong></span>
      </div>
    </div>
  );
}

export default WorkerSafetyChecklist;

