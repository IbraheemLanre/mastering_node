const http = require('http')
const server = new http.Server()
server.on('connection', socket => {
    let now = new Date()
    console.log(`Client arrived: ${now}`)
    socket.on('end', ()=> console.log(`Client left: ${new Date()}`))
})

// Connections get 2 seconds before being terminated
server.setTimeout(2000, socket => socket.end)
server.listen(8080)

// adding a listener that handles request, response as a Readable stream
server.on('request', (req, res) => {
    req.setEncoding('utf8')
    req.on('readable', () => {
        let data = req.read()
        data && res.end(data)
    })
})