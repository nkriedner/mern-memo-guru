const express = require("express");
const { loginUser, signupUser } = require("../controllers/userController"); // imports the user controller functions

const router = express.Router();

// LOGIN ROUTE:
router.post("/login", loginUser);

// SIGNUP ROUTE:
router.post("/signup", signupUser);

module.exports = router;
