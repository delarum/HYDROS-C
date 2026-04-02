const express = require("express");
const router = express.Router();
const {
  createReport,
  verifyReport,
} = require("../controllers/reportController");

router.post("/", createReport);
router.put("/:id/verify", verifyReport);

module.exports = router;