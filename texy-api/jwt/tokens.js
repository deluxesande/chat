const JWT = require("jsonwebtoken");

const signAccessToken = (userID) => {
    return new Promise((resolve, reject) => {
        const payload = {};
        const secret = process.env.SECRET_ACCESS;
        const options = {
            expiresIn: "15m",
            audience: userID,
        };

        JWT.sign(payload, secret, options, (error, token) => {
            if (error) reject(error);
            resolve(token);
        });
    });
};

const verifyAccessToken = (req, res, next) => {
    if (!req.headers["authorization"]) {
        res.status(401).json({ message: "User not authorized" });
    }
    const authHeader = req.headers["authorization"];
    const bearer = authHeader.split(" ");
    const token = bearer[1];

    JWT.verify(token, process.env.SECRET_ACCESS, (error, payload) => {
        if (error) {
            if ((error.name = "JsonWebTokenError")) {
                res.status(401).json();
            } else {
                res.status(401).json(error.message);
            }
        }

        req.payload = payload;
        next();
    });
};

module.exports = {
    signAccessToken,
    verifyAccessToken,
};
