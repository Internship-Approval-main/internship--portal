const mongoose = require("mongoose");

const placementSchema = new mongoose.Schema({

    campus_type: String,

    internship_type: String,

    company: String,

    role: String,

    start_date: String,

    end_date: String,

    manager_name: String,

    manager_email: String,

    research_centre: String

});

const internshipSchema = new mongoose.Schema({

    srn: String,

    student_name: String,

    student_email: String,

    semester: String,

    placements: [placementSchema],

    status: {

        type: String,

        default: "Pending Faculty Approval"

    },

    grade: String,

    report: String

});

module.exports = mongoose.model(

    "Internship",

    internshipSchema,

    "internship_records"

);