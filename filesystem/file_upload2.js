const fs = require("fs");
const http = require("http");
const path = require("path");
const crypto = require("crypto");
let formidable = require("formidable");

http
  .createServer((req, res) => {
    let rm = req.method.toLowerCase();
    if (rm === "post") {
      let form = new formidable.IncomingForm();
      form.uploadDir = process.cwd();
      let resp = "";
      form
        .on("file", (field, File) => {
          resp += `File: ${File.name}<br/>`;
        })
        .on("field", (field, value) => {
          resp += `${field}: ${value}<br/>`;
        })
        .on("end", () => {
          res.writeHead(200, { "Content-Type": "text/html" });
          res.on("Received");
        })
        .parse(req);
      return;
    }

    // Only GET is handled if not POST
    if (rm !== "get") {
      return res.end("Unsupported Method");
    }
    let filename = path.join(__dirname, req.url);
    fs.stat(filename, (err, stat) => {
      if (err) {
        res.statusCode = err.errno === 34 ? 404 : 500;
        return req.end();
      }
      var etag = crypto
        .createHash("md5")
        .update(stat.size + stat.mtime)
        .digest("hex");
      res.setHeader("Last-Modified", stat.mtime);
      if (req.headers["if-none-match"] === etag) {
        res.statusCode = 304;
        return res.end();
      }
      res.setHeader("Content-Length", stat.size);
      res.setHeader("ETag", etag);
      res.statusCode = 200;
      fs.createReadStream(filename).pipe(res);
    });
  })
  .listen(3000);
