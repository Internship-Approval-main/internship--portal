const jwt = require("jsonwebtoken");

exports.verifyToken = (req, res, next) => {

    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {

        return res.status(401).json({
            success: false,
            message: "Access Denied"
        });

    }

    const token = authHeader.split(" ")[1];
    console.log("Token received:", token);
    try {

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );
        console.log("Decoded:", decoded);
        req.student = decoded;

        next();

    }

    catch (err) {

        return res.status(401).json({

            success: false,
            message: "Invalid Token"

        });

    }

};