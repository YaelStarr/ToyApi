
const { Schema, model } = require("mongoose");

const userSchema = new Schema({
    id: {
        type: String,
        required: false
    },
    name: {
        type: String,
        required: [true, 'name is requred'],
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    isAdmin: {
        type: Boolean,
        default: false,
        required: true,
    },
    birthDate: {
        type: Date,
        required: true,
        default: new Date(),
    },
    roles: []
});

// Do thing to the schema before saving
userSchema.pre("save", function (next) {
    // console.log(this);
    this.id = String(this._id);
    next();
});

const User = model("User", userSchema);
module.exports.User = User;