const path = require("path");
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

// Load environment variables reliably regardless of cwd
dotenv.config({ path: path.join(__dirname, ".env") });

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");
const projectRoutes = require("./routes/projectRoutes");
const materialRequestRoutes = require("./routes/materialRequestRoutes");
const workOrderRoutes = require("./routes/workOrderRoutes");
const equipmentRoutes = require("./routes/equipmentRoutes");
const milestoneRoutes = require("./routes/milestoneRoutes");
const attendanceRoutes = require("./routes/attendanceRoutes");
const inventoryRoutes = require("./routes/inventoryRoutes");
const reportRoutes = require("./routes/reportRoutes");
const notificationRoutes = require("./routes/notificationRoutes");
const seedInitialData = require("./config/seedData");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database
connectDB()
  .then(() => {
    seedInitialData();
  })
  .catch((err) => {
    console.error("Database connection error:", err.message);
  });

// Test Route
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "BuildTrack Construction Management API Running",
  });
});

// Authentication Routes
app.use("/api/auth", authRoutes);

// Admin Routes
app.use("/api/admin", adminRoutes);

// Feature Modules
app.use("/api/projects", projectRoutes);
app.use("/api/materials", materialRequestRoutes);
app.use("/api/work-orders", workOrderRoutes);
app.use("/api/equipment", equipmentRoutes);
app.use("/api/milestones", milestoneRoutes);
app.use("/api/attendance", attendanceRoutes);
app.use("/api/inventory", inventoryRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api/notifications", notificationRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});