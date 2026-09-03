import { useState } from "react";
import { CheckSquare, CheckCircle2, Clock } from "lucide-react";

const initialTasks = [
  {
    id: 1,
    title: "Rebar Binding for Column C-12",
    zone: "Floor 8, East Wing",
    status: "Completed",
    done: true,
  },
  {
    id: 2,
    title: "Mortar Batch Mixing & Quality Check",
    zone: "Central Mortar Station",
    status: "In Progress",
    done: false,
  },
  {
    id: 3,
    title: "Plaster Base Coat Application (Unit 802)",
    zone: "Floor 8, Interior",
    status: "Pending",
    done: false,
  },
  {
    id: 4,
    title: "End-of-Day Tool Inventory & Safety Lockup",
    zone: "Tools Locker #4",
    status: "Pending",
    done: false,
  },
];

function WorkerDailyTasks() {
  const [tasks, setTasks] = useState(initialTasks);

  const toggleTask = (id) => {
    setTasks(
      tasks.map((t) =>
        t.id === id
          ? {
              ...t,
              done: !t.done,
              status: !t.done ? "Completed" : "In Progress",
            }
          : t
      )
    );
  };

  const completedCount = tasks.filter((t) => t.done).length;

  return (
    <div className="dashboard-card worker-tasks-card">
      <div className="card-header">
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <CheckSquare size={18} color="#0d9488" />
          <h3>Assigned Duties for Today</h3>
        </div>
        <span style={{ fontSize: "11px", color: "#64748b", fontWeight: 600 }}>
          {completedCount} of {tasks.length} Done
        </span>
      </div>

      <div className="worker-task-list">
        {tasks.map((task) => (
          <div
            className={`worker-task-item ${task.done ? "task-done" : ""}`}
            key={task.id}
            onClick={() => toggleTask(task.id)}
            style={{ cursor: "pointer" }}
          >
            <div className="task-checkbox-wrap">
              {task.done ? (
                <CheckCircle2 size={18} color="#059669" />
              ) : (
                <div className="task-unchecked" />
              )}
            </div>

            <div className="task-text-content">
              <strong className={task.done ? "text-done" : ""}>
                {task.title}
              </strong>
              <span>Zone: {task.zone}</span>
            </div>

            <span className={`task-badge ${task.done ? "done" : "pending"}`}>
              {task.done ? (
                "Verified"
              ) : (
                <>
                  <Clock size={11} style={{ display: "inline", marginRight: "3px" }} />
                  {task.status}
                </>
              )}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default WorkerDailyTasks;

