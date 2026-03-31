const Report = require("../models/Report");
const User = require("../models/User");

const createReport = async (req, res) => {
  try {
    const report = await Report.create(req.body);
    res.status(201).json(report);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Admin verifies report and awards points
const verifyReport = async (req, res) => {
  try {
    const report = await Report.findById(req.params.id);

    if (!report) {
      return res.status(404).json({ message: "Report not found" });
    }

    report.status = "verified";
    await report.save();

    if (report.userId) {
      const user = await User.findById(report.userId);

      user.points += 50;
      user.verifiedReports += 1;
      user.totalEarnings += 100;
      user.rewardsHistory.push({
        title: "Verified Incident Report",
        amount: 100,
      });

      await user.save();
    }

    res.json({ message: "Report verified and points awarded" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createReport,
  verifyReport,
};