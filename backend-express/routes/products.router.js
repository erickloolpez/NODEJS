//Importaciones comunes
const express = require('express')
const router = express.Router()
const ProductsService = require('./../services/product.service')

//Validacion con Joi
const validatorHandler = require('../middlewares/validator.handler')
const { createProductSchema, updateProductSchema, getProductSchema } = require('../schemas/product.schema')

const service = new ProductsService()

//Metodos Get
router.get('/', async (req, res) => {
    const products = await service.find()
    res.json(products)

})

router.get('/:id',
    validatorHandler(getProductSchema, 'params'),
    async (req, res) => {
        const { id } = req.params
        const product = await service.findOne(id)
        res.json(product)

    })

router.get('/filter', (req, res) => {
    res.send('Yo soy un filter')
})


//Metodos POST
router.post('/',
    validatorHandler(createProductSchema,'body'),
     async (req, res) => {
    const body = req.body
    const newProduct = await service.create(body)

    res.json(newProduct)
})

//Metodos PUT
router.patch('/:id', 
    validatorHandler(getProductSchema, 'params'),
    validatorHandler(updateProductSchema, 'body'),
    async (req, res, next) => {
    try {
        const { id } = req.params
        const body = req.body

        const updateProduct = await service.update(id, body)
        res.json(updateProduct)
    } catch (error) {
        next(error)
    }
})

//Metodos DELETE

router.delete('/:id', async (req, res) => {
    const { id } = req.params

    const deleteProduct = await service.delete(id)

    res.json(deleteProduct)
})


module.exports = router