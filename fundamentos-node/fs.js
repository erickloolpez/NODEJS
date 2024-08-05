const fs = require('fs')

function read(path, cb){
    fs.readFile(path,(err, data)=>{
        console.log(data.toString())
    })
}

function write(path,text, cb){
    fs.writeFile(path,text, function(err){
        if(err){
            console.log('I cant write on this file.')
        }else{
            console.log('Content File writed correctly.')
        }
    })
}

function deleteFile(path, cb){
    fs.unlink(path,cb)
}

deleteFile(__dirname + '/fileOne.txt',console.log)
// write(__dirname + '/fileOne.txt','I am a new file',console.log)
// read(__dirname + '/file.txt')