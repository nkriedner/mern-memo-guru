// IMPORTS:
const mongoose = require("mongoose");
const Card = require("../models/cardModel"); // imports the card model schema

// FUNCTIONS (for dealing with the database):
// Get all cards
const getCards = async (req, res) => {
    const user_id = req.user._id; // given by the requireAuth middleware

    const cards = await Card.find({ user_id }).sort({ createdAt: -1 });
    res.status(200).json(cards);
};

// Get a single card
const getCard = async (req, res) => {
    const { id } = req.params; // destructuring the id from the route parameter

    // Check if id is a valid mongo id
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "The id of this memo card is not valid." });
    }

    const card = await Card.findById(id);

    // Check if the memo card exists in database:
    if (!card) {
        return res.status(404).json({ error: "No memo card with this id in the database." });
    }
    res.status(200).json(card);
};

// Create a new card
const createCard = async (req, res) => {
    console.log("req.body:", req.body);
    const { content_1, content_2, memo_level } = req.body; // destructuring Card collection data

    // Add document to database
    try {
        const user_id = req.user._id; // given by the requireAuth middleware
        const card = await Card.create({ content_1, content_2, memo_level, user_id });
        res.status(200).json(card);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Delete a card
const deleteCard = async (req, res) => {
    const { id } = req.params; // destructuring id from the route parameter

    // Check if id is a valid mongo id
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "The id of this memo card is not valid." });
    }

    const card = await Card.findByIdAndDelete(id);

    // Check if the card existed in database
    if (!card) {
        return res.status(404).json({ error: "No memo card with this id found in database." });
    }

    res.status(200).json(card);
};

// Update a card
const updateCard = async (req, res) => {
    const { id } = req.params; // destructuring id from the route parameter

    // Check if id is valid mongo id
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "The id of this memo card is not valid." });
    }

    const card = await Card.findByIdAndUpdate(
        { _id: id },
        {
            ...req.body, // whatever is in req.body will be spread out and put in
        }
    );

    // Check if the id card existed in database
    if (!card) {
        return res.status(404).json({ error: "No memo card with this id found in database." });
    }

    res.status(200).json(card);
};

// EXPORT:
module.exports = {
    createCard,
    getCards,
    getCard,
    deleteCard,
    updateCard,
};
