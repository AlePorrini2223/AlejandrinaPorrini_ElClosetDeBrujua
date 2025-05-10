'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {

    static associate(models) {
      // define association here
      Cart.belongsTo(models.User, {
        as: 'user',
        foreignKey: 'userId'
      });
      Cart.belongsTo(models.Product, {
        as: 'product',
        foreignKey: 'productId'
      });
      Cart.belongsTo(models.Order, {
        as: 'order',
        foreignKey: 'orderId'
      });
    }
  }
  Cart.init({
    quantity: DataTypes.INTEGER,
    status: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    productId: DataTypes.INTEGER,
    orderId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Cart',
  });
  return Cart;
};