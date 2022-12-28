var io = require("socket.io").listen(2112);

io.sockets.on("connection", (socket) => {
  socket.emit("broadcast", { message: "HI!" });
  socket.on("clientmessage", function (data) {
    console.log("Client said" + data);
  });
});
