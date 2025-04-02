'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.belongsTo(models.Category, {
        as: 'category',
        foreignKey: 'categoryId'
      });

      Product.belongsTo(models.Section,{
        as: 'section',
        foreignKey: 'sectionId'
      });
      
      Product.hasMany(models.Image, {
        as: 'images',
        foreignKey: 'productId'
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