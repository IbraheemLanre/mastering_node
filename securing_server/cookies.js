/**
 * A program to create a server that echoes back the value of a sent cookie
 * if no cookie exists, the server will create one and instrust the client for it again
 *
 */

const http = require("http");
const url = require("url");

http
  .createServer((req, res) => {
    let cookies = req.headers.cookie;
    if (!cookies) {
      let cookieName = "session";
      let cookieValue = "123456";
      let numberOfDays = 4;
      let expiryDate = new Date();
      expiryDate.setDate(expiryDate.getDate() + numberOfDays);

      let cookieText = `${cookieName} = ${cookieValue}; expires = ${expiryDate.toUTCString}`;
      res.setHeader("Set-Cookie", cookieText);
      res.writeHead(302, { Location: "/" });
      return res.end();
    }

    cookies.split(";").forEach((cookie) => {
      let m = cookie.match(/(.*?)=(.*)$/); //regExp
      cookies[m[1].trim()] = (m[2] || "").trim();
    });

    res.end(`Cookie set: ${cookies.toString()}`);
    
  })
  .listen(8080);
