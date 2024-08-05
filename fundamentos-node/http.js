const http = require('http')


http.createServer(function(req,res){
    console.log('new petition')
    console.log(req.url)

    res.write('Hi, now I know how to use HTTP in nodeJs')

    res.end()
}).listen(3000)

console.log('Listen on Port 3000')
