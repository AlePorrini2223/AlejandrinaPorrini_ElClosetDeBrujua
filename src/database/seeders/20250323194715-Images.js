'use strict';

const imagesJson = require('../../db/products.json')

/** @type {import('sequelize-cli').Migration} */
module.exports = {

  async up (queryInterface, Sequelize) {

    const images = [];

    imagesJson.forEach(product => {
      images.push({
        file: product.image,
        productId: product.id,
        createdAt: new Date(),
        updatedAt: new Date()
    });
  });

    await queryInterface.bulkInsert("Images", images, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Images', null, {});
  }
};



