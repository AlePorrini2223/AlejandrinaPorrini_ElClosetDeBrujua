'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      firstName: {
        type: Sequelize.STRING(50),
      },
      lastName: {
        type: Sequelize.STRING(50),
      },
      password: {
        type: Sequelize.STRING,
      },
      email: {
        type: Sequelize.STRING,
      },
      avatar: {
        type: Sequelize.STRING
      },
      token: {
        type: Sequelize.STRING(20)
      },
      validated: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      lock: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      roleId: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'Roles',
          },
          key: 'id'
        }
      },
      createdAt: {
        type: Sequelize.DATE
      },
      updatedAt: {
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
};