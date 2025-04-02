'use strict';

const imagesJson = require('../../db/products.json');
const images = imagesJson.map(({id, img}) => {
  return {
    name: img,
    productId: id,
    createdAt : new Date,
    updatedAt : new Date,
  }
})

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.bulkInsert("images", images,
      {}
    );
  },

  async down (queryInterface, Sequelize) {

    await queryInterface.bulkDelete('images', null, {});
  }
};
