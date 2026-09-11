import { useState, useEffect } from "react";
import { Package, AlertCircle } from "lucide-react";
import API from "../../services/api";

function PMInventory() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const res = await API.get("/inventory");
        if (res.data?.data) setItems(res.data.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchInventory();
  }, []);

  return (
    <>
      <div className="pm-welcome-section">
        <h1>Material Inventory Levels 📦</h1>
        <p>Monitor warehouse supply and requisition alerts across project sites.</p>
      </div>

      <div className="dashboard-card">
        <div className="card-header">
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <Package size={18} color="#d97706" />
            <h3>Site Stock Levels</h3>
          </div>
          <span style={{ fontSize: "11px", color: "#64748b" }}>Live Supply</span>
        </div>

        {loading ? (
          <div style={{ padding: "30px", textAlign: "center" }}>Loading inventory...</div>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "12px", textAlign: "left" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid #e2e8f0", color: "#64748b" }}>
                  <th style={{ padding: "10px" }}>Material Name</th>
                  <th style={{ padding: "10px" }}>Category</th>
                  <th style={{ padding: "10px" }}>Quantity</th>
                  <th style={{ padding: "10px" }}>Warehouse Location</th>
                  <th style={{ padding: "10px" }}>Stock Status</th>
                </tr>
              </thead>
              <tbody>
                {items.length === 0 ? (
                  <tr>
                    <td colSpan="5" style={{ padding: "30px", textAlign: "center", color: "#64748b" }}>
                      No inventory items available.
                    </td>
                  </tr>
                ) : (
                items.map((item) => (
                  <tr key={item._id} style={{ borderBottom: "1px solid #f1f5f9" }}>
                    <td style={{ padding: "12px 10px", fontWeight: 600, color: "#1e293b" }}>{item.name}</td>
                    <td style={{ padding: "12px 10px", color: "#64748b" }}>{item.category}</td>
                    <td style={{ padding: "12px 10px", color: "#1e293b" }}>
                      {item.quantity} {item.unit}
                    </td>
                    <td style={{ padding: "12px 10px", color: "#64748b" }}>{item.location}</td>
                    <td style={{ padding: "12px 10px" }}>
                      <span
                        className={`status-pill ${
                          item.status === "In Stock" ? "good" : item.status === "Low Stock" ? "warning" : "danger"
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}

export default PMInventory;
