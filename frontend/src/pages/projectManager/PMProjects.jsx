import { useState, useEffect } from "react";
import { Plus, Search, Edit2, Trash2, FolderKanban } from "lucide-react";
import API from "../../services/api";
import { canEdit } from "../../utils/auth";

function PMProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    client: "",
    budget: "₹ 15.0 Cr",
    status: "On Track",
    progress: 50,
    endDate: "30 Dec 2026",
  });

  const isAuthorized = canEdit("projects");

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const res = await API.get("/projects");
      if (res.data && res.data.data) {
        setProjects(res.data.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleOpenAdd = () => {
    setEditingProject(null);
    setFormData({
      name: "",
      client: "Skyline Realty Ltd",
      budget: "₹ 15.0 Cr",
      status: "On Track",
      progress: 20,
      endDate: "30 Dec 2026",
    });
    setShowModal(true);
  };

  const handleOpenEdit = (p) => {
    setEditingProject(p);
    setFormData({
      name: p.name,
      client: p.client,
      budget: p.budget,
      status: p.status,
      progress: p.progress,
      endDate: p.endDate,
    });
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingProject) {
        await API.put(`/projects/${editingProject._id}`, formData);
      } else {
        await API.post("/projects", formData);
      }
      setShowModal(false);
      fetchProjects();
    } catch (err) {
      alert(err.response?.data?.message || "Operation failed");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete project?")) return;
    try {
      await API.delete(`/projects/${id}`);
      fetchProjects();
    } catch (err) {
      alert(err.response?.data?.message || "Delete failed");
    }
  };

  const filtered = projects.filter(
    (p) =>
      p.name?.toLowerCase().includes(search.toLowerCase()) ||
      p.client?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <div className="pm-welcome-section" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h1>Managed Projects 📁</h1>
          <p>Portfolio delivery schedules, milestones, and cost control.</p>
        </div>
        {isAuthorized && (
          <button
            className="pm-menu-item active"
            style={{ width: "auto", padding: "8px 16px", borderRadius: "8px", cursor: "pointer" }}
            onClick={handleOpenAdd}
          >
            <Plus size={16} style={{ marginRight: "4px" }} /> Add Project
          </button>
        )}
      </div>

      <div className="dashboard-card" style={{ marginBottom: "20px", display: "flex", gap: "10px", alignItems: "center" }}>
        <div className="pm-search-box" style={{ width: "300px" }}>
          <Search size={16} />
          <input
            type="text"
            placeholder="Search projects..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {loading ? (
        <div style={{ padding: "40px", textAlign: "center", color: "#64748b" }}>Loading projects...</div>
      ) : (
        <div className="dashboard-grid role-grid">
          {filtered.map((proj) => (
            <div className="dashboard-card" key={proj._id} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div>
                  <h3 style={{ margin: 0, fontSize: "14px", color: "#1e293b" }}>{proj.name}</h3>
                  <span style={{ fontSize: "11px", color: "#64748b" }}>Client: {proj.client}</span>
                </div>
                <span
                  className={`status-pill ${
                    proj.status === "On Track" ? "good" : proj.status === "Delayed" ? "warning" : "danger"
                  }`}
                >
                  {proj.status}
                </span>
              </div>

              <div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11px", marginBottom: "4px" }}>
                  <span>Progress</span>
                  <strong>{proj.progress}%</strong>
                </div>
                <div className="progress-track" style={{ height: "6px" }}>
                  <div className="progress-fill" style={{ width: `${proj.progress}%` }} />
                </div>
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11px", color: "#64748b" }}>
                <span>Budget: <strong style={{ color: "#1e293b" }}>{proj.budget}</strong></span>
                <span>Deadline: <strong style={{ color: "#1e293b" }}>{proj.endDate}</strong></span>
              </div>

              {isAuthorized && (
                <div style={{ display: "flex", justifyContent: "flex-end", gap: "8px", borderTop: "1px solid #f1f5f9", paddingTop: "8px" }}>
                  <button
                    className="pm-menu-item"
                    style={{ width: "auto", height: "26px", padding: "0 8px", fontSize: "11px" }}
                    onClick={() => handleOpenEdit(proj)}
                  >
                    <Edit2 size={12} style={{ marginRight: "4px" }} /> Edit
                  </button>
                  <button
                    className="pm-menu-item"
                    style={{ width: "auto", height: "26px", padding: "0 8px", fontSize: "11px", color: "#ef4444" }}
                    onClick={() => handleDelete(proj._id)}
                  >
                    <Trash2 size={12} style={{ marginRight: "4px" }} /> Delete
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

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
          <div className="dashboard-card" style={{ width: "400px" }}>
            <h3 style={{ margin: "0 0 16px" }}>{editingProject ? "Edit Project" : "Add Project"}</h3>
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <div>
                <label style={{ fontSize: "11px", color: "#64748b" }}>Project Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  style={{ width: "100%", padding: "8px", border: "1px solid #e2e8f0", borderRadius: "6px" }}
                />
              </div>

              <div>
                <label style={{ fontSize: "11px", color: "#64748b" }}>Client</label>
                <input
                  type="text"
                  value={formData.client}
                  onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                  style={{ width: "100%", padding: "8px", border: "1px solid #e2e8f0", borderRadius: "6px" }}
                />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                <div>
                  <label style={{ fontSize: "11px", color: "#64748b" }}>Budget</label>
                  <input
                    type="text"
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    style={{ width: "100%", padding: "8px", border: "1px solid #e2e8f0", borderRadius: "6px" }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: "11px", color: "#64748b" }}>Progress %</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={formData.progress}
                    onChange={(e) => setFormData({ ...formData, progress: Number(e.target.value) })}
                    style={{ width: "100%", padding: "8px", border: "1px solid #e2e8f0", borderRadius: "6px" }}
                  />
                </div>
              </div>

              <div>
                <label style={{ fontSize: "11px", color: "#64748b" }}>Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  style={{ width: "100%", padding: "8px", border: "1px solid #e2e8f0", borderRadius: "6px" }}
                >
                  <option value="On Track">On Track</option>
                  <option value="Delayed">Delayed</option>
                  <option value="At Risk">At Risk</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: "8px", marginTop: "8px" }}>
                <button type="button" className="date-button" onClick={() => setShowModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="date-button" style={{ background: "#d97706", color: "#ffffff", border: "none" }}>
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default PMProjects;
