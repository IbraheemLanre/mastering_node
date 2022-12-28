const http = require("http");
/*http
  .request(
    {
      host: "www.example.org",
      method: "GET",
      path: "/",
    },
    function (res) {
      res.setEncoding("utf8");
      res.on("readable", () => console.log(res.read()));
    }
  )
  .end();*/

// Another method
http
  .get("http://www.example.org/", (res) => {
    console.log(`Status: ${res.statusCode}`);
  })
  .on("error", (err) => {
    console.log("Error: " + err.message);
  });
