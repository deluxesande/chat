const express = require("express");
const router = express.Router();
const {
    registerUser,
    loginUser,
    refreshTokens,
} = require("../controllers/users");

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/refresh-tokens").post(refreshTokens);

module.exports = router;
