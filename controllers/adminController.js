const Faculty = require("../models/Faculty");
const Internship = require("../models/Internship");


// ======================================
// Get All Faculty
// ======================================
exports.getFaculty = async (req, res) => {

    try {

        const faculty = await Faculty.find().sort({ name: 1 });

        res.json({

            success: true,

            teachers: faculty.map(f => ({

                id: f._id,

                name: f.name,

                email: f.email,

                department: f.department,

                role: f.role || "Regular Faculty"

            }))

        });

    }

    catch (err) {

        res.status(500).json({

            success: false,

            message: err.message

        });

    }

};


// ======================================
// Assign Scrutiny Faculty
// ======================================
exports.assignScrutinyFaculty = async (req, res) => {

    try {

        const faculty = await Faculty.findById(req.params.id);

        if (!faculty) {

            return res.status(404).json({

                success: false,

                message: "Faculty not found"

            });

        }

        faculty.role = "Scrutiny Faculty";

        await faculty.save();

        res.json({

            success: true,

            message: "Faculty assigned successfully."

        });

    }

    catch (err) {

        res.status(500).json({

            success: false,

            message: err.message

        });

    }

};


// ======================================
// Student Overview
// ======================================
exports.getStudentOverview = async (req, res) => {

    try {

        const internships = await Internship.find().sort({ createdAt: -1 });

        const students = internships.map(i => ({

            id: i._id,

            name: i.student_name,

            srn: i.srn,

            managerScore: i.total_marks || 0,

            grade: i.grade || "-",

            credits: i.credits || "-"

        }));

        res.json({

            success: true,

            students

        });

    }

    catch (err) {

        res.status(500).json({

            success: false,

            message: err.message

        });

    }

};