const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const getroutes = require("./components/routes/get");
const postroutes = require("./components/routes/post");
// const logger = require("./public/logger");
require("dotenv/config");

app.use(function (req, res, next) {
  // res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Origin", process.env.CLIENT_SERVER); // update to match the domain you will make the request from
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header("Access-Control-Allow-Credentials", true);
  if (req.method === "OPTIONS") {
    res.header(
      "Access-Control-Allow-Methods",
      "GET, POST, OPTIONS, PUT, PATCH, DELETE"
    );
    return res.status(200).json({});
  }
  next();
});
app.use(bodyParser.json({ limit: "50mb", extended: true })); // for json data in body
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true })); // for form data in body
app.use(bodyParser.text());
app.use(cookieParser());

// app.use(logger);

app.use("/api/get", getroutes);
app.use("/api/post", postroutes);

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Listening on ${port}...`);
});
