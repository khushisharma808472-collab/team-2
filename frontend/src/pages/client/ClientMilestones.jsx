import { useState, useEffect } from "react";
import { Milestone, CheckCircle2, Clock, Calendar, Check } from "lucide-react";
import API from "../../services/api";
import StatCard from "../../components/dashboard/StatCard";

function ClientMilestones() {
  const [milestones, setMilestones] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMilestones = async () => {
    try {
      setLoading(true);
      const res = await API.get("/milestones");
      if (res.data?.data) {
        setMilestones(res.data.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMilestones();
  }, []);

  const handleApprove = async (id) => {
    try {
      await API.put(`/milestones/${id}`, { clientApproved: true, status: "Client Approved & Verified" });
      fetchMilestones();
    } catch (err) {
      alert(err.response?.data?.message || "Approval failed");
    }
  };

  return (
    <>
      <div className="welcome-section">
        <div>
          <h1>Project Construction Milestones 🚩</h1>
          <p>Verify completion stages, review independent engineer audits, and approve milestone disbursements.</p>
        </div>
      </div>

      <div className="stats-grid">
        <StatCard title="TOTAL MILESTONES" value={String(milestones.length)} change="Full Project" type="projects" />
        <StatCard
          title="CLIENT APPROVED"
          value={String(milestones.filter((m) => m.clientApproved).length)}
          change="Signed off"
          type="active"
        />
        <StatCard title="CURRENT STAGE" value="No data" change="No data" type="users" />
        <StatCard title="NEXT DISBURSEMENT" value="₹ 0" change="No data" type="pending" />
        <StatCard title="QUALITY CLEARANCE" value="0%" change="No data" type="alerts" />
      </div>

      <div className="dashboard-card" style={{ maxWidth: "800px" }}>
        <div className="card-header">
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <Milestone size={18} color="#7c3aed" />
            <h3>Milestone Verification Roadmap</h3>
          </div>
          <span style={{ fontSize: "11px", color: "#64748b" }}>Progress & Approvals</span>
        </div>

        {loading ? (
          <div style={{ padding: "30px", textAlign: "center" }}>Loading milestones...</div>
        ) : (
          <div className="client-timeline-list">
            {milestones.length === 0 ? (
              <div style={{ padding: "30px", textAlign: "center", color: "#64748b" }}>No milestones available.</div>
            ) : (
              milestones.map((m, idx) => (
                <div className="timeline-row" key={m._id} style={{ alignItems: "center" }}>
                  <div className={`timeline-marker ${m.progress === 100 ? "good" : "progress"}`}>
                    {m.progress === 100 ? <CheckCircle2 size={14} /> : <span>{idx + 1}</span>}
                  </div>

                  <div className="timeline-content" style={{ flex: 1 }}>
                    <div className="timeline-header">
                      <strong>{m.phase}</strong>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <span className={`timeline-badge ${m.progress === 100 ? "good" : "progress"}`}>
                          {m.clientApproved ? "Client Approved" : m.status}
                        </span>
                        {!m.clientApproved && m.progress >= 80 && (
                          <button
                            className="date-button"
                            style={{
                              background: "#059669",
                              color: "#ffffff",
                              border: "none",
                              padding: "4px 10px",
                              fontSize: "11px",
                              display: "flex",
                              alignItems: "center",
                              gap: "4px",
                            }}
                            onClick={() => handleApprove(m._id)}
                          >
                            <Check size={12} /> Sign-off
                          </button>
                        )}
                      </div>
                    </div>

                    <div className="timeline-track" style={{ margin: "6px 0" }}>
                      <div className="timeline-fill good" style={{ width: `${m.progress}%` }} />
                    </div>

                    <div className="timeline-footer">
                      <span className="timeline-date">
                        <Calendar size={12} style={{ display: "inline", marginRight: "4px" }} />
                        {m.date}
                      </span>
                      <span>Stage Value: <strong>{m.amount}</strong></span>
                      <span className="timeline-pct">{m.progress}%</span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </>
  );
}

export default ClientMilestones;
