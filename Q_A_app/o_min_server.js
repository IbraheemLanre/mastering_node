const http = require('http')
const fs = require('fs')
const url = require('url')

http.createServer(function (req, res) {
    var parsedURL = url.parse(req.url, true)
    var pathname = parsedURL.pathname
    var args = pathname.split('/')
    var method = args[1]

    if (method === "login") {
        res.writeHead(200, {
            "Content-type": "text/event-stream",
            "Cache-Control": "no-cache",
            "Connection":"keep-alive"
        })

        res.write(":" + Array(2049).join(" ") + "\n")
        res.write("retry: 2000\n")

        res.on('close', function () {
            console.log('client disconnected')
        })

        setInterval(function () {
            res.write('data: ' + new Date() + "\n\n")
        }, 1000)

        return
    }

    if (method = "client") {
        fs.createReadStream("./o_min_client.html").pipe(res)
    }
}).listen(3000)