const express = require("express");

const {
  getDashboardData,
} = require("../controllers/adminController");

const {
  protect,
  adminOnly,
} = require("../middleware/authMiddleware");

const router = express.Router();


// GET ADMIN DASHBOARD DATA
router.get(
  "/dashboard",
  protect,
  adminOnly,
  getDashboardData
);


module.exports = router;