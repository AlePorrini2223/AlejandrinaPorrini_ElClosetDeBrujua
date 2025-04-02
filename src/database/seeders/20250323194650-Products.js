'use strict';
const { randomNumber } = require('../../utils');
const productsJson = require('../../db/products.json');
const products = productsJson.map(({nameProduct, description, detailedDescription, condition, stuff, size, price}) => {
  return {
    nameProduct,
    description,
    detailedDescription,
    condition,
    stuff,
    categoryId: randomNumber(7),
    size,
    price,
    createdAt : new Date,
    updatedAt : new Date,
  }
})

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.bulkInsert("Products", products,
      {}
    );
  },

  async down (queryInterface, Sequelize) {

    await queryInterface.bulkDelete('Products', null, {});
  }
};

