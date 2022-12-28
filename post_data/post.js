/**
 * A program that creates a server returning a form submitted from client
 * checks the request url to determine if the form is a request form of a submitted form
 * returns an HTML for the first case and parsing submitted data in the other
 */

const http = require("http");
const qs = require("querystring");

http
  .createServer((req, res) => {
    let body = "";
    if (req.url === "/") {
      res.writeHead(200, {
        "Content-Type": "text/html",
      });
      return res.end(
        '<form action="/submit" method="post">\
            <input type="text" name="sometext">\
            <input type="submit" value="Send something">\
            </form>'
      );
    }

    if (req.url === "submit") {
      req.on("readable", () => {
        let data = req.read();
        data && (body += data);
      });
      req.on("end", () => {
        let fields = qs.parse(body);
        console.log(fields.sometext);
        res.end(`Hi! I received your text: ${fields.sometext}`);
      });
    }
  })
  .listen(8080);
