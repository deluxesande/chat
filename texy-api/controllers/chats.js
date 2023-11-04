const asyncWrapper = require("../middleware/AsyncWrapper");
const Chat = require("../models/chatModel");

const getAllChats = asyncWrapper(async (req, res) => {
    const chats = await Chat.find();
    res.status(200).json({ chats });
});

const createChat = asyncWrapper(async (req, res) => {
    const chat = await Chat.create({ sender: "Sean" });
    res.status(201).json(chat);
});

module.exports = {
    getAllChats,
    createChat,
};
