// Import and configure dotenv for environment variables:
require("dotenv").config();

// Import express:
const express = require("express");

// Create app:
const app = express();

// Middleware to log all requests methods and paths:
app.use((req, res, next) => {
    console.log(`${req.method} request on ${req.path}`);
    next();
});

// Home Route:
app.get("/", (req, res) => {
    console.log("GET request on / route.");
    res.send("Welcome to / route!");
});

// Start server:
const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`Server started on port ${port}.`);
});
