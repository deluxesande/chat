const express = require("express");
const router = express.Router();
const { getAllChats, createChat } = require("../controllers/chats");

router.route("/").get(getAllChats).post(createChat);

module.exports = router;
