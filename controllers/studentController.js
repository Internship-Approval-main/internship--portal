const Internship = require("../models/Internship");

// Register Internship
exports.registerInternship = async (req, res) => {

    try {

        const data = {

            ...req.body

        };
        if (req.file) {
    data.offer_letter = req.file.filename;
}

        // Automatically decide evaluation mode
        if (data.company_evaluation === true || data.company_evaluation === "true") {

            data.evaluation_mode = "Company";

        } else {

            data.evaluation_mode = "PES";

        }

        // Default workflow
        data.status = "Submitted";

        data.current_stage = "Scrutiny Verification";

        const internship = await Internship.findOneAndUpdate(

            { srn: data.srn },

            data,

            {

                upsert: true,

                new: true,

                runValidators: true

            }

        );

        res.status(201).json({

            success: true,

            message: "Internship Registered Successfully",

            internship

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};
// Track Status
exports.trackStatus = async (req, res) => {

    try {

        const internship = await Internship.findOne({

            srn: req.params.srn

        });

        if (!internship) {

            return res.status(404).json({

                success: false,

                message: "Internship not found"

            });

        }
let progress = 0;

switch (internship.current_stage) {

    case "Submitted":
        progress = 20;
        break;

    case "Scrutiny Verification":
        progress = 40;
        break;

    case "Faculty Approval":
        progress = 60;
        break;

    case "Manager Evaluation":
        progress = 80;
        break;

    case "Completed":
        progress = 100;
        break;

    default:
        progress = 0;
}
        res.status(200).json({

            success: true,

            data: {

                status: internship.status,

                stage: internship.current_stage,
                progress: progress,
                scrutinyRemarks: internship.scrutiny_remarks,

                facultyRemarks: internship.faculty_remarks,

                grade: internship.grade,

                credits: internship.credits,

                evaluationMode: internship.evaluation_mode,

                company: internship.company,

                role: internship.role,

                startDate: internship.start_date,

                endDate: internship.end_date,

                offerLetter: internship.offer_letter
    ? `http://localhost:5000/uploads/${internship.offer_letter}`
    : null,

            }

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

// Upload Report
exports.uploadReport = async (req, res) => {

    try {

        const { srn, report } = req.body;

        const internship = await Internship.findOne({ srn });

        if (!internship) {

            return res.status(404).json({

                success: false,
                message: "Student not found"

            });

        }

        internship.report = report;

        await internship.save();

        res.status(200).json({

            success: true,
            message: "Report Uploaded Successfully",
            internship

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,
            message: error.message

        });

    }

};

// Request NOC
exports.requestNOC = async (req, res) => {

    try {

        const { srn } = req.body;

        const internship = await Internship.findOne({ srn });

        if (!internship) {

            return res.status(404).json({

                success: false,
                message: "Student not found"

            });

        }

        internship.status = "NOC Requested";

        await internship.save();

        res.status(200).json({

            success: true,
            message: "NOC Request Submitted",
            internship

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,
            message: error.message

        });

    }

};

// Get Student Profile
exports.getProfile = async (req, res) => {

    try {

        const Student = require("../models/Student");

        const student = await Student.findOne({

            srn: req.student.srn

        });

        if (!student) {

            return res.status(404).json({

                message: "Student not found"

            });

        }

        res.json({

            name: student.student_name,

            srn: student.srn,

            branch: student.branch,

            semester: student.semester,

            email: student.student_email,

            phone: student.phone,

            cgpa: student.cgpa,

            section: student.section

        });

    }

    catch(err){

        res.status(500).json({

            message: err.message

        });

    }

};


// Update Profile
exports.updateProfile = async (req,res)=>{

    try{

        const Student=require("../models/Student");

        const student=await Student.findOne({

            srn:req.student.srn

        });

        if(!student){

            return res.status(404).json({

                message:"Student not found"

            });

        }

        student.student_email=req.body.email;

        student.phone=req.body.phone;

        await student.save();

        res.json({

            name: student.student_name,

            srn: student.srn,

            branch: student.branch,

            semester: student.semester,

            email: student.student_email,

            phone: student.phone,

            cgpa: student.cgpa,

            section: student.section

        });

    }

    catch(err){

        res.status(500).json({

            message:err.message

        });

    }

};