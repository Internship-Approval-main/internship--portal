const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
    res.send("🚀 Internship Management Backend is Running!");
});

module.exports = router;