'use strict';
//const { randomNumber } = require('../../utils');
const productsJson = require('../../db/products.json');
const products = productsJson.map(({ nameProduct, description, detailedDescription, condition, stuff, category, size, price, section }) => {
  return {
    nameProduct,
    description,
    detailedDescription,
    condition,
    stuff,
    categoryId: category,
    size,
    price,
    sectionId: section,
    createdAt : new Date(),
    updatedAt : new Date(),
  }
});

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Products', products, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Products', null, {});
  }
};





