const getToken = (authHeader) => {
    const bearer = authHeader.split(" ");
    return bearer[1];
};

module.exports = getToken;
