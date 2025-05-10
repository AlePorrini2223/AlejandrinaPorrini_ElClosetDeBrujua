'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Size extends Model {

    static associate(models) {
      // define association here
    }
  }
  Size.init({
    name: DataTypes.STRING,
    allowNull: false,
  }, {
    sequelize,
    modelName: 'Size',
  });
  return Size;
};