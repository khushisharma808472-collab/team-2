import { Package, Clock, CheckCircle2, Truck } from "lucide-react";

const requisitions = [
  {
    id: "REQ-104",
    material: "OPC 53 Cement",
    category: "Cement",
    qty: "450 Bags",
    date: "Today, 10:15 AM",
    status: "Approved",
    badge: "good",
    icon: CheckCircle2,
  },
  {
    id: "REQ-102",
    material: "TMT Rebar 16mm (Fe 550)",
    category: "Steel",
    qty: "12 Metric Tons",
    date: "Yesterday",
    status: "In Transit",
    badge: "transit",
    icon: Truck,
  },
  {
    id: "REQ-099",
    material: "Ready-Mix Concrete (M25)",
    category: "Concrete",
    qty: "65 m³",
    date: "Yesterday",
    status: "Delivered",
    badge: "good",
    icon: CheckCircle2,
  },
  {
    id: "REQ-097",
    material: "Red Clay Bricks",
    category: "Bricks",
    qty: "15,000 Pcs",
    date: "01 Mar 2026",
    status: "Pending Approval",
    badge: "warning",
    icon: Clock,
  },
];

function MaterialRequestsWidget() {
  return (
    <div className="dashboard-card material-requests-card">
      <div className="card-header">
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <Package size={18} color="#10b981" />
          <h3>Material & Stock Requisitions</h3>
        </div>
        <span style={{ fontSize: "11px", color: "#64748b" }}>Live Requisitions</span>
      </div>

      <div className="material-req-list">
        {requisitions.map((item) => {
          const Icon = item.icon;
          return (
            <div className="material-req-item" key={item.id}>
              <div className="req-col-main">
                <div className="req-title-row">
                  <span className="req-id">{item.id}</span>
                  <strong>{item.material}</strong>
                </div>
                <span className="req-meta">
                  Qty: {item.qty} • {item.date}
                </span>
              </div>

              <span className={`req-badge ${item.badge}`}>
                <Icon size={12} />
                {item.status}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default MaterialRequestsWidget;

