const express = require("express");

const router = express.Router();

const studentController = require("../controllers/studentController");

// Register Internship
router.post("/register", studentController.registerInternship);

// Track Status
router.get("/status", studentController.trackStatus);

// Upload Report
router.post("/upload-report", studentController.uploadReport);

// Request NOC
router.post("/request-noc", studentController.requestNOC);

module.exports = router;