const mongoose = require("mongoose");

const ChatSchema = new mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "Must provide sender"],
        trim: true,
        maxLength: [100, "Must not exceed 20 characters"],
    },
    receiver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "Must provide receiver"],
        trim: true,
        maxLength: [100, "Must not exceed 20 characters"],
    },
    message: {
        type: String,
        required: [true, "Must provide message"],
        trim: true,
    },
});

module.exports = mongoose.model("Chat", ChatSchema);
