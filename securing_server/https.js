const https = require('https')
const fs = require('fs')
https.createServer({
    key: fs.readFileSync('myCA.key'),
    cert: fs.readFileSync('myCA.pem')
}, (req, res) => {
    
}).listen(8080)

let options = {
    key: fs.readFileSync('sunfun.test.key'),
    cert: fs.readFileSync('sunfun.test.crt'),
    ca: [fs.readFileSync('sunfun.test.ext')]
}


