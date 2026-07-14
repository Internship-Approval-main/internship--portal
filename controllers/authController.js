const jwt = require("jsonwebtoken");
const Student = require("../models/Student");

exports.login = async (req, res) => {

    try {

        const { srn, password } = req.body;

        if (!srn || !password) {

            return res.status(400).json({
                success: false,
                message: "SRN and Password are required"
            });

        }

        const student = await Student.findOne({ srn });

        if (!student) {

            return res.status(404).json({
                success: false,
                message: "Student not found"
            });

        }

        if (student.password !== password) {

            return res.status(401).json({
                success: false,
                message: "Invalid Password"
            });

        }

        // Generate JWT
        const token = jwt.sign(
            {
                srn: student.srn
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1d"
            }
        );

        // Send response
        res.status(200).json({

            success: true,
            message: "Login Successful",

            token,

            student: {

                srn: student.srn,
                student_name: student.student_name,
                student_email: student.student_email,
                semester: student.semester,
                cgpa: student.cgpa

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