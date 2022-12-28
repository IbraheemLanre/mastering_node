const http = require("http");
const https = require("https");
const url = require("url");
const fs = require("fs");
const _ = require("lodash");

http
  .createServer((req, res) => {
    let parse = url.parse(req.url, true);
    let symbol = parse.query.symbol;

    if (req.url === "/favicon.ico") {
      res.writeHead(200, { "Content-Type": "image/x-icon" });
      return res.end();
    }

    if (!symbol) {
      return fs.readFile("./stock.html", (err, data) => {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(data);
      });
    }

    // query = `https//api.iextrading.com/1.0/stock/${symbol.toLowerCase()}/quote`;

    query = `https://cloud.iexapis.com/beta/stock/${symbol.toLowerCase()}/quote?token=pk_4e12667f9f8b4ddd9af51801779a508e`;

    https
      .get(query, (res) => {
        let data = "";

        res
          .on("readable", function () {
            let d;
            while ((d = this.read())) {
              data += d.toString();
            }
          })
          .on("end", function () {
            let out = {};
            try {
              data = JSON.parse(data);
              out.quote = data;
              out.callIn = 5000;

              Object.keys(out.quote).forEach((k) => {
                v = out.quote[k];
                if (_.isFinite(v)) {
                  out.quote[k] = +v + Math.round(Math.random());
                }
              });
            } catch (err) {
              out = {
                err: "Received an empty data set",
                callIn: 10000,
              };
            }
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify(out));
          });
      })
      .on("error", (err) => {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(
          JSON.stringify({
            error: err.message,
            callIn: null,
          })
        );
      });
  })
  .listen(2112, () => console.log("Server listening on 2112"));
