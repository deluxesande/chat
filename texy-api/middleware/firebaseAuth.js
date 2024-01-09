const admin = require("firebase-admin");
const serviceAccount = require("../chat-firebase-adminsdk.json");

// Initialize Firebase
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://chat-8bf66.firebaseio.com",
});

// Middleware to check if the request has a valid user
function checkAuth(req, res, next) {
    const idToken = req.headers.authorization;

    admin
        .auth()
        .verifyIdToken(idToken)
        .then((decodedToken) => {
            req.user = decodedToken;
            next();
        })
        .catch((error) => {
            res.status(401).send("Unauthorized");
        });
}

module.exports = checkAuth;
