const boom = require('@hapi/boom');

// const getConnection = require('../libs/postgres');
// const pool = require('../libs/postgres.pool')
const { models } = require('../libs/sequelize')

class UserService {
  constructor() {
  }

  async create(data) {
    const newUser = await models.User.create(data)
    return {
      message: 'User Created Succesfully',
      newUser
    };
  }

  async find() {
    const rta = await models.User.findAll({
      include:['customer']
    })
    return rta
  }

  async findOne(id) {
    const user = await models.User.findByPk(id)
    if (!user) {
      throw boom.notFound('User not found.')
    }
    return user
  }

  async update(id, changes) {
    const user = await this.findOne(id)
    const rta = await user.update(changes)
    return {
      message: 'User Updated Succesfully',
      rta
    };
  }

  async delete(id) {
    const user = await this.findOne(id)
    await user.destroy()
    return {
      message: 'User Deleted Succesfully',
    };
  }
}

module.exports = UserService;