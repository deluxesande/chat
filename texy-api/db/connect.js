const mongoos = require("mongoose");

const connectDB = (url) => {
    return mongoos.connect(url, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
    });
};

module.exports = connectDB;
