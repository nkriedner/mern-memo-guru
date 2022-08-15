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

// ROUTES:
const cardRoutes = require("./routes/cards");
app.use("/api/cards", cardRoutes);
app.get("/*", (req, res) => {
    res.send("This is just a random route with no purpose.");
});

// Start server:
const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`Server started on port ${port}.`);
});
