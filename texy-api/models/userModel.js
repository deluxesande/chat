const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const validateEmail = function (email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email);
};

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        trim: true,
        maxLength: [100, "Must not exceed 100 characters"],
    },
    lastName: {
        type: String,
        trim: true,
        maxLength: [100, "Must not exceed 100 characters"],
    },
    username: {
        type: String,
        required: [true, "Name must be provided"],
        trim: true,
        maxLength: [100, "Must not exceed 100 characters"],
    },
    email: {
        type: String,
        required: [true, "Email must be provided"],
        trim: true,
        lowercase: true,
        validate: [validateEmail, "Please fill a valid email address"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Password must be provided"],
    },
    created: {
        type: Date,
        default: Date.now(),
    },
});

UserSchema.pre("save", async function (next) {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(this.password, salt);
        this.password = hashedPassword;
        next();
    } catch {
        next(error);
    }
});

UserSchema.methods.isValidPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model("User", UserSchema);
