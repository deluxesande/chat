const asyncWrapper = require("../middleware/AsyncWrapper");
const Chat = require("../models/chatModel");

const getAllChats = asyncWrapper(async (req, res) => {
    const chats = await Chat.find();
    res.status(200).json({ chats });
});

const getSingleChat = asyncWrapper(async (req, res) => {
    const id = "6546b25accf64320e4ef967f";
    const chat = await Chat.findOne({ _id: id });

    if (!chat) {
        res.status(404).json({ msg: `Chat with id ${id} does not exist.` });
    }

    res.status(200).json(chat);
});

const createChat = asyncWrapper(async (req, res) => {
    const chat = await Chat.create({ sender: "John" });
    res.status(201).json(chat);
});

const updateChat = asyncWrapper(async (req, res) => {
    const id = "6546b25accf64320e4ef967f";
    const chat_to_send = { sender: "john" };

    const chat = await Chat.findOneAndUpdate({ _id: id }, chat_to_send, {
        new: true,
        runValidators: true,
    });

    if (!chat) {
        res.status(404).json({ msg: `Chat with id ${id} does not exist.` });
    }

    res.status(200).json(chat);
});

const deleteChat = asyncWrapper(async (req, res) => {
    const id = "6546b25accf64320e4ef967f";

    const chat = await Chat.findOneAndDelete({ _id: id });

    if (!chat) {
        res.status(404).json({ msg: `Chat with id ${id} does not exist.` });
    }

    res.status(200).json({ chat });
});

module.exports = {
    getAllChats,
    createChat,
    getSingleChat,
    updateChat,
    deleteChat,
};
