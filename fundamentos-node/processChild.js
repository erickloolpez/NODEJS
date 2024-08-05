const { exec, spawn } = require('child_process')

exec('node console.js', (err, stdout, sterr)=>{
    if(err){
        console.log(err)
        return false
    }
    console.log(stdout)
})

let process = spawn ('dir')

console.log(process.pid)//Para conocer el Id del proceso
console.log(process.connected)//Para saber si esta conectado

process.stdout.on('data', function(dta){
    console.log(dta.toString())
})

process.on('exit',()=>{
    console.log('The process finish.')
})