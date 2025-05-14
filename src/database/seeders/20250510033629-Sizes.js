'use strict';

const sizesJson = require('../../db/sizes.json');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  
  async up (queryInterface, Sequelize) {
    
    const sizes = sizesJson.map(size => ({
      name: size.name,
      createdAt: new Date(),
      updatedAt: new Date()
    }));
    
      await queryInterface.bulkInsert('Sizes', sizes, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Sizes', null, {});
  }
};
