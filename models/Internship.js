const mongoose = require("mongoose");

const internshipSchema = new mongoose.Schema({

    // -------------------------
    // Student Details
    // -------------------------

    srn: {
        type: String,
        required: true,
        unique: true
    },

    student_name: String,

    student_email: String,

    semester: String,



    // -------------------------
    // Company Details
    // -------------------------

    campus_type: String,

    internship_type: String,

    company: String,

    company_website: String,

    internship_domain: String,

    location: String,



    // -------------------------
    // Internship Details
    // -------------------------

    role: String,

    start_date: String,

    end_date: String,

    paid: Boolean,

    stipend: String,



    // -------------------------
    // Project Details
    // -------------------------

    project_description: String,

    tech_stack: String,



    // -------------------------
    // Offer Letter
    // -------------------------

    offer_letter: String,


stipend_type: String,

offer_letter_url: String,
internship_nature: String,
duration: Number,
    // -------------------------
    // Evaluation
    // -------------------------

    company_evaluation: Boolean,

    evaluation_mode: {
        type: String,
        enum: ["Company", "PES"],
        default: "PES"
    },



    // -------------------------
    // Manager Details
    // -------------------------

    manager_name: String,

    manager_designation: String,

    manager_email: String,

    manager_contact: String,


// -------------------------
// Faculty Assignment
// -------------------------

assigned_faculty: {
    type: String,
    default: null
},
    // -------------------------
    // Workflow
    // -------------------------

    status: {

        type: String,

        default: "Submitted"

    },

    current_stage: {

        type: String,

        default: "Scrutiny Verification"

    },



    // -------------------------
    // Remarks
    // -------------------------

    scrutiny_remarks: String,

    faculty_remarks: String,



    // -------------------------
    // Evaluation Result
    // -------------------------

    total_marks: Number,

    grade: String,

    credits: Number,



    // -------------------------
    // Student Report
    // -------------------------

    report: String,



}, {

    timestamps: true

});

module.exports = mongoose.model(

    "Internship",

    internshipSchema,

    "internship_records"

);