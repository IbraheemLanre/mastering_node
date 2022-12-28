const crypto = require("crypto");
const fs = require("fs");
const express = require("express");
const redis = require("redis");

let app = express();
let client = redis.createClient();

app.get("/authenticate/:username", (req, res) => {
  let publicKey = Math.random();
  let username = req.params.username;
  client.hGetAll(username, (err, data) => {
    if (err || !data) {
      return res.end("no data");
    }
    // create the challenge hash
    let challenge = crypto
      .createHash("sha256")
      .update(publicKey + data.password)
      .digest("hex");
    // store challenge for later match
    client.setEx(challenge, username);
    res.end(challenge);
  });
});

app.get("/login/:res", (req, res) => {
  let challengeHash = req.params.res;
  client.exists(challengeHash, (err, exists) => {
    if (err || !exists) {
      return res.end("failed");
    }
  });
  client.del(challengeHash, () => {
    res.end("OK");
  });
});

app.get("/", (req, res) => {
  fs.readFile("./challenge_response.html", (err, data) => {
    res.writeHead(200, { "Content-Type": "text/hmtl" });
    res.end(data);
  });
});

app.get("/256", (req, res) => {
  fs.readFile("./sha256.js", (err, data) => {
    res.end(data);
  });
});

app.listen(3000, () => console.log(`Server is up and running!`));
