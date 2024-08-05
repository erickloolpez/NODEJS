const fs = require('fs')

let data = 'perrito'

let readableStream = fs.createReadStream(__dirname + '/input.txt')

readableStream.setEncoding('utf-8')//esta hacemos para no poner el toString()
readableStream.on('data', function(){ 
    console.log(data)
})


