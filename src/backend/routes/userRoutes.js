const express = require("express");
const router = express.Router();
const { loginUser, getUser } = require("../controllers/userController");

router.post("/login", loginUser);
router.get("/:id", getUser);

module.exports = router;