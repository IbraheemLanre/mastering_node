/**
 * This aim of the program is to create a server that a client connects to
 * and receives updates from twitter
 *
 */

let fs = require("fs");
let http = require("http");

let theUser = null; //  single user conntection
let userPos = 0; // store the last position this client read from in tweetFile
let tweetFile = "tweets.txt";

http
  .createServer((req, res) => {
    res.writeHead(200, {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      "Access-Control-Allow-Origin": "*",
    });

    theUser = res;

    res.write(":" + Array(2049).join(" ") + "\n");
    res.write("retry: 2000\n");
    res.socket.on("close", () => {
      theUser = null;
    });
  })
  .listen(8080);

// sends clients message
let sendNext = function (fd){
  let buffer =  Buffer.alloc(140);
  fs.read(fd, buffer, 0, 140, userPos * 140, (err, num) => {
    if (!err && num > 0 && theUser) {
      ++userPos;
      theUser.write("data: " + buffer.toString("utf-8", 0, num) + "\n\n");
      return process.nextTick(()=> {
        sendNext(fd);
      });
    }
  });
};

function start() {
  fs.open(tweetFile, "r", (err, fd) =>{
    if (err) {
      return setTimeout(start, 1000);
    }
    fs.watch(tweetFile, (event, filename) => {
      if (event === "change") {
        sendNext(fd);
      }
    });
  });
}

start();
