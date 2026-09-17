const mongoose = require("mongoose");

const milestoneSchema = new mongoose.Schema(
  {
    phase: {
      type: String,
      required: [true, "Phase / Milestone name is required"],
    },
    project: {
      type: String,
      default: "Skyline Heights - Tower A",
    },
    date: {
      type: String,
      default: "30 Mar 2026",
    },
    status: {
      type: String,
      default: "In Progress",
    },
    badge: {
      type: String,
      default: "progress", // good, progress, pending
    },
    progress: {
      type: Number,
      min: 0,
      max: 100,
      default: 0,
    },
    amount: {
      type: String,
      default: "₹ 1.2 Cr",
    },
    clientApproved: {
      type: Boolean,
      default: false,
    },
    verifiedBy: {
      type: String,
      default: "Site Engineer",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Milestone", milestoneSchema);
