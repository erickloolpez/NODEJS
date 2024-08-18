const { faker } = require('@faker-js/faker')
const boom = require('@hapi/boom')
const { models } = require('../libs/sequelize')
const { Op } = require('sequelize')


class ProductsService {
    constructor() {
        this.products = []
        this.generate()
    }

    async generate() {
        const limit = 10 //en caso de que no tenga valor pondra 10

        for (let i = 0; i < limit; i++) {
            this.products.push({
                id: faker.string.uuid(),
                name: faker.commerce.productName(),
                price: parseInt(faker.commerce.price(), 10),
                image: faker.image.url(),
            })
        }

    }

    async create(data) {
        const newProduct = await models.Product.create(data)
        return {
            message: 'Product Create Successfully',
            rta: newProduct
        }
    }

    async find(query) {
        const options = {
            include:['category'],
            where: {}
        }
        const {limit, offset, price, price_min, price_max} = query

        if(limit && offset){
            options.limit = limit
            options.offset = offset
        }

        if(price){
            options.where.price = price
        }

        if(price_min && price_max){
            options.where.price ={
                [Op.gte]: price_min,
                [Op.lte]: price_max
            }

        }

        const products = await models.Product.findAll(options)

        return {
            message:"This are all the products.",
            products
        }
    }

    async findOne(id) {
        const product = await models.Product.findByPk(id)

        if (!product) {
            throw boom.notFound('Product not found')
        }

        return {
            message: 'The product you find is there.',
            product
        }
    }

    async update(id, changes) {
        const productUpdated = await models.Product.update(changes,{
            where:{
                id
            }
        })

        if (!productUpdated) {
            throw boom.notFound('Product not found')
        }

        return {
            message: 'Product Update Succesfully',
            productUpdated
        }

    }

    async delete(id) {
        const index = this.products.findIndex(item => item.id === id)
        if (index === -1) {
            throw boom.notFound('Product not found')
        }

        this.products.splice(index, 1)
        return {
            message: 'Todo salio bien al eliminar.'
        }

    }

}

module.exports = ProductsService

