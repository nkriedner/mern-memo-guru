const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const requireAuth = async (req, res, next) => {
    // Verify if user is authenticated:
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json({ error: "Authorization token required" });
    }

    // Split of the 'Bearer' part of the json web token (get the part after the space):
    const token = authorization.split(" ")[1];

    try {
        // Verify the token:
        const { _id } = jwt.verify(token, process.env.SECRET);

        // Passing (only) the id of the user to the next function:
        req.user = await User.findOne({ _id }).select("_id");
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({ error: "Request is not authorized (missing jsonwebtoken)" });
    }
};

module.exports = requireAuth;
