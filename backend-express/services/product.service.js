const { faker } = require('@faker-js/faker')
const  boom  = require('@hapi/boom')

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
        const newProduct = {
            id: '1',
            ...data,
        }

        this.products.push(newProduct)

        return {
            message: 'Product Create Successfully',
            rta: newProduct
        }
    }

    find() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(this.products)
            }, 2000)
        })

    }

    async findOne(id) {
        const product = this.products.find(item => item.id === id)
        if(!product){
            throw boom.notFound('Product not found')
        }

        return product
    }

    async update(id, changes) {
        const index = this.products.findIndex(item => item.id === id)
        if (index === -1) {
            throw boom.notFound('Product not found')
        }

        const product = this.products[index]
        this.products[index] = {
            ...product,
            ...changes
        }

        return {
            message: 'Product Update Succesfully',
            rta: this.products[index]
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