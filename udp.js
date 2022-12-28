// A simple program that allows the user to send data btw two UDP servers

var dgram = require("dgram");
var client = dgram.createSocket("udp4");
var server = dgram.createSocket("udp4");

var message = process.argv[2] || "message";

message = new Buffer.from(message);
server
  .on("message", function (msg) {
    process.stdout.write("Got your message: " + msg + "\n");
    process.exit();
  })
  .bind(41234);

client.send(message, 0, message.length, 41234, "localhost");

var count = 0;
(function curse() {
  console.log(++count)
  curse()
})()
