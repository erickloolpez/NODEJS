async function hi(name) {
    return new Promise(function(resolve, reject){
    setTimeout(() => {
        console.log('Hello ' + name)
        resolve(name)
    }, 3000)

    })
}

async function bye(name) {
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

async function main(){
    let name = await hi('Erick')
    await bye(name)
}

main()