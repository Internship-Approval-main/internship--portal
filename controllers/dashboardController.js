const Internship = require("../models/Internship");

exports.getDashboard = async (req, res) => {

    try {

        const { srn } = req.query;

        if (!srn) {
            return res.status(400).json({
                message: "SRN is required"
            });
        }

        const internship = await Internship.findOne({ srn });

        if (!internship) {
            return res.status(404).json({
                message: "Internship not found"
            });
        }

        res.status(200).json({

            studentName: internship.student_name,

            status: internship.status || "Pending",

            company: internship.company || "-",

            role: internship.role || "-",

            notifications: 0

        });

    }

    catch (err) {

        console.error(err);

        res.status(500).json({

            message: err.message

        });

    }

};