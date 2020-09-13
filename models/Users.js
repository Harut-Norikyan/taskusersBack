const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    firstName: String,
    lastName: String,
    email: String,
    psw : String,
    phone : String,
});

const User = mongoose.model("user", UserSchema);
module.exports = User;