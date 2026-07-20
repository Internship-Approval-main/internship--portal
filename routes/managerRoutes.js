const express = require("express");

const router = express.Router();

const managerController = require("../controllers/managerController");


// =======================================
// View Students
// =======================================
router.get(
    "/students",
    managerController.viewStudents
);


// =======================================
// Company / College Decision
// =======================================
router.put(
    "/evaluation-mode/:id",
    managerController.setEvaluationMode
);


// =======================================
// Submit Evaluation
// =======================================
router.post(
    "/evaluate",
    managerController.submitEvaluation
);


module.exports = router;