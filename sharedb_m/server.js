const http = require("http");
const express = require("express");
const ShareDB = require("sharedb");
const richText = require("rich-text");
const WebSocket = require("ws");
const WebSocketJSONStream = require("websocket-json-stream");

ShareDB.types.register(richText.type);

const app = express();
app.use(express.static("static"));
app.use(express.static("node_modules/quill/dist"));

const backend = new ShareDB();
const connection = backend.connect();

let doc = connection.get("examples", "richtext");

doc.fetch((err) => {
  if (err) {
    throw err;
  }

  if (doc.type === null) {
    return doc.create([{ insert: "Say something!" }], "rich-text", startServer);
  }

  startServer();
});

function startServer() {
  const server = http.createServer(app);

  const wss = new WebSocket.Server({ server: server });
  wss.on("connection", (ws) => {
    backend.listen(new WebSocketJSONStream(ws));
  });

  server.listen(3000, () =>
    console.log("Collaboration now happening on http://localhost:3000")
  );
}
