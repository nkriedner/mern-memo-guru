// IMPORTS:
const express = require("express");
const { createCard, getCards, getCard, deleteCard, updateCard } = require("../controllers/cardController"); // getting the functions for interacting with the database
const requireAuth = require("../middleware/requireAuth"); // middleware for authenticating a user

// Create a router with express's built-in Router:
const router = express.Router();
// Apply the requireAuth middleware to the router (to protect the routes against unauthenticatd users):
router.use(requireAuth);

// GET all cards:
router.get("/", getCards);

// GET a single card:
router.get("/:id", getCard);

// POST a new card:
router.post("/", createCard);

// DELETE a single card:
router.delete("/:id", deleteCard);

// UPDATE a single card:
router.patch("/:id", updateCard);

module.exports = router;
