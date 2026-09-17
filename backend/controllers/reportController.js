const Report = require("../models/Report");

// GET /api/reports
const getReports = async (req, res) => {
  try {
    const { type } = req.query;
    let query = {};
    if (type && type !== "All") {
      query.type = type;
    }
    const reports = await Report.find(query).sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      data: reports,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// POST /api/reports
const createReport = async (req, res) => {
  try {
    const { title, type, summary, location, snagsFound, status } = req.body;
    if (!title) {
      return res.status(400).json({ success: false, message: "Report title is required" });
    }

    const report = await Report.create({
      title,
      type: type || "Daily Progress",
      author: req.user.name || "Site Engineer",
      summary: summary || "",
      location: location || "Main Campus",
      snagsFound: snagsFound || 0,
      status: status || "Approved",
    });

    res.status(201).json({
      success: true,
      message: "Report logged successfully",
      data: report,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// PUT /api/reports/:id
const updateReport = async (req, res) => {
  try {
    const report = await Report.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!report) {
      return res.status(404).json({ success: false, message: "Report not found" });
    }
    res.status(200).json({
      success: true,
      message: "Report updated",
      data: report,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// DELETE /api/reports/:id
const deleteReport = async (req, res) => {
  try {
    const report = await Report.findByIdAndDelete(req.params.id);
    if (!report) {
      return res.status(404).json({ success: false, message: "Report not found" });
    }
    res.status(200).json({
      success: true,
      message: "Report deleted",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getReports,
  createReport,
  updateReport,
  deleteReport,
};
