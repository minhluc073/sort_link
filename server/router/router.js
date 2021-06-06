const express = require("express");
const routers = express.Router();
// const data = require("../config/database");
const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");
// let db = null;
let dataName = null;
MongoClient.connect(
  'mongodb+srv://luc:luc@cluster0.ikuv4.mongodb.net/db1?retryWrites=true&w=majority',
  function (err, client) {
    assert.equal(null, err);
    console.log("Connected successfully to server");
    const db = client.db(process.env.dbName);
    dataName = db.collection("data");
  }
);

routers.get("/:word", async (req, res) => {
  const rs = req.params.word;
  const result = await dataName.findOne({number: rs});
  res.redirect(result.link.value);
});


routers.post("/short/link", async (req, res) => {
  const dataReq = req.body;
  let resultRadom = "";
  let nameLink = "http://localhost:5000/user/";
  for (let i = 0; i < 5; i++) {
    let number = Math.floor(Math.random() * 10 + 1);
    resultRadom += number + "";
  }

  const resultFind = await dataName.findOne({ link: dataReq });
  if (resultFind !== null) {
    res.json({ success: false });
  } else {
      dataName.insert({link: dataReq, number: resultRadom});
    res.json({ shortLink: nameLink + resultRadom, success: true });
  }
});

module.exports = routers;
