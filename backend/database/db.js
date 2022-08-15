// IMPORTS:
require("dotenv").config(); // to use environment variables from .env
const mongoose = require("mongoose");

// Function for connecting to database:
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Successfully connected to MongoDB.");
    } catch (err) {
        console.log("Error when connecting to MongoDB:", err);
    }
};

module.exports = connectDB;
