'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nameProduct: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING(500)
      },
      detailedDescription: {
        type: Sequelize.STRING(600)
      },
      condition: {
        type: Sequelize.STRING
      },
      stuff: {
        type: Sequelize.STRING
      },
      categoryId: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'Categories'
          },
          key: 'id'
        }
      },
      size: {
        type: Sequelize.STRING
      },
      price: {
        type: Sequelize.INTEGER
      },
      sectionId: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'Sections'
          },
          key: 'id'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Products');
  }
};