/**
 * A chat application using socket.io, with dual user environment and
 * a possible extension to multiusers.
 *
 * To be continued tomorrow thorough the weekends
 *
 */

const http = require("http");
const express = require("express");
const app = express();
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
  console.log("a user is connected");
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});


io.on("connection", (socket) => {
  socket.on("chat message", (msg) => {
    io.emit("chat message", msg);
  });
});

server.listen(8080, () =>
  console.log(`Server is up and running on port ${8080}`)
);
