const Project = require("../models/Project");
const WorkOrder = require("../models/WorkOrder");
const MaterialRequest = require("../models/MaterialRequest");
const Equipment = require("../models/Equipment");
const Milestone = require("../models/Milestone");
const Attendance = require("../models/Attendance");
const Notification = require("../models/Notification");
const Report = require("../models/Report");

const { parseAmountToCrores } = require("../utils/currency");
const parseAmount = parseAmountToCrores;
const formatCrores = (amount) => {
  return `₹ ${Number(amount || 0).toFixed(1)} Cr`;
};

const matchUser = (user, field) => {
  if (!user) return {};
  return { $or: [{ [field]: user.name }, { [field]: user.email }] };
};

const getNotificationsForRole = async (user) => {
  const notifications = await Notification.find({
    $or: [{ role: "all" }, { role: user.role }],
  }).sort({ createdAt: -1 }).limit(6);
  return {
    list: notifications,
    unread: notifications.filter((n) =>!n.read).length,
    totalUnread: await Notification.countDocuments({
      $or: [{ role: "all" }, { role: user.role }], read: false,
    }),
  };
};

// SITE ENGINEER
const getSiteEngineerDashboard = async (req, res) => {
  try {
    const user = req.user;
    const projects = await Project.find().sort({ updatedAt: -1 });
    const milestones = await Milestone.find().sort({ createdAt: 1 });
    const materialRequests = await MaterialRequest.find().sort({ createdAt: -1 });
    const equipment = await Equipment.find().sort({ createdAt: -1 });
    const reportsToday = await Report.find({ date: /Today/i }).sort({ createdAt: -1 }).limit(6);
    const attendance = await Attendance.find().sort({ createdAt: -1 }).limit(6);
    const notifications = await getNotificationsForRole(user);
    res.status(200).json({
      success: true,
      stats: { totalProjects: projects.length, activeProjects: projects.length, totalMilestones: milestones.length, averageCompletion: 65, activeDelays: 2, criticalDelays: 1, phasesInProgress: 3, inspectionsToday: 1, attendanceToday: 5, machineryOnSite: equipment.length, equipmentTotal: equipment.length, pendingMaterials: 2 },
      milestones, delayedMilestones: [], phaseStatusDistribution: { completed: 2, inProgress: 2, starting: 1, delayed: 1 }, materialStatus: { pending: 1, approved: 2, inTransit: 1, delivered: 1, rejected: 0 }, equipment, equipmentStatus: { operational: equipment.length, scheduled: 0, maintenance: 0, total: equipment.length }, attendance, materialRequests: materialRequests.slice(0,6), recentActivities: [], notifications: notifications.list, notificationsUnread: notifications.totalUnread, user: { name: user.name, email: user.email, role: user.role },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed" });
  }
};

// CONTRACTOR
const getContractorDashboard = async (req, res) => {
  try {
    const user = req.user;
    const workOrders = await WorkOrder.find({}).sort({ createdAt: -1 });
    const materialRequests = await MaterialRequest.find({}).sort({ createdAt: -1 });
    const projects = await Project.find().sort({ updatedAt: -1 });
    const attendance = await Attendance.find().sort({ createdAt: -1 });
    const milestones = await Milestone.find();
    let totalContractAmount = 0; milestones.forEach(m => totalContractAmount += parseAmount(m.amount));
    const notifications = await getNotificationsForRole(user);
    res.status(200).json({
      success: true,
      stats: { totalWorkOrders: workOrders.length, activeWork: 3, completedWork: 2, pendingWork: 1, totalMaterialRequests: materialRequests.length, pendingMaterialRequests: 1, totalCrew: attendance.length || 5, attendanceRate: 85, equipmentDeployed: 3 },
      workOrders: workOrders.slice(0,6), workOrderStatus: { onSchedule: 2, inProgress: 2, delayed: 1, completed: 2 }, materialRequests: materialRequests.slice(0,6), materialStatus: { pending: 1, approved: 2, inTransit: 1, delivered: 1, rejected: 0 }, projectProgress: projects.slice(0,6).map(p=>({ _id:p._id, name:p.name, progress:p.progress||0, status:p.status })), workforceData: [], financialData: { totalContractAmount, totalDisbursed: totalContractAmount*0.6, totalContractAmountLabel: formatCrores(totalContractAmount), totalDisbursedLabel: formatCrores(totalContractAmount*0.6) }, notifications: notifications.list, notificationsUnread: notifications.totalUnread, user: { name: user.name, email: user.email, role: user.role },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed" });
  }
};

// WORKER - FIXED
const getWorkerDashboard = async (req, res) => {
  try {
    const user = req.user;
    const workOrders = await WorkOrder.find({}).sort({ createdAt: -1 });
    const attendance = await Attendance.find({}).sort({ createdAt: -1 });
    const todayRecord = attendance[0] || null;
    let assignedSite = "Patna Metro - Site A";
    if (todayRecord?.site) assignedSite = todayRecord.site;
    else if (workOrders[0]?.zone) assignedSite = workOrders[0].zone;
    else if (workOrders[0]?.site) assignedSite = workOrders[0].site;

    const notifications = await getNotificationsForRole(user);
    const tasks = workOrders.slice(0, 6).map((wo) => ({
      _id: wo._id, title: wo.title || "Site Work", zone: wo.zone || wo.site || "Site Area", status: wo.status || "In Progress", progress: wo.progress || 60, completed: wo.status === "Completed",
    }));
    const finalTasks = tasks.length > 0? tasks : [
      { _id: "1", title: "Concrete Pouring - Block A", zone: "Block A", status: "In Progress", progress: 60, completed: false },
      { _id: "2", title: "Rebar Checking - Block B", zone: "Block B", status: "Pending", progress: 0, completed: false },
      { _id: "3", title: "Safety Audit", zone: "Site A", status: "Completed", progress: 100, completed: true },
    ];

    res.status(200).json({
      success: true,
      stats: {
        assignedTasks: workOrders.length || 5,
        completedTasks: 3,
        pendingTasks: 2,
        inProgressTasks: 2,
        checkIn: "09:15 AM",
        checkOut: "--",
        attendanceRate: 85,
        safetyCompliance: 85,
        assignedSite: assignedSite,
        shift: "Day Shift (9 hrs)",
      },
      tasks: finalTasks,
      workOrders,
      attendance: attendance.slice(0, 10),
      todayRecord: todayRecord || { site: assignedSite, checkIn: "09:15 AM", shift: "Day Shift" },
      workProgress: [],
      overallProgress: 65,
      notifications: notifications.list,
      notificationsUnread: notifications.totalUnread,
      user: { name: user.name, email: user.email, role: user.role },
    });
  } catch (error) {
    console.error("Worker Dashboard Error:", error);
    res.status(500).json({ success: false, message: "Failed to fetch worker dashboard data" });
  }
};

// CLIENT
const getClientDashboard = async (req, res) => {
  try {
    const user = req.user;
    const projects = await Project.find({}).sort({ updatedAt: -1 });
    const milestones = await Milestone.find().sort({ createdAt: 1 });
    const reports = await Report.find().sort({ createdAt: -1 }).limit(6);
    const notifications = await getNotificationsForRole(user);
    let totalBudget = 0, totalSpent = 0;
    projects.forEach(p => { totalBudget += parseAmount(p.budget); totalSpent += parseAmount(p.spent); });
    res.status(200).json({
      success: true,
      stats: { totalProjects: projects.length, activeProjects: projects.length, completedProjects: 1, overallProgress: 65, totalBudget, totalSpent, remainingBudget: totalBudget-totalSpent, budgetUtilization: 60, totalBudgetLabel: formatCrores(totalBudget), totalSpentLabel: formatCrores(totalSpent), remainingBudgetLabel: formatCrores(totalBudget-totalSpent), signedMilestones: 3, totalMilestones: milestones.length, nextHandover: "--" },
      projects, milestones, financialData: { totalBudget, totalSpent, remainingBudget: totalBudget-totalSpent, budgetUtilization: 60, totalBudgetLabel: formatCrores(totalBudget), totalSpentLabel: formatCrores(totalSpent), remainingBudgetLabel: formatCrores(totalBudget-totalSpent) }, siteUpdates: reports.map(r=>({ _id:r._id, title:r.title, desc:r.summary||"Update", date:r.date, type:"verified", badge:r.status||"Submitted" })), notifications: notifications.list, notificationsUnread: notifications.totalUnread, user: { name: user.name, email: user.email, role: user.role },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed" });
  }
};

module.exports = {
  getSiteEngineerDashboard,
  getContractorDashboard,
  getWorkerDashboard,
  getClientDashboard,
};