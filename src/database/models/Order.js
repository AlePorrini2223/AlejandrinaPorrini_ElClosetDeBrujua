'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {

    static associate(models) {
      // define association here
      Order.belongsTo(models.User, {
        as: 'user',
        foreignKey: 'userId'
      });

      Order.hasMany(models.Cart, {
        as: 'carts',
        foreignKey: 'orderId'
      });
    }
  }
  Order.init({
    userId: DataTypes.INTEGER,
    statusId: DataTypes.INTEGER,
    total: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};