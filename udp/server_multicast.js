// multicasting server initialization
const dgram = require("dgram");
let socket = dgram.createSocket("udp4");
let multicastAdd = "230.1.2.3";
let multicastPort = 5554;
socket.bind(multicastPort);
socket.on("listening", () => {
  this.setMulticastTTL(64);
  this.addMembership(multicastAdd);
});

let cnt = 1;
let sender;
sender = function () {
  let msg = Buffer.from(`This is message #${cnt}`);
  socket.send(msg, 0, message.length, multicastPort, multicastAdd);
  ++cnt;
  setTimeout(sender, 1000);
};

dgram
  .createSocket("udp4", (message, remote) => {
    console.log(
      `Client1 received message ${message} from ${remote.address}:${remote.port}`
    );
  })
  .bind(multicastPort, multicastAdd);

  dgram
  .createSocket("udp4", (message, remote) => {
    console.log(
      `Client2 received message ${message} from ${remote.address}:${remote.port}`
    );
  })
  .bind(multicastPort, multicastAdd);

