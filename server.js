const express = require("express");
const path = require("path");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db");
// Import Routes
const authRoutes = require("./routes/authRoutes");
const studentRoutes = require("./routes/studentRoutes");
const facultyRoutes = require("./routes/facultyRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const chatRoutes = require('./routes/chatRoutes');
const adminRoutes = require("./routes/adminRoutes");
const managerRoutes = require("./routes/managerRoutes");
// Connect MongoDB
connectDB();
// Create Express App
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes

app.use("/api/auth", authRoutes);
app.use("/api/student", studentRoutes);
app.use("/api/faculty", facultyRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use('/api/chat', chatRoutes);
app.use("/api/manager", managerRoutes);
// Default Route
app.get("/", (req, res) => {
    res.send("🚀 Internship Management Backend Running!");
});

// Port
const PORT = process.env.PORT || 5000;

// Start Server
app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
}); 



