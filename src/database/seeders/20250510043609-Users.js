'use strict';
require('dotenv').config(); 
const bcrypt = require('bcrypt');
const usersJson = require('../../db/user.json');

/** @type {import('sequelize-cli').Migration} */

module.exports = {

  async up (queryInterface, Sequelize) {

    const users = usersJson.map( (user) => {
      const { firstName, lastName, email, password, token, validated, lock, role } = user;
  
      return {
          firstName,
          lastName,
          email,
          password: bcrypt.hashSync(process.env.PASSWORD_ADMIN, 10),
          token,
          validated,
          lock,
          roleId: role == 'admin' ? 1 : 2,
          createdAt : new Date(),
          updatedAt : new Date()
      }
  });
    await queryInterface.bulkInsert("Users", users, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
