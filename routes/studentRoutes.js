const { verifyToken } = require("../middleware/authMiddleware");
const express = require("express");

const router = express.Router();

const studentController = require("../controllers/studentController");

router.post("/register", verifyToken, studentController.registerInternship);

router.get("/status/:srn", verifyToken, studentController.trackStatus);

router.post("/upload-report", verifyToken, studentController.uploadReport);

router.post("/request-noc", verifyToken, studentController.requestNOC);
module.exports = router;