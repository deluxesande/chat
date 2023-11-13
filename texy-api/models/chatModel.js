const mongoose = require("mongoose");

const ChatSchema = new mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "Must provide sender"],
        trim: true,
        maxLength: [20, "Must not exceed 20 characters"],
    },
});

module.exports = mongoose.model("Chat", ChatSchema);
