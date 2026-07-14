const Internship = require("../models/Internship");

// Register Internship
exports.registerInternship = async (req, res) => {

    try {

        const internship = await Internship.findOneAndUpdate(

            { srn: req.body.srn },

            req.body,

            {
                upsert: true,
                new: true
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
    console.log("trackStatus called");
    console.log("SRN:", req.params.srn);
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

        res.status(200).json({

            success: true,
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