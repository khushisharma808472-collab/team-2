import { ClipboardList, ArrowRight } from "lucide-react";

const workOrders = [
  {
    id: "WO-2026-081",
    title: "RCC Frame Casting - Block C",
    lead: "Amit Sharma",
    progress: 82,
    deadline: "12 Mar 2026",
    status: "On Schedule",
    statusClass: "good",
  },
  {
    id: "WO-2026-089",
    title: "Brick Masonry & Plastering",
    lead: "Sunil Rawat",
    progress: 45,
    deadline: "25 Mar 2026",
    status: "In Progress",
    statusClass: "warning",
  },
  {
    id: "WO-2026-092",
    title: "External Drainage Pipeline",
    lead: "Karan Patel",
    progress: 25,
    deadline: "05 Apr 2026",
    status: "Delayed (Pipe Supply)",
    statusClass: "danger",
  },
  {
    id: "WO-2026-095",
    title: "Internal Electrical Conduit Laying",
    lead: "Manish Kumar",
    progress: 60,
    deadline: "18 Apr 2026",
    status: "On Schedule",
    statusClass: "good",
  },
];

function ContractorWorkOrders() {
  return (
    <div className="dashboard-card contractor-orders-card">
      <div className="card-header">
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <ClipboardList size={18} color="#3b82f6" />
          <h3>Active Work Orders</h3>
        </div>
        <span style={{ fontSize: "11px", color: "#64748b" }}>4 Active</span>
      </div>

      <div className="work-orders-list">
        {workOrders.map((wo) => (
          <div className="work-order-row" key={wo.id}>
            <div className="order-main">
              <div className="order-title-wrap">
                <span className="order-id">{wo.id}</span>
                <strong>{wo.title}</strong>
              </div>
              <span className="order-meta">Supervisor: {wo.lead} • Due: {wo.deadline}</span>
            </div>

            <div className="order-progress-wrap">
              <div className="order-progress-bar">
                <div
                  className="order-progress-fill"
                  style={{ width: `${wo.progress}%` }}
                />
              </div>
              <div className="order-status-row">
                <span className={`order-status-badge ${wo.statusClass}`}>
                  {wo.status}
                </span>
                <span className="order-pct">{wo.progress}%</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button className="view-projects-btn" style={{ marginTop: "14px" }}>
        <span>View all work packages</span>
        <ArrowRight size={14} />
      </button>
    </div>
  );
}

export default ContractorWorkOrders;

