/**
 * This program creates a server showing how to handle favicon.ico request
 * A server always has to send two separate responses when handling
 * request in real life, one for favicon and the other for the normal request
 */

const http = require("http");
http
  .createServer((req, res) => {
    if (req.url === "/favicon.ico") {
      res.writeHead(200, {
        "Content-Type": "image/x-icon",
      });
      return res.end();
    }
    res.writeHead(200, {
      "Content-Type": "text/plain",
    });
    res.write("Some requested resource");
    res.end();
  })
    .listen(8080);
  
    
