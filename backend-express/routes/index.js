const express = require('express')
const productsRouter = require('./products.router')
const categoriesRouter = require('./categories.router')
const clientRouter = require('./clients.router')

function routerApi(app){
    const router = express.Router()
    app.use('/api/v1',router)
    router.use('/products',productsRouter)
    router.use('/categories',categoriesRouter)
    router.use('/clients',clientRouter)
}

module.exports = routerApi