const User = require("../models/User");

// ================= ADMIN DASHBOARD =================

const getDashboardData = async (req, res) => {
  try {

    // Total Users
    const totalUsers = await User.countDocuments();

    // Role-wise user count
    const roleStats = await User.aggregate([
      {
        $group: {
          _id: "$role",
          count: { $sum: 1 },
        },
      },
    ]);

    // Convert array into object
    const roleDistribution = {};

    roleStats.forEach((item) => {
      roleDistribution[item._id] = item.count;
    });

    // Recent Users
    const recentUsers = await User.find()
      .select("name email role createdAt")
      .sort({ createdAt: -1 })
      .limit(5);

    res.status(200).json({
      success: true,

      stats: {
        totalUsers,

        // Projects baad mein add honge
        totalProjects: 0,
        activeProjects: 0,
        pendingApprovals: 0,
      },

      roleDistribution,

      recentUsers,

      admin: {
        name: req.user.name,
        email: req.user.email,
        role: req.user.role,
      },

    });

  } catch (error) {

    console.error("Dashboard Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch dashboard data",
    });

  }
};

module.exports = {
  getDashboardData,
};