const express = require("express");
const router = express.Router();
const { createInnovation } = require("../controllers/innovationController");

router.post("/", createInnovation);

module.exports = router;