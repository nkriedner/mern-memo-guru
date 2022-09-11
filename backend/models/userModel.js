// IMPORTS:
const mongoose = require("mongoose"); // for database connection
const bcrypt = require("bcrypt"); // for hashing passwords
const validator = require("validator"); // for validating email & password when signing up

// Initialize a mongoose Schema:
const Schema = mongoose.Schema;

// Create a (new) specific mongoose Schema:
const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
});

// static signup method:
// (the function needs to be a regular function to use the 'this' keyword)
userSchema.statics.signup = async function (email, password) {
    // Validate email and password inputs:
    if (!email || !password) {
        throw Error("All signup fields must be filled out.");
    }
    if (!validator.isEmail(email)) {
        throw Error("The filled in email is not valid.");
    }
    if (!validator.isStrongPassword(password)) {
        throw Error("Your password is not strong enough.");
    }

    // Check if email already exists in database:
    const exists = await this.findOne({ email });

    if (exists) {
        throw Error("An account with this email already exists in the database.");
    }

    // Generate hashed password:
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    // Create user:
    const user = await this.create({ email, password: hash });

    return user;
};

// static login method
userSchema.statics.login = async function (email, password) {
    if (!email || !password) {
        throw Error("All login fields must be filled out.");
    }

    // Check if email exists in database:
    const user = await this.findOne({ email });

    if (!user) {
        throw Error("No user account with this email esists in database.");
    }

    // Check users hashed password:
    const match = await bcrypt.compare(password, user.password);

    if (!match) {
        throw Error("The password for this user account is incorrect.");
    }

    return user;
};

module.exports = mongoose.model("User", userSchema);
