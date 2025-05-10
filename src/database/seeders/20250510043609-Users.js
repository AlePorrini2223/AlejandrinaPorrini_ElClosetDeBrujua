'use strict';
const bcrypt = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */

module.exports = {

  async up (queryInterface, Sequelize) {

    await queryInterface.bulkInsert("Users",
      [
        {
          firtsName: 'Admin',
          lastName: 'Ejemplo',
          email: 'admin@ejemplo.com',
          password: bcrypt.hashSync(password, 10),
          token: null,
          validate: true,
          lock: false,
          rolId: 1,
          createdAt : new Date,
          updatedAt : new Date
        },
        {
          firtsName: 'User',
          lastName: 'Ejemplo',
          email: 'ejemplo.com',
          password: bcrypt.hashSync(password, 10),
          token: null,
          validate: true,
          lock: false,
          rolId: 2,
          createdAt : new Date,
          updatedAt : new Date
        },
      ],
      {}
    );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
