import { useState, useEffect } from "react";
import { Bell, CheckCheck, AlertTriangle, CheckCircle2, Info, ShieldAlert, Calendar } from "lucide-react";
import API from "../../services/api";

function WorkerNotifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const res = await API.get("/notifications");
      if (res.data?.data && res.data.data.length > 0) {
        setNotifications(res.data.data);
      } else {
        // Fallback default notifications for worker portal
        setNotifications([
          {
            _id: "w1",
            title: "Mandatory Safety Briefing",
            message: "All workers at Sector 4 must attend the 8:00 AM toolbox talk on scaffolding safety.",
            time: "10m ago",
            type: "warning",
            read: false,
          },
          {
            _id: "w2",
            title: "Shift Assigned: Morning Crew",
            message: "You have been scheduled for 07:00 AM - 03:30 PM tomorrow at Skyline Tower Level 3.",
            time: "1h ago",
            type: "info",
            read: false,
          },
          {
            _id: "w3",
            title: "Wage Slip Generated",
            message: "Pay slip for the cycle Aug 16 - Aug 31 is now ready for view and download.",
            time: "2d ago",
            type: "success",
            read: true,
          },
        ]);
      }
    } catch (err) {
      console.error(err);
      setNotifications([
        {
          _id: "w1",
          title: "Mandatory Safety Briefing",
          message: "All workers at Sector 4 must attend the 8:00 AM toolbox talk on scaffolding safety.",
          time: "10m ago",
          type: "warning",
          read: false,
        },
        {
          _id: "w2",
          title: "Shift Assigned: Morning Crew",
          message: "You have been scheduled for 07:00 AM - 03:30 PM tomorrow at Skyline Tower Level 3.",
          time: "1h ago",
          type: "info",
          read: false,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const handleMarkAll = async () => {
    try {
      await API.put("/notifications/mark-all-read");
      fetchNotifications();
    } catch (err) {
      console.error(err);
      setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    }
  };

  return (
    <>
      <div className="welcome-section" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h1>Worker Safety & Shift Alerts 🔔</h1>
          <p>Toolbox talk schedules, weather advisories, shift assignments, and punch confirmations.</p>
        </div>
        <button
          className="date-button"
          style={{ display: "flex", alignItems: "center", gap: "6px" }}
          onClick={handleMarkAll}
        >
          <CheckCheck size={16} /> Mark All Read
        </button>
      </div>

      <div className="dashboard-card" style={{ maxWidth: "800px" }}>
        <div className="card-header">
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <Bell size={18} color="#2563eb" />
            <h3>Notification Feed</h3>
          </div>
          <span style={{ fontSize: "11px", color: "#64748b" }}>Real-time site advisories</span>
        </div>

        {loading ? (
          <div style={{ padding: "30px", textAlign: "center" }}>Loading alerts...</div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {notifications.map((n) => {
              const Icon = n.type === "warning" ? AlertTriangle : n.type === "success" ? CheckCircle2 : Info;
              return (
                <div
                  key={n._id}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "12px",
                    padding: "12px",
                    borderRadius: "8px",
                    background: n.read ? "#f8fafc" : "#eff6ff",
                    border: n.read ? "1px solid #f1f5f9" : "1px solid #bfdbfe",
                  }}
                >
                  <div className={`activity-icon ${n.type === "warning" ? "role" : "project"}`}>
                    <Icon size={16} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <strong style={{ fontSize: "13px", color: "#1e293b" }}>{n.title}</strong>
                      <span style={{ fontSize: "10px", color: "#94a3b8" }}>{n.time}</span>
                    </div>
                    <p style={{ margin: "4px 0 0", fontSize: "11px", color: "#64748b" }}>{n.message}</p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}

export default WorkerNotifications;
