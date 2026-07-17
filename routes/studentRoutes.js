const { verifyToken } = require("../middleware/authMiddleware");
const upload = require("../middleware/upload");
const express = require("express");

const router = express.Router();

const studentController = require("../controllers/studentController");

router.post(
    "/register",
    verifyToken,
    upload.single("offerLetter"),
    studentController.registerInternship
);
router.get("/status/:srn", verifyToken, studentController.trackStatus);

router.post("/upload-report", verifyToken, studentController.uploadReport);

router.post("/request-noc", verifyToken, studentController.requestNOC);
router.get(
    "/profile",
    verifyToken,
    studentController.getProfile
);

router.put(
    "/profile",
    verifyToken,
    studentController.updateProfile
);
module.exports = router;