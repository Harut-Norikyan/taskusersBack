const express = require("express");
const app = express();
const corse = require("cors");
app.use(corse());
const connectDb = require("./db");
connectDb();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());




const router = require("./routes/index");
app.use("/", router);



app.listen(4000);

