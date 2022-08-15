// IMPORTS:
const mongoose = require("mongoose");

// Initialize a mongoose Schema:
const Schema = mongoose.Schema;

// Create a (new) specific mongoose Schema:
const cardSchema = new Schema(
    {
        content_1: {
            type: String,
            required: true,
        },
        content_2: {
            type: String,
            required: true,
        },
        memo_level: {
            type: Number,
            default: 1,
        },
    },
    { timestamps: true }
);

// Create a 'Cards' collection with the cardsSchema and export it:
module.exports = mongoose.model("Cards", cardSchema);
