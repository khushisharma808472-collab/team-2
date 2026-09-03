import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ProjectManagerDashboard from "./pages/projectManager/ProjectManagerDashboard";
import SiteEngineerDashboard from "./pages/siteEngineer/SiteEngineerDashboard";
import ContractorDashboard from "./pages/contractor/ContractorDashboard";
import ClientDashboard from "./pages/client/ClientDashboard";
import WorkerDashboard from "./pages/worker/WorkerDashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Authentication */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/forgot-password"
          element={<ForgotPassword />}
        />
        <Route
          path="/reset-password/:token"
          element={<ResetPassword />}
        />

        {/* Dashboards by Role */}
        <Route
          path="/admin/dashboard"
          element={<AdminDashboard />}
        />
        <Route
          path="/project-manager/dashboard"
          element={<ProjectManagerDashboard />}
        />
        <Route
          path="/site-engineer/dashboard"
          element={<SiteEngineerDashboard />}
        />
        <Route
          path="/contractor/dashboard"
          element={<ContractorDashboard />}
        />
        <Route
          path="/client/dashboard"
          element={<ClientDashboard />}
        />
        <Route
          path="/worker/dashboard"
          element={<WorkerDashboard />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;