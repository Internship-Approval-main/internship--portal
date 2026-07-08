// Dummy Student Controller

// Register Internship
exports.registerInternship = (req, res) => {

    const data = req.body;

    res.status(201).json({
        success: true,
        message: "Internship Registered Successfully",
        internship: data
    });

};

// Track Status
exports.trackStatus = (req, res) => {

    res.status(200).json({
        success: true,
        status: "Pending Faculty Approval"
    });

};

// Upload Report
exports.uploadReport = (req, res) => {

    res.status(200).json({
        success: true,
        message: "Report Uploaded Successfully"
    });

};

// Request NOC
exports.requestNOC = (req, res) => {

    res.status(200).json({
        success: true,
        message: "NOC Request Submitted"
    });

};