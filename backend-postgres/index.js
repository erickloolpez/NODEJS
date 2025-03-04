const express = require('express')
const cors = require('cors')
const routerApi = require('./routes/index')
const {logErrors,errorHandler, boomErrorHandler, ormErrorHandler} = require('./middlewares/error.handler')

const app = express()
const port = 3000

app.use(express.json())

const whitelist = ['http://localhost:8080','https://myapp.com']
const options = {
    origin:(origin, callback)=>{
        if(whitelist.includes(origin) || !origin){
            callback(null, true)
        }else{
            callback(new Error('No estas permitido.'))
        }

    }
}
app.use(cors(options))

app.get('/api/v1', (req, res) => {
    res.send('Hola mi server en express')
})
app.listen(port, () => {
    console.log('Mi port: ' + port)
})

routerApi(app)

app.use(logErrors)
app.use(ormErrorHandler)
app.use(boomErrorHandler)
app.use(errorHandler)


