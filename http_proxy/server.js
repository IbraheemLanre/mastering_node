

let httpProxy = require("http-proxy");
let proxy = httpProxy
  .createServer({
    target: {
      host: "www.example.com",
      port: 80,
    },
  })
  .listen(80);
