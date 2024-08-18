const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');

class CustomerService {

  constructor() {}

  async find() {
    const rta = await models.Customer.findAll({
      include: ['user']
    });
    return rta;
  }

  async findOne(id) {
    const user = await models.Customer.findByPk(id);
    if (!user) {
      throw boom.notFound('customer not found');
    }
    return user;
  }

  async create(data) {
    const newCustomer = await models.Customer.create(data,{
      include: ['user']
    });
    return {
      message: 'Customer Created Succesfully.',
      newCustomer
    };
  }

  async update(id, changes) {
    const model = await this.findOne(id);
    const rta = await model.update(changes);
    return {
      message: 'Customer Updated Succesfully.',
      rta,
    };
  }

  async delete(id) {
    const model = await this.findOne(id);
    await model.destroy();
    return {
      message: 'Customer Deleted Succesfully.',
    }
  }

}

module.exports = CustomerService;