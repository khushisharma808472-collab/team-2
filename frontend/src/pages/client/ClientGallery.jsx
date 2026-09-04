import { useState } from "react";
import { Image, Eye, Download, X } from "lucide-react";
import StatCard from "../../components/dashboard/StatCard";

const galleryItems = [
  {
    id: 1,
    title: "Tower A - Level 12 Slab Pouring",
    date: "25 Aug 2026",
    tag: "Structural",
    description: "High-angle perspective of concrete placement and rebar cage alignment.",
    imageUrl: "https://images.unsplash.com/photo-1541888946425-d0fbb18615f8?w=800&auto=format&fit=crop&q=60",
  },
  {
    id: 2,
    title: "Drone Aerial Survey - East Wing",
    date: "22 Aug 2026",
    tag: "Drone Survey",
    description: "Perimeter glazing framing and facade scaffolding progress.",
    imageUrl: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&auto=format&fit=crop&q=60",
  },
  {
    id: 3,
    title: "Basement 2 Sump Pit Drainage Inspection",
    date: "18 Aug 2026",
    tag: "MEP & Drainage",
    description: "Waterproofing membrane installation and sumppump verification.",
    imageUrl: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&auto=format&fit=crop&q=60",
  },
  {
    id: 4,
    title: "Central Core Column Alignment",
    date: "12 Aug 2026",
    tag: "Quality Audit",
    description: "Laser plummeter verticality survey of Tower A shear walls.",
    imageUrl: "https://images.unsplash.com/photo-1590486803833-1c5dc8ddd4c8?w=800&auto=format&fit=crop&q=60",
  },
];

function ClientGallery() {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <>
      <div className="welcome-section">
        <div>
          <h1>Site Photo & Drone Gallery 📸</h1>
          <p>Weekly aerial drone flyovers, structural progression photos, and site inspection archives.</p>
        </div>
        <button className="date-button">📅 Latest Upload: 25 Aug 2026</button>
      </div>

      <div className="stats-grid">
        <StatCard title="TOTAL PHOTOS" value="48 Photos" change="High-Res" type="projects" />
        <StatCard title="DRONE FLIGHTS" value="8 Surveys" change="Bi-weekly" type="active" />
        <StatCard title="CAMERA NODES" value="6 CCTV Live" change="24/7 Feed" type="users" />
        <StatCard title="360° TOURS" value="4 Virtual" change="Level 8 Core" type="pending" />
        <StatCard title="QUALITY VERIFIED" value="100%" change="Clean audits" type="alerts" />
      </div>

      <div className="dashboard-grid role-grid">
        {galleryItems.map((item) => (
          <div
            className="dashboard-card"
            key={item.id}
            style={{ padding: 0, overflow: "hidden", display: "flex", flexDirection: "column" }}
          >
            <div
              style={{ position: "relative", height: "180px", cursor: "pointer", background: "#f1f5f9" }}
              onClick={() => setSelectedImage(item)}
            >
              <img
                src={item.imageUrl}
                alt={item.title}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
              <span
                style={{
                  position: "absolute",
                  top: "10px",
                  left: "10px",
                  background: "rgba(15, 23, 42, 0.75)",
                  color: "#ffffff",
                  fontSize: "10px",
                  fontWeight: 600,
                  padding: "3px 8px",
                  borderRadius: "4px",
                }}
              >
                {item.tag}
              </span>
            </div>

            <div style={{ padding: "14px", display: "flex", flexDirection: "column", gap: "6px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <strong style={{ fontSize: "13px", color: "#1e293b" }}>{item.title}</strong>
                <span style={{ fontSize: "10px", color: "#94a3b8" }}>{item.date}</span>
              </div>
              <p style={{ margin: 0, fontSize: "11px", color: "#64748b" }}>{item.description}</p>
              <button
                className="view-projects-btn"
                style={{ marginTop: "6px" }}
                onClick={() => setSelectedImage(item)}
              >
                <Eye size={13} /> View Full Image
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedImage && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(15, 23, 42, 0.75)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
            padding: "20px",
          }}
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="dashboard-card"
            style={{ maxWidth: "700px", width: "100%", padding: "16px", background: "#ffffff" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
              <div>
                <h3 style={{ margin: 0, fontSize: "15px" }}>{selectedImage.title}</h3>
                <span style={{ fontSize: "11px", color: "#64748b" }}>
                  {selectedImage.tag} • {selectedImage.date}
                </span>
              </div>
              <button
                style={{ border: "none", background: "transparent", cursor: "pointer", color: "#64748b" }}
                onClick={() => setSelectedImage(null)}
              >
                <X size={20} />
              </button>
            </div>

            <img
              src={selectedImage.imageUrl}
              alt={selectedImage.title}
              style={{ width: "100%", maxHeight: "400px", objectFit: "cover", borderRadius: "8px" }}
            />
            <p style={{ marginTop: "12px", fontSize: "12px", color: "#475569" }}>{selectedImage.description}</p>
          </div>
        </div>
      )}
    </>
  );
}

export default ClientGallery;
