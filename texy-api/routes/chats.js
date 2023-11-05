const express = require("express");
const router = express.Router();
const {
    getAllChats,
    createChat,
    getSingleChat,
    updateChat,
    deleteChat,
} = require("../controllers/chats");

router.route("/").get(getAllChats).post(createChat);
router.route("/:id").get(getSingleChat).patch(updateChat).delete(deleteChat);

module.exports = router;
