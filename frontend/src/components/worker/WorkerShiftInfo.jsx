import { Clock, MapPin, UserCheck, ShieldCheck } from "lucide-react";

function WorkerShiftInfo() {
  return (
    <div className="dashboard-card worker-shift-card">
      <div className="card-header">
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <Clock size={18} color="#0d9488" />
          <h3>Today's Shift & Duty Status</h3>
        </div>
        <span className="punch-status-badge">
          <UserCheck size={12} />
          Punched In (07:52 AM)
        </span>
      </div>

      <div className="worker-shift-body">
        <div className="shift-main-row">
          <div className="shift-site-info">
            <span className="shift-label">Active Worksite</span>
            <strong className="shift-site-name">
              <MapPin size={14} style={{ display: "inline", marginRight: "4px" }} />
              Metro Tower A - Floor 8
            </strong>
            <span className="shift-subtext">Assigned Zone: East Wing Core</span>
          </div>

          <div className="shift-timing-info">
            <span className="shift-label">Shift Hours</span>
            <strong className="shift-hours">08:00 AM – 05:00 PM</strong>
            <span className="shift-subtext">Day Shift (9 hrs incl. lunch)</span>
          </div>
        </div>

        <div className="shift-divider" />

        <div className="shift-footer-details">
          <div className="shift-detail-item">
            <span>Supervisor On-Duty</span>
            <strong>Amit Sharma (Site Lead)</strong>
          </div>

          <div className="shift-detail-item">
            <span>Trade / Category</span>
            <strong>Skilled Masonry & Rebar</strong>
          </div>

          <div className="shift-detail-item">
            <span>Safety Clearance</span>
            <strong style={{ color: "#059669", display: "flex", alignItems: "center", gap: "4px" }}>
              <ShieldCheck size={14} /> Passed Today
            </strong>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WorkerShiftInfo;

