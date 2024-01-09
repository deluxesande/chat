const User = require("../models/userModel");
const asyncWrapper = require("../middleware/AsyncWrapper");
const {
    signAccessToken,
    refreshToken,
    verifyRefreshToken,
} = require("../jwt/tokens");
const Chat = require("../models/chatModel");

const checkAuth = require("../middleware/firebaseAuth");

const getAllUSers = asyncWrapper(async (req, res) => {
    const users = await User.find();
    // Implement functionality to return last chat
    const chat = await Chat.find().sort({ _id: -1 }).limit(1);
    res.status(200).json({ users, chat });
});

const registerUser = asyncWrapper(async (req, res) => {
    // Check if the request contains authentication information
    let firebaseUser;
    if (req.headers.authorization) {
        // The request contains authentication information
        // Check if the user is signed in with Firebase
        firebaseUser = checkAuth(req);
    }

    if (firebaseUser) {
        // The user is signed in with Firebase
        // You can now use the firebaseUser object to create a new user in your datab
    } else {
        const userData = req.body;
        const user = new User(userData);
        const existsUser = await User.findOne({ username: user.username });

        if (existsUser) res.status(409).json({ message: "User exists" });

        const savedUser = await user.save();
        const accessToken = await signAccessToken(savedUser.id);
        const refreshAccessToken = await refreshToken(savedUser.id);

        res.status(201).json({ accessToken, refreshToken: refreshAccessToken });
    }
});

const loginUser = asyncWrapper(async (req, res) => {
    // Check if the request contains authentication information
    let firebaseUser;
    if (req.headers.authorization) {
        // The request contains authentication information
        // Check if the user is signed in with Firebase
        firebaseUser = checkAuth(req);
    }

    if (firebaseUser) {
        // The user is signed in with Firebase
        // You can now use the firebaseUser object to create a new user in your database
    } else {
        // The user is not signed in with Firebase
        // Continue with the manual email sign in
        const { username, password } = req.body;
        if (!username | !password) {
            res.status(404).json({ message: "Email and Password needed" });
        }

        const user = await User.findOne({ username });
        if (!user)
            res.status(401).json({ message: "Username/Password invalid" });

        const isValid = await user.isValidPassword(password);
        if (!isValid) {
            res.status(401).json({ message: "Username/Password invalid" });
        }

        const accessToken = await signAccessToken(user.id);
        const refreshAccessToken = await refreshToken(user.id);
        res.status(200).json({
            user,
            accessToken,
            refreshToken: refreshAccessToken,
        });
    }
});

const refreshTokens = asyncWrapper(async (req, res) => {
    const { refreshToken: token } = req.body;
    if (!refreshToken) res.status(400);
    const userID = await verifyRefreshToken(token);

    const accessToken = await signAccessToken(userID);
    const refreshAccessToken = await refreshToken(userID);
    res.status(200).json({ accessToken, refreshToken: refreshAccessToken });
});

module.exports = {
    getAllUSers,
    registerUser,
    loginUser,
    refreshTokens,
};
