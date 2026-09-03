import { Truck, CheckCircle2, Wrench, Clock } from "lucide-react";

const machinery = [
  {
    name: "Tower Crane #1",
    type: "Crane",
    status: "Operational",
    operator: "Rajesh S.",
    badge: "status-operational",
    icon: CheckCircle2,
  },
  {
    name: "CAT Excavator 320",
    type: "Excavator",
    status: "In Use",
    operator: "Harpreet Singh",
    badge: "status-operational",
    icon: CheckCircle2,
  },
  {
    name: "Transit Mixer 8m³",
    type: "Concrete Mixer",
    status: "Scheduled Delivery",
    operator: "Vikas Verma",
    badge: "status-scheduled",
    icon: Clock,
  },
  {
    name: "Tipper Truck #4",
    type: "Dump Truck",
    status: "Maintenance",
    operator: "Workshop",
    badge: "status-maintenance",
    icon: Wrench,
  },
  {
    name: "Diesel Generator 125kVA",
    type: "Generator",
    status: "Standby",
    operator: "Site Crew",
    badge: "status-scheduled",
    icon: CheckCircle2,
  },
];

function EquipmentStatusWidget() {
  return (
    <div className="dashboard-card equipment-card">
      <div className="card-header">
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <Truck size={18} color="#3b82f6" />
          <h3>Equipment & Machinery Status</h3>
        </div>
        <span style={{ fontSize: "11px", color: "#64748b" }}>5 Units Logged</span>
      </div>

      <div className="machinery-list">
        {machinery.map((item) => {
          const Icon = item.icon;
          return (
            <div className="machinery-item" key={item.name}>
              <div className="machinery-info">
                <strong>{item.name}</strong>
                <span className="machinery-type">
                  {item.type} • Op: {item.operator}
                </span>
              </div>

              <span className={`equipment-badge ${item.badge}`}>
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

export default EquipmentStatusWidget;

