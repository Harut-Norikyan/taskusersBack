const mongoose = require("mongoose");

const connectDb = async () => {
    try {
        let url = "mongodb+srv://harutnorikyan:055233940har@cluster0.gmqh0.mongodb.net/taskDb";
        await mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        });
        console.log("connected");
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}
module.exports = connectDb;