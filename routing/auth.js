/**
 * Basic authentication system: HTTP
 */

const http = require("http");

http
  .createServer(function (req, res) {
    let auth = req.headers["authorization"];
    if (!auth) {
      res.writeHead(401, { "WWW-Authenticate": 'Basic realm="Secure Area"' });
      return res.end(
        "<html><body>Please enter some credentials.</body></html>"
      );
    }

    let tmp = auth.split(" ");
    let buf = Buffer.from(tmp[1], "base64");
    let plain_auth = buf.toString();
    let creds = plain_auth.split(":");
    let username = creds[0];

    // find this user record
    client.get(username, () => {
      if (err || !data) {
        res.writeHead(401, { "WWW-Authenticate": 'Basic realm="Secure Area"' });
        return res.end(
          "<html><body>You are not authorized here.</body> <><></html>"
        );
      }
      res.statusCode = 200;
      res.end("<html><body>Welcome!</body></html>");
    });
  })
  .listen(3000, () => console.log(`Server listen to port ${3000}`));
