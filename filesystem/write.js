const fs = require('fs')

let buffer = Buffer.alloc(8675)
fs.open('index.html', 'w', (err, fd) => {
    fs.write(fd, buffer, 309, 8366, 100, (err, writtenBytes, buffer) => {
        console.log(`Wrote ${writtenBytes} bytes to file`)
    })
})