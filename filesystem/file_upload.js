/**
 * A program that create a server showing how file can be uploaded
 * using the formidable package(module)
 *
 */

const http = require("http");
const fs = require("fs");
let formidable = require("formidable");

http
  .createServer((req, res) => {
    let rm = req.method.toLowerCase();
    if (req.url === "/uploads" && rm === "post") {
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
          res.end(resp);
        })
        .parse(req);
      return;
    }
  })
  .listen(3000);
