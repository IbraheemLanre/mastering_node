/**
 * A program to read a dictionary file listing 
 * common words into an array for processing
 */

const fs = require('fs')
const readline = require('readline')

let rl = readline.createInterface({
    input: fs.createReadStream('dict.txt'),
    terminal: false
})

let arr = []
rl.on('line', ln => {
    arr.push(ln.trim())
})

