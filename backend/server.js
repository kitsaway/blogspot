const express = require("express");
const dotenv = require('dotenv');
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const routes = require("./routes/posts.routes");
dotenv.config();
const cors = require("cors");
const path = require("path");

mongoose.Promise = global.Promise;
const app = express();
app.use(cors());

const PORT = process.env.PORT || 3000;
const HOST = "0.0.0.0";

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static('public'));
app.use("/routes/posts", routes);
app.use(function(req, res, next) {
  if (req.originalUrl && req.originalUrl.split("/").pop() === 'favicon.ico') {
    return res.sendStatus(204);
  }
  return next();
});
app.get('/',(req,res)=>{
  res.sendFile(path.join(__dirname,'public/index.html'));
});

mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true }, () => {
  console.log("Connected to db!");
  app.listen(PORT, HOST, () => console.log(`Server Up and running on Port ${PORT}`));
});

