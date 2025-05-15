'use strict';
//const { randomNumber } = require('../../utils');
const productsJson = require('../../db/products.json');
const categoriesJson = require('../../db/categories.json');
const sectionJson = require ('../../db/section.json');
const conditionJson = require('../../db/conditions.json');


/** @type {import('sequelize-cli').Migration} */

module.exports = {
  
  async up(queryInterface, Sequelize) {

    const products = productsJson.map( (product) => {
      const { nameProduct, description, detailedDescription, condition, stuff, category, size, price, section } = product;
    
      const category_id = categoriesJson.find(cat => cat.name === category).id;
      const condition_id = conditionJson.find(con => con.name === condition).id;
      const section_id = sectionJson.find(sect => sect.name.toLowerCase() === section.toLowerCase()).id;
            
    return {
      nameProduct,
      description,
      detailedDescription,
      conditionId: condition_id,
      stuff,
      categoryId: category_id,
      size,
      price,
      sectionId: section_id,
      createdAt : new Date(),
      updatedAt : new Date(),
    }
});
    await queryInterface.bulkInsert('Products', products, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Products', null, {});
  }
};





