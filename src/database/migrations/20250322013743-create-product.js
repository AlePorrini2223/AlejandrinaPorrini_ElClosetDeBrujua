'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Products', {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nameProduct: {
        type: Sequelize.STRING,
        unique: true
      },
      description: {
        type: Sequelize.TEXT,
      },
      detailedDescription: {
        type: Sequelize.STRING(600)
      },
      conditionId: {
        type: Sequelize.INTEGER,
          references: {
          model: {
            tableName: 'Categories'
          },
          key: 'id'
        }
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
        type: Sequelize.INTEGER,
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
        type: Sequelize.DATE
      },
      updatedAt: {
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Products');
  }
};