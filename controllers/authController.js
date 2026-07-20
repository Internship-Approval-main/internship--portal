const jwt = require("jsonwebtoken");

const Student = require("../models/Student");
const Faculty = require("../models/Faculty");
const Manager = require("../models/Manager");
const Admin = require("../models/Admin");

exports.login = async (req, res) => {

    try {

        const { role, identifier, password } = req.body;

        if (!role || !identifier || !password) {

            return res.status(400).json({
                success: false,
                message: "Missing login credentials."
            });

        }

        let user = null;
        let payload = {};

        switch (role) {

            case "Student":

                user = await Student.findOne({ srn: identifier });

                if (!user)
                    return res.status(404).json({
                        success: false,
                        message: "Student not found"
                    });

                payload = {
                    srn: user.srn,
                    role: "Student"
                };

                break;

            case "Faculty":

                user = await Faculty.findOne({ email: identifier });

                if (!user)
                    return res.status(404).json({
                        success: false,
                        message: "Faculty not found"
                    });

                payload = {
                    email: user.email,
                    role: "Faculty"
                };

                break;

            case "Manager":

                user = await Manager.findOne({ email: identifier });

                if (!user)
                    return res.status(404).json({
                        success: false,
                        message: "Manager not found"
                    });

                payload = {
                    email: user.email,
                    role: "Manager"
                };

                break;

            case "Admin":

                user = await Admin.findOne({ email: identifier });

                if (!user)
                    return res.status(404).json({
                        success: false,
                        message: "Admin not found"
                    });

                payload = {
                    email: user.email,
                    role: "Admin"
                };

                break;

            default:

                return res.status(400).json({
                    success: false,
                    message: "Invalid role"
                });

        }

        if (user.password !== password) {

            return res.status(401).json({
                success: false,
                message: "Invalid Password"
            });

        }

        const token = jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        res.status(200).json({

            success: true,

            message: "Login Successful",

            token,

            user

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};