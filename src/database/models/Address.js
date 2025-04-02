'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Address extends Model {

    static associate(models) {
      // define association here
      Address.belongsTo(models.User, {
        as: 'address',
        foreignKey: 'userId'
      });
    }
  }
  Address.init({
    province: DataTypes.STRING,
    city: DataTypes.STRING,
    code: DataTypes.STRING,
    street: DataTypes.STRING,
    number: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Address',
  });
  return Address;
};