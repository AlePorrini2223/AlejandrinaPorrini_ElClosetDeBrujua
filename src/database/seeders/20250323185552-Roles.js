"use strict";

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, Sequelize) {

    try {
      await queryInterface.bulkInsert("Roles", [
        {
          name: "admin",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "user",
          createdAt: new Date(),
          updatedAt: new Date()
        },
      ]);

      } catch (error) {
          return res.status(500).render('error', {
          message: error.message,
        })
      }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Roles', null, {});
  },
};
