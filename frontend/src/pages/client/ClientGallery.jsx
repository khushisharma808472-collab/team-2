import { useState } from "react";
import { Image, Eye, Download, X } from "lucide-react";
import StatCard from "../../components/dashboard/StatCard";

function ClientGallery() {
  const [selectedImage, setSelectedImage] = useState(null);
  const galleryItems = [];

  return (
    <>
      <div className="welcome-section">
        <div>
          <h1>Site Photo & Drone Gallery 📸</h1>
          <p>Weekly aerial drone flyovers, structural progression photos, and site inspection archives.</p>
        </div>
      </div>

      <div className="stats-grid">
        <StatCard title="TOTAL PHOTOS" value="0" change="No data" type="projects" />
        <StatCard title="DRONE FLIGHTS" value="0" change="No data" type="active" />
        <StatCard title="CAMERA NODES" value="0" change="No data" type="users" />
        <StatCard title="360° TOURS" value="0" change="No data" type="pending" />
        <StatCard title="QUALITY VERIFIED" value="0%" change="No data" type="alerts" />
      </div>

      <div className="dashboard-grid role-grid">
        {galleryItems.length === 0 ? (
          <div className="dashboard-card" style={{ padding: "30px", textAlign: "center", color: "#64748b" }}>
            No site photos available.
          </div>
        ) : (
          galleryItems.map((item) => (
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
          ))
        )}
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
