'use strict';
const conditionJson = require('../../db/conditions.json');

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up (queryInterface, Sequelize) {

    const conditions = conditionJson.map(condition => ({
      name: condition.name,
      createdAt: new Date(),
      updatedAt: new Date()
    }));
    
      await queryInterface.bulkInsert('Conditions', conditions, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Conditions', null, {});
  }
};
