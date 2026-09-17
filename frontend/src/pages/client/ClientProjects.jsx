import { useState, useEffect } from "react";
import { Building2, CheckCircle2, Calendar, MapPin } from "lucide-react";
import API from "../../services/api";
import StatCard from "../../components/dashboard/StatCard";

function ClientProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await API.get("/projects");
        if (res.data?.data) {
          setProjects(res.data.data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  return (
    <>
      <div className="welcome-section">
        <div>
          <h1>My Projects Portfolio 🏢</h1>
          <p>Real-time construction execution, unit specifications, structural sign-offs, and handover timelines.</p>
        </div>
      </div>

      <div className="stats-grid">
        <StatCard title="TOTAL DEVELOPMENTS" value={String(projects.length)} change="Active" type="projects" />
        <StatCard title="OVERALL COMPLETION" value="0%" change="No data" type="active" />
        <StatCard title="TOTAL INVESTMENT" value="₹ 0" change="No data" type="users" />
        <StatCard title="DISBURSED AMOUNT" value="₹ 0" change="No data" type="pending" />
        <StatCard title="TARGET POSSESSION" value="No data" change="No data" type="alerts" />
      </div>

      <div className="dashboard-grid role-grid">
        {loading ? (
          <div style={{ padding: "30px", textAlign: "center" }}>Loading projects...</div>
        ) : projects.length === 0 ? (
          <div className="dashboard-card" style={{ padding: "30px", textAlign: "center", color: "#64748b" }}>No projects available.</div>
        ) : (
          projects.map((p) => (
            <div className="dashboard-card" key={p._id} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div>
                  <h3 style={{ margin: 0, fontSize: "15px", color: "#1e293b" }}>{p.name}</h3>
                  <span style={{ fontSize: "11px", color: "#64748b", display: "flex", alignItems: "center", gap: "4px", marginTop: "2px" }}>
                    <MapPin size={12} /> {p.location}
                  </span>
                </div>
                <span className="status-pill good">{p.status}</span>
              </div>

              <div style={{ background: "#f8fafc", padding: "10px", borderRadius: "8px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11px", marginBottom: "4px" }}>
                  <span>Completion Status</span>
                  <strong>{p.progress}%</strong>
                </div>
                <div className="progress-track" style={{ height: "7px" }}>
                  <div className="progress-fill" style={{ width: `${p.progress}%` }} />
                </div>
              </div>

              <p style={{ margin: 0, fontSize: "12px", color: "#64748b" }}>{p.description || "No description available."}</p>

              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11px", color: "#64748b", borderTop: "1px solid #f1f5f9", paddingTop: "8px" }}>
                <span>Contract Value: <strong style={{ color: "#1e293b" }}>{p.budget}</strong></span>
                <span>Handover: <strong style={{ color: "#1e293b" }}>{p.endDate}</strong></span>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
}

export default ClientProjects;
