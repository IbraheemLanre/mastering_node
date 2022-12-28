const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();

app.use(cookieParser());

app.get("/mycookie", (req, res) => {
  res.end(req.cookies.node_cookie);
});

app.get("/", (req, res) => {
  res.cookie("node_cookie", parseInt(Math.random() * 10e10));
  res.end("Cookie set");
  console.log(req.cookies.node_cookie);
});

app.listen(8000);
