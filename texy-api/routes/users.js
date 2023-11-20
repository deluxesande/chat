const express = require("express");
const router = express.Router();
const {
    registerUser,
    loginUser,
    refreshTokens,
    getAllUSers,
} = require("../controllers/users");
const { verifyAccessToken } = require("../jwt/tokens");

router.route("/users").get(verifyAccessToken, getAllUSers);
router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/refresh-tokens").post(refreshTokens);

module.exports = router;
