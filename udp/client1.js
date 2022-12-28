const dgram = require('dgram')


dgram.createSocket('udp4', (message, remote) => {
    console.log(`Client1 received message ${message} from ${remote.address}:${remote.port}`)
}).bind(multicastPort, multicastAdd)