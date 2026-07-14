const Internship = require("../models/Internship");

exports.getDashboard = async (req, res) => {

    try {

        const { srn } = req.query;

        const internship = await Internship.findOne({ srn });

        if (!internship) {

            return res.status(404).json({
                message: "Internship not found"
            });

        }

        res.json({

            studentName: internship.student_name,
            status: internship.status,
            company: internship.placements?.[0]?.company || "-",
            role: internship.placements?.[0]?.role || "-",
            notifications: 0

        });

    }

    catch (err) {

        res.status(500).json({
            message: err.message
        });

    }

};