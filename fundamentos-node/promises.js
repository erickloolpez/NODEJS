function hi(name) {
    return new Promise(function(resolve, reject){
    setTimeout(() => {
        console.log('Hello ' + name)
        resolve(name)
    }, 3000)

    })
}

function bye(name) {
    return new Promise(function(resolve, reject){
    setTimeout(() => {
        console.log('Bye '+ name)
        resolve(name)
    }, 2000)
    })
}

function talk(callback) {
    setTimeout(() => {
        console.log('bla bla bla')
        callback()
    }, 1000)
}

console.log('Start the process')
hi('Erick')
    .then((name)=>{
        return bye(name)
    })
    .then(()=>{
        console.log('Ending process')
    })
    .catch(error =>{
        console.log('Exist an error')
        console.log(error)
    })