function hi(name, callback) {
    setTimeout(() => {
        console.log('Hello ' + name)
        callback(name)
    }, 3000)
}

function bye(name, callback) {
    setTimeout(() => {
        callback()
    }, 2000)
}

hi('Erick', function (name) {//Here start the code
    bye(name,()=>{
        console.log('Bye '+ name)
    })
})