const express = require('express')
const app = express()
const port = 3000

const {faker} = require('@faker-js/faker')

app.get('/', (req, res) => {
    res.send('Hola mi server en express')

})

app.get('/nueva-ruta', (req, res) => {
    res.send('Hola soy una nueva ruta.')

})



app.get('/categories/:categoryID/products/:productID', (req, res) => {
    const { categoryID, productID } = req.params
    res.json({
        name: 'Clothes',
        categoryID,
        productID,
    })

})

/*--------------------------------*/

app.get('/users', (req, res) => {
    const { limit, offset } = req.query

    if (limit && offset) {
        res.json({
            limit,
            offset
        })
    } else {
        res.send('No hay parametros.')
    }
})
app.get('/products', (req, res) => {
    const {size} = req.query
    const limit = size || 10 //en caso de que no tenga valor pondra 10
    const products = []

    for(let i =0 ; i < limit; i++){
        products.push({
            name:faker.commerce.productName(),
            price: parseInt(faker.commerce.price(),10),
            image:faker.image.url(),
        })
    }

    res.json(products)

})


app.listen(port, () => {
    console.log('Mi port: ' + port)
})