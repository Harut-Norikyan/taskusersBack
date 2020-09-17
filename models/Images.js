const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ImageSchema = new Schema({
    name: String,
    path : String
});

const Images = mongoose.model("Images", ImageSchema);
module.exports = Images;