const express = require("express");

const router = express.Router();

const facultyController = require("../controllers/facultyController");

router.get("/applications", facultyController.viewApplications);

router.put("/approve/:id", facultyController.approveApplication);

router.put("/reject/:id", facultyController.rejectApplication);

router.post("/grade", facultyController.assignGrade);

module.exports = router;