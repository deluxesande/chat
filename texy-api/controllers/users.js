const User = require("../models/userModel");
const asyncWrapper = require("../middleware/AsyncWrapper");
const { signAccessToken } = require("../jwt/tokens");

const registerUser = asyncWrapper(async (req, res) => {
    const user = new User({
        email: "tester1@gmail.com",
        username: "tester1",
        password: "qwerty",
    });
    const existsUser = await User.findOne({ username: user.username });

    if (existsUser) res.status(409).json({ message: "User exists" });

    const savedUser = await user.save();
    const accessToken = await signAccessToken(savedUser.id);

    res.status(201).json({ accessToken });
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
    res.status(200).json({ accessToken });
});

module.exports = {
    registerUser,
    loginUser,
};
