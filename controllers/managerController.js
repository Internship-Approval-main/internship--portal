const Internship = require("../models/Internship");


// =======================================
// View Assigned Students
// =======================================
exports.viewStudents = async (req, res) => {

    try {

        const internships = await Internship.find().sort({ createdAt: -1 });

        const students = internships.map((internship) => ({

            id: internship._id,

            name: internship.student_name,

            srn: internship.srn,

            status: internship.company_evaluation
                ? "Evaluated"
                : "Pending Evaluation"

        }));

        res.status(200).json({

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


// =======================================
// Company / College Evaluation Decision
// =======================================
exports.setEvaluationMode = async (req, res) => {

    try {

        const internship = await Internship.findById(req.params.id);

        if (!internship) {

            return res.status(404).json({

                success: false,

                message: "Internship not found"

            });

        }

        const { evaluationMode } = req.body;

        internship.evaluation_mode = evaluationMode;

        await internship.save();

        res.json({

            success: true,

            message: "Evaluation mode updated successfully"

        });

    }

    catch (err) {

        res.status(500).json({

            success: false,

            message: err.message

        });

    }

};


// =======================================
// Submit Company Evaluation
// =======================================
// =======================================
// Submit Company Evaluation
// =======================================
exports.submitEvaluation = async (req, res) => {

    try {

        const {

            internshipId,

            confidenceLevel,

            proactiveApproach,

            graspConcepts,

            skillSetMaturity,

            deliveryOfWork,

            qualityOfDocs,

            oralCommunication,

            teamCoordination,

            buildRapport,

            overallRating,

            suggestion

        } = req.body;

        const internship = await Internship.findById(internshipId);

        if (!internship) {

            return res.status(404).json({

                success: false,

                message: "Internship not found"

            });

        }

        // Automatic Total Marks Calculation
        const totalMarks =
            Number(confidenceLevel) +
            Number(proactiveApproach) +
            Number(graspConcepts) +
            Number(skillSetMaturity) +
            Number(deliveryOfWork) +
            Number(qualityOfDocs) +
            Number(oralCommunication) +
            Number(teamCoordination) +
            Number(buildRapport || 0) +
            Number(overallRating);

        internship.total_marks = totalMarks;

        internship.scrutiny_remarks = suggestion;

        internship.company_evaluation = true;

// Manager has finished evaluation
internship.status = "Evaluation Submitted";

// Next person is Faculty
internship.current_stage = "Faculty Grading";
        // Automatic Grade Calculation
        if (totalMarks >= 45)
            internship.grade = "A+";
        else if (totalMarks >= 40)
            internship.grade = "A";
        else if (totalMarks >= 35)
            internship.grade = "B+";
        else if (totalMarks >= 30)
            internship.grade = "B";
        else
            internship.grade = "C";

        await internship.save();

        res.json({

            success: true,

            message: "Evaluation submitted successfully",

            totalMarks,

            grade: internship.grade

        });

    }

    catch (err) {

        res.status(500).json({

            success: false,

            message: err.message

        });

    }

};