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

function talk(callback) {
    setTimeout(() => {
        console.log('bla bla bla')
        callback()
    }, 1000)
}

hi('Erick', function (name) {//Here start the code
    talk(function () {
        bye(name, () => {
            console.log('Bye ' + name)
        })
    })
})