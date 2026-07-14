const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({

    srn: String,

    student_name: String,

    student_email: String,

    semester: String,

    cgpa: Number,

    password: String

});

module.exports = mongoose.model(
    "Student",
    studentSchema,
    "master_database"
);