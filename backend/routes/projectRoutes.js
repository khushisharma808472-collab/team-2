const express = require("express");
const router = express.Router();
const {
  getProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
} = require("../controllers/projectController");
const { protect, authorize } = require("../middleware/authMiddleware");

router.use(protect);

router.route("/").get(getProjects).post(authorize("admin", "project_manager"), createProject);
router
  .route("/:id")
  .get(getProjectById)
  .put(authorize("admin", "project_manager"), updateProject)
  .delete(authorize("admin", "project_manager"), deleteProject);

module.exports = router;
