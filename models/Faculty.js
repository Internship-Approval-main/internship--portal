const mongoose = require("mongoose");

const facultySchema = new mongoose.Schema({

    faculty_id: {
        type: String,
        unique: true
    },

    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    department: {
        type: String,
        default: "CSE"
    },

    role: {
        type: String,
        default: "Regular Faculty"
    },

    password: {
        type: String,
        required: true
    }

});

module.exports = mongoose.model(
    "Faculty",
    facultySchema,
    "faculty"
);