const fork = require('child_process').fork
let cp = fork('./child.js')
cp.on('message', msgobj => {
    console.log(`Parent got message: ${msgobj.text}`)
})

cp.send({
    text: 'I love you'
})