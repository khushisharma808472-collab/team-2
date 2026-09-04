import { useState, useEffect } from "react";
import { Download, FileCheck, CheckCircle2 } from "lucide-react";
import ClientSiteUpdates from "../../components/client/ClientSiteUpdates";
import StatCard from "../../components/dashboard/StatCard";
import API from "../../services/api";

function ClientReports() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const res = await API.get("/reports");
        if (res.data?.data) {
          setReports(res.data.data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchReports();
  }, []);

  const handleDownload = () => {
    alert("Generating official PDF Progress and Handover Summary Report...");
  };

  return (
    <>
      <div className="welcome-section" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h1>Quality Sign-offs & Handover Reports 📑</h1>
          <p>Verified structural test certificates, architectural sign-offs, and monthly progress bulletins.</p>
        </div>
        <button
          className="date-button"
          style={{ background: "#d97706", color: "#ffffff", border: "none", display: "flex", alignItems: "center", gap: "6px" }}
          onClick={handleDownload}
        >
          <Download size={15} /> Download PDF Report
        </button>
      </div>

      <div className="stats-grid">
        <StatCard title="VERIFIED AUDITS" value="12 Passed" change="100% score" type="projects" />
        <StatCard title="LAB TEST RESULTS" value="28 Cylinders" change="M25 & M40" type="active" />
        <StatCard title="THIRD-PARTY AUDIT" value="Cleared" change="TUV certified" type="users" />
        <StatCard title="HANDOVER ESTIMATE" value="Aug 2026" change="On schedule" type="pending" />
        <StatCard title="CRITICAL SNAGS" value="0" change="All clear" type="alerts" />
      </div>

      <div className="dashboard-grid role-grid">
        <ClientSiteUpdates />

        <div className="dashboard-card">
          <div className="card-header">
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <FileCheck size={18} color="#059669" />
              <h3>Certified Inspection Certificates</h3>
            </div>
            <span style={{ fontSize: "11px", color: "#64748b" }}>Live Records</span>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {reports.map((rep) => (
              <div
                key={rep._id}
                style={{
                  padding: "10px",
                  background: "#f8fafc",
                  borderRadius: "8px",
                  border: "1px solid #f1f5f9",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div>
                  <strong style={{ fontSize: "12px", color: "#1e293b", display: "block" }}>{rep.title}</strong>
                  <span style={{ fontSize: "10px", color: "#64748b" }}>{rep.location} • {rep.date}</span>
                </div>
                <span className="status-pill good">Certified</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default ClientReports;
