const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    firstName: String,
    lastName: String,
    email: String,
    psw: String,
    phone: String,
    imgId: String,
    path: String,
});

const User = mongoose.model("user", UserSchema);
module.exports = User;