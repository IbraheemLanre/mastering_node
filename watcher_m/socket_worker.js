const SServer = require("ws").Server;
let socketServer = new SServer({ port: 8081 });
socketServer.on("connection", (socket) => {
  let lastMessage = null;
  function kill() {
    if (lastMessage) {
      process.send({
        kill: lastMessage.id,
      });
    }
  }
  socket.on("message", (message) => {
    lastMessage = JSON.parse(message);
    process.send(lastMessage);
  });
  socket.on("close", kill);
  socket.on("error", kill);
});
