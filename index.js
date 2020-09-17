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

const path = require("path")
// app.use(express.static(path.join(__dirname, '/public')));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});



app.listen(80);







