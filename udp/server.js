const dgram = require("dgram");
let socket = dgram.createSocket("udp4");
socket.on("message", (msg, info) => {
  console.log("socket got: " + msg + "from" + info.address + ":" + info.port);
});
socket.bind(41234);
socket.on("listening", () => {
  console.log("Listening for datagrams");
});
