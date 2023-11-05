const express = require("express");
const router = express.Router();
const {
    getAllChats,
    createChat,
    getSingleChat,
    updateChat,
    deleteChat,
} = require("../controllers/chats");
const { verifyAccessToken } = require("../jwt/tokens");

router
    .route("/")
    .get(verifyAccessToken, getAllChats)
    .post(verifyAccessToken, createChat);
router
    .route("/:id")
    .get(verifyAccessToken, getSingleChat)
    .patch(verifyAccessToken, updateChat)
    .delete(verifyAccessToken, deleteChat);

module.exports = router;
