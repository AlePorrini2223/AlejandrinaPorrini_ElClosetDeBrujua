'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {

    static associate(models) {

      Product.belongsTo(models.Category, { // pertenece a una categoría
        as: 'category',
        foreignKey: 'categoryId'
      });

      Product.belongsTo(models.Section,{ // pertenece a una sección
        as: 'section',
        foreignKey: 'sectionId'
      });
      
      Product.hasMany(models.Image, { // tiene muchas imagenes
        as: 'images',
        foreignKey: 'productId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });
    }
  }
  Product.init({
    nameProduct: DataTypes.STRING,
    description: DataTypes.STRING,
    detailedDescription: DataTypes.STRING,
    condition: DataTypes.STRING,
    stuff: DataTypes.STRING,
    categoryId: DataTypes.INTEGER,
    size: DataTypes.STRING,
    price: DataTypes.INTEGER,
    sectionId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};