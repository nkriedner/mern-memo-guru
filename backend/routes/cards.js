// IMPORTS:
const express = require("express");

// Create a router with express's built-in Router:
const router = express.Router();

// GET all cards:
router.get("/", (req, res) => {
    res.json({ mssg: "GET all cards" });
});

// GET a single card:
router.get("/:id", (req, res) => {
    res.json({ mssg: "GET a single card" });
});

// POST a new card:
router.post("/", (req, res) => {
    res.json({ mssg: "POST a new card" });
});

// DELETE a single card:
router.delete("/:id", (req, res) => {
    res.json({ mssg: "DELETE a single card" });
});

// UPDATE a single card:
router.patch("/:id", (req, res) => {
    res.json({ mssg: "UPDATE a single card" });
});

module.exports = router;
