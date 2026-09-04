import WorkerDailyTasks from "../../components/worker/WorkerDailyTasks";
import StatCard from "../../components/dashboard/StatCard";

function WorkerTasks() {
  return (
    <>
      <div className="welcome-section">
        <div>
          <h1>Assigned Duties & Tasks 🔨</h1>
          <p>Click any task to verify checklist completion, review zone assignments, and safety requirements.</p>
        </div>
        <button className="date-button">📅 Shift: East Wing Core</button>
      </div>

      <div className="stats-grid">
        <StatCard title="ASSIGNED TODAY" value="4 Duties" change="Day shift" type="projects" />
        <StatCard title="COMPLETED TASKS" value="2 Verified" change="50% done" type="active" />
        <StatCard title="REMAINING" value="2 Pending" change="Before 5 PM" type="alerts" />
        <StatCard title="SUPERVISOR LEAD" value="Amit Sharma" change="Ext. 104" type="users" />
        <StatCard title="SAFETY GEAR" value="100% Cleared" change="PPE verified" type="pending" />
      </div>

      <div style={{ maxWidth: "720px" }}>
        <WorkerDailyTasks />
      </div>
    </>
  );
}

export default WorkerTasks;
