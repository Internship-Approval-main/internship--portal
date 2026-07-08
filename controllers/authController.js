exports.login = (req, res) => {

    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            success: false,
            message: "Email and Password are required"
        });
    }

    res.status(200).json({
        success: true,
        message: "Login Successful",
        user: {
            name: "Manjushree",
            role: "Student"
        }
    });

};