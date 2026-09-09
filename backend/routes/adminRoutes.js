const express = require("express");

const {
  getDashboardData,
  getSiteProgressData,
} = require("../controllers/adminController");

const {
  protect,
  adminOnly,
} = require("../middleware/authMiddleware");

const router = express.Router();


// ================= ADMIN DASHBOARD =================

router.get(
  "/dashboard",
  protect,
  adminOnly,
  getDashboardData
);


// ================= SITE PROGRESS =================

router.get(
  "/site-progress",
  protect,
  adminOnly,
  getSiteProgressData
);


module.exports = router;