'use strict';

const { ProductSchema, PRODUCT_TABLE } = require('../models/products.model')
const { CategorySchema, CATEGORY_TABLE } = require('../models/category.model')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable(CATEGORY_TABLE, CategorySchema)
    await queryInterface.createTable(PRODUCT_TABLE, ProductSchema)
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable(CATEGORY_TABLE)
    await queryInterface.dropTable(PRODUCT_TABLE)
  }
};
