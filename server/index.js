const http = require("http");
const express = require("express");
const app = express();
const routers = require("./router/router");

const allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', '*');
  res.header('Access-Control-Allow-Headers', '*');
  next();
}

app.use(allowCrossDomain);
app.use(express.static("public"));
app.use(express.json());
app.use("/user", routers);

app.use("/", (req, res, next) => {
  res.send("ok")
});

app.get("*", function (req, res) {
  res.send("404 not found");
})
const PORT =  process.env.URPORT || 5000;
app.listen(PORT, function (req, res) {
  console.log(`Connection to server listening with post ${PORT}`)
})