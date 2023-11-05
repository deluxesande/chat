const JWT = require("jsonwebtoken");

const signAccessToken = (userID) => {
    return new Promise((resolve, reject) => {
        const payload = {};
        const secret = process.env.SECRET_ACCESS;
        const options = {
            expiresIn: "15s",
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
            const message =
                error.name === "JsonWebTokenError" ? "" : error.message;
            res.status(401).json({ message });
        }

        req.payload = payload;
        next();
    });
};

const refreshToken = (userID) => {
    return new Promise((resolve, reject) => {
        const payload = {};
        const secret = process.env.REFRESH_ACCESS;
        const options = {
            expiresIn: "1y",
            audience: userID,
        };

        JWT.sign(payload, secret, options, (error, token) => {
            if (error) reject(error);
            resolve(token);
        });
    });
};

const verifyRefreshToken = (token) => {
    return new Promise((resolve, reject) => {
        JWT.verify(token, process.env.REFRESH_ACCESS, (error, payload) => {
            if (error) reject(error);
            const userID = payload.aud;
            resolve(userID);
            next();
        });
    });
};

module.exports = {
    signAccessToken,
    verifyAccessToken,
    refreshToken,
    verifyRefreshToken,
};
