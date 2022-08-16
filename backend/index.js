// IMPORTS:
require("dotenv").config(); // to use environment variables from .env
const express = require("express");

// Create app:
const app = express();

// MIDDLEWARE:
app.use(express.json()); // parses body data in json if needed -> enabling acces to req.body
app.use((req, res, next) => {
    console.log(`${req.method} request on ${req.path}`); // logs path and method for every request to server
    next();
});

// ROUTES:
const cardRoutes = require("./routes/cards");
app.use("/api/cards", cardRoutes);
app.get("/*", (req, res) => {
    res.send("This is just a random route with no purpose.");
});

// Connecting to database and starting server:
const connectDB = require("./database/db"); // imports the function to connect to database
const port = process.env.PORT || 8000; // sets the server port
connectDB().then(() => {
    app.listen(port, () => {
        console.log(`Server started on port ${port}.`);
    });
});
