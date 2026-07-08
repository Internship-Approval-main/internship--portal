// View Applications
exports.viewApplications = (req, res) => {

    res.status(200).json({
        success: true,
        applications: [
            {
                id: 1,
                student: "Manjushree",
                company: "Microsoft",
                status: "Pending"
            },
            {
                id: 2,
                student: "Rahul",
                company: "Google",
                status: "Pending"
            }
        ]
    });

};

// Approve Internship
exports.approveApplication = (req, res) => {

    res.status(200).json({
        success: true,
        message: "Internship Approved"
    });

};

// Reject Internship
exports.rejectApplication = (req, res) => {

    res.status(200).json({
        success: true,
        message: "Internship Rejected"
    });

};

// Assign Grade
exports.assignGrade = (req, res) => {

    const { grade } = req.body;

    res.status(200).json({
        success: true,
        message: `Grade ${grade} Assigned Successfully`
    });

};