const express = require("express");

const router = express.Router();

const adminController = require("../controllers/adminController");


// =============================
// Faculty Management
// =============================
router.get("/faculty", adminController.getFaculty);

router.put(
    "/assign-scrutiny/:id",
    adminController.assignScrutinyFaculty
);


// =============================
// Student Overview
// =============================
router.get(
    "/student-overview",
    adminController.getStudentOverview
);


module.exports = router;