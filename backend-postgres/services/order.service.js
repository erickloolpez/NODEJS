const boom = require('@hapi/boom');

const { models } = require('./../libs/sequelize');

class OrderService {

  constructor(){
  }

  async create(data) {
    const newOrder = await models.Order.create(data);
    return {
      message: 'Order Created Successfully.',
      newOrder
    };
  }

  async addItem(data) {
    const newItem = await models.OrderProduct.create(data)
    return{
      message: 'Your order-product created Successfully.',
      newItem
    }
  }

  async find() {
    const orders = await models.Order.findAll()
    return {
      message: 'This are all your orders.',
      orders
    }
  }

  async findOne(id) {
    const order = await models.Order.findByPk(id, {
      include: [
        {
          association: 'customer',
          include: ['user']
        },
        'items'
      ]
    });
    return {
      message: `This are your order with ID ${id}`,
      order
    };
  }

  async update(id, changes) {
    return {
      id,
      changes,
    };
  }

  async delete(id) {
    return { id };
  }

}

module.exports = OrderService;