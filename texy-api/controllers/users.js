const User = require("../models/userModel");
const asyncWrapper = require("../middleware/AsyncWrapper");
const {
    signAccessToken,
    refreshToken,
    verifyRefreshToken,
} = require("../jwt/tokens");

const registerUser = asyncWrapper(async (req, res) => {
    const userData = req.body;
    const user = new User(userData);
    const existsUser = await User.findOne({ username: user.username });

    if (existsUser) res.status(409).json({ message: "User exists" });

    const savedUser = await user.save();
    const accessToken = await signAccessToken(savedUser.id);
    const refreshAccessToken = await refreshToken(savedUser.id);

    res.status(201).json({ accessToken, refreshToken: refreshAccessToken });
});

const loginUser = asyncWrapper(async (req, res) => {
    const { username, password } = req.body;
    if (!username | !password) {
        res.status(404).json({ message: "Email and Password needed" });
    }

    const user = await User.findOne({ username });
    if (!user) res.status(401).json({ message: "Username/Password invalid" });

    const isValid = await user.isValidPassword(password);
    if (!isValid) {
        res.status(401).json({ message: "Username/Password invalid" });
    }

    const accessToken = await signAccessToken(user.id);
    const refreshAccessToken = await refreshToken(user.id);
    res.status(200).json({ accessToken, refreshToken: refreshAccessToken });
});

const refreshTokens = asyncWrapper(async (req, res) => {
    const { refreshToken: token } = req.body;
    if (!refreshToken) res.status(400);
    console.log(token);
    const userID = await verifyRefreshToken(token);

    const accessToken = await signAccessToken(userID);
    const refreshAccessToken = await refreshToken(userID);
    res.status(200).json({ accessToken, refreshToken: refreshAccessToken });
});

module.exports = {
    registerUser,
    loginUser,
    refreshTokens,
};
