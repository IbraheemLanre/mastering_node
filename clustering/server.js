const http = require('http')
http.createServer((req, res) => {
    if (req.url === '/') {
        res.writeHead(200, {
            'content-type':'text/plain'
        })
        return res.end("Hello World")
    }

    res.end()
}).listen(8080, ()=>console.log('Server is up!'))