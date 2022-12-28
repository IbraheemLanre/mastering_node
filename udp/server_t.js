const dgram = require("dgram");
let client = dgram.createSocket("udp4");
let message = Buffer.from("UDP says Hello!", "utf8");
client.send(message, 0, message.length, 41234, "localhost", (err, bytes) =>
  client.close()
);
