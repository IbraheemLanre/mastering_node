/**
 * A program to setup an HTTP server responding to any request by fetching
 * the front page of a website and piping that page back to the client
 */

const http = require("http");
const server = new http.Server();

server.on("request", (request, response) => {
  console.log(request.url);
  http.request(
    {
      host: "www.example.org",
      method: "GET",
      path: "/",
      port: 80,
    },
    (response) => response.pipe(socket)
  ).end;
});

server.listen(8080, () =>
  console.log("Proxy server listening on localhost:8080")
);
