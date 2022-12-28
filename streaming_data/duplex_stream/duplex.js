/**
 * A program to create a TCP server via telnet.
 * It's created in a way like a chat application via the terminal
 */

const stream = require("stream");
const net = require("net");

net
  .createServer((socket) => {
    socket.write("Go ahead and type something!");
    socket.setEncoding("utf-8");
    socket.on("readable", function () {
      process.stdout.write(this.read());
    });
  })
  .listen(8080);
