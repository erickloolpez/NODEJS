const bcrypt = require('bcrypt')

const password = '1234Segura'

bcrypt.hash(password,5, function(err, hash){//el numero 5 quiere decir las vueltas que le va a dar.
    console.log(hash)

    bcrypt.compare(password, hash, function(err, res){
        console.log(res)
    })
})