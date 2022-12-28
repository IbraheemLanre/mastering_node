const express = require("express");
const multer = require("multer");
const crypto = require("crypto");
const url = require("url");
const jwt = require("jwt-simple");

const app = express();

app.set("jwtSecret", "shhhhhh");

const server = app.listen(3000, () => {
  console.log("Listening on", server.address().port);
});

app.use(express.static(__dirname));

app.use(multer());

app.post("/login", auth, (req, res) => {
  let nowSeconds = Math.floor(Date.now() / 1000);
  let plus7Days = nowSeconds + 60 * 60 * 24 * 7;

  let token = jwt.encode(
    {
      iss: "http://blogengine.com",
      aud: ["http://blogsearch.com", "http://blogstorage"],
      sub: "blogengine:uniqueuserid",
      iat: nowSeconds,
      exp: plus7Days,
      sessionData: encrypt(
        JSON.stringify({
          department: "sales",
        })
      ),
    },
    app.get("jwtSecret")
  );
  res.send({ token: token });
});

app.post("/tokendata", (req, res) => {
  let token = req.get("Authorization").replace("Bearer ", "");
  let decoded = jwt.decode(token, app.get("jwtSecret"));
  decoded.sessionData = JSON.parse(decrypt(decoded.sessionData));
  let now = Math.floor(Date.now() / 1000);
  if (now > decoded.exp) {
    return res.end(
      JSON.stringify({
        error: "Token expired",
      })
    );
  }
  res.send(decoded);
});

// Not use for JWT but for encrypting #sessionData
function encrypt(plaintext) {
  let cipher = crypto.createCipheriv("aes-256-cbc", app.get("jwtSecret"));
  return cipher.update(plaintext, "utf-8", "hex") + cipher.final("hex");
}

// Not use for JWT but for decrypting sessionData
function decrypt(encrypted) {
  let decipher = crypto.createDecipheriv("aes-256-cbc", app.get("jwtSecret"));
  return decipher.update(encrypted, "hex", "utf-8") + decipher.final("utf-8");
}

// A mock auth middleware
function auth(req, rest, next) {
  if (!req.body.username || !req.body.password) {
    return res.end(
      JSON.stringify({
        error: "Bad credentials",
      }),
      401
    );
  }
  next();
}
