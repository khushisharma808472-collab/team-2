import { CheckCircle2, Clock, Calendar, ArrowRight } from "lucide-react";

const milestones = [
  {
    phase: "Phase 1: Foundation & Earthwork",
    date: "Completed Jan 2026",
    status: "Verified & Approved",
    badge: "good",
    progress: 100,
  },
  {
    phase: "Phase 2: RCC Structure (Floors 1-12)",
    date: "Target: 25 Mar 2026",
    status: "85% On Track",
    badge: "progress",
    progress: 85,
  },
  {
    phase: "Phase 3: MEP & Electrical Rough-in",
    date: "Target: 30 Apr 2026",
    status: "45% In Progress",
    badge: "progress",
    progress: 45,
  },
  {
    phase: "Phase 4: Interior Plastering & Flooring",
    date: "Target: 15 Jun 2026",
    status: "Upcoming",
    badge: "pending",
    progress: 0,
  },
  {
    phase: "Phase 5: Final OC & Key Handover",
    date: "Target: 30 Aug 2026",
    status: "Scheduled",
    badge: "pending",
    progress: 0,
  },
];

function ClientMilestoneTimeline() {
  return (
    <div className="dashboard-card client-milestones-card">
      <div className="card-header">
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <Clock size={18} color="#7c3aed" />
          <h3>Project Construction Roadmap</h3>
        </div>
        <span className="client-project-pill">Skyline Heights - Tower A</span>
      </div>

      <div className="client-timeline-list">
        {milestones.map((m, idx) => (
          <div className="timeline-row" key={idx}>
            <div className={`timeline-marker ${m.badge}`}>
              {m.progress === 100 ? (
                <CheckCircle2 size={14} />
              ) : (
                <span>{idx + 1}</span>
              )}
            </div>

            <div className="timeline-content">
              <div className="timeline-header">
                <strong>{m.phase}</strong>
                <span className={`timeline-badge ${m.badge}`}>{m.status}</span>
              </div>

              <div className="timeline-track">
                <div
                  className={`timeline-fill ${m.badge}`}
                  style={{ width: `${m.progress}%` }}
                />
              </div>

              <div className="timeline-footer">
                <span className="timeline-date">
                  <Calendar size={12} style={{ display: "inline", marginRight: "4px" }} />
                  {m.date}
                </span>
                <span className="timeline-pct">{m.progress}%</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button className="view-projects-btn" style={{ marginTop: "14px" }}>
        <span>Download Detailed Milestone Schedule</span>
        <ArrowRight size={14} />
      </button>
    </div>
  );
}

export default ClientMilestoneTimeline;

