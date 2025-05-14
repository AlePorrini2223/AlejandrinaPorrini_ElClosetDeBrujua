'use strict';
const bcrypt = require('bcrypt');
const usersJson = ('../../db/user.json');

/** @type {import('sequelize-cli').Migration} */

module.exports = {

  async up (queryInterface, Sequelize) {

    const users = usersJson.map( (user) => {
      const { firtsName, lastName, email, password, token, validate, lock, role } = user;
  
      return {
          firtsName,
          lastName,
          email,
          password: bcrypt.hashSync(password, 10),
          token,
          validate,
          lock,
          roleId: role,
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
