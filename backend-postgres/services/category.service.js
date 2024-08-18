const boom = require('@hapi/boom');

const { models } = require('../libs/sequelize')

class CategoryService {

  constructor(){
  }
  async create(data) {
    const newCategory = await models.Category.create(data)
    return {
      message:'Category Created Succesfully.',
      newCategory
    };
  }

  async find() {
    const categories = await models.Category.findAll()

    return{
      message:'This are all the categories.',
      categories
    }
  }

  async findOne(id) {
    const category = await models.Category.findByPk(id,{
      include: ['products']
    })

    if(!category){
      throw boom.notFound('Category not found.')
    }
    return {
      message:`This are the category ${id}`,
      category, 
    }
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

module.exports = CategoryService;