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

router.use(verifyAccessToken);

router.route("/").get(getAllChats).post(createChat);
router.route("/:id").get(getSingleChat).patch(updateChat).delete(deleteChat);

module.exports = router;
