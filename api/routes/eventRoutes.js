const express = require("express");
const eventController = require("../controllers/eventController");
const authController = require("../controllers/authController");

const router = express.Router();

router.post("/add", authController.protect, eventController.add);

module.exports = router;
