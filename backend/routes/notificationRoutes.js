const express = require("express");
const router = express.Router();
const {
  getNotifications,
  markAsRead,
  markAllAsRead,
} = require("../controllers/notificationController");
const { protect } = require("../middleware/authMiddleware");

router.use(protect);

router.route("/").get(getNotifications);
router.route("/mark-all-read").put(markAllAsRead);
router.route("/:id/read").put(markAsRead);

module.exports = router;
