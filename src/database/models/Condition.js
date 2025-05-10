'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Condition extends Model {

    static associate(models) {
    }
  }
  Condition.init({
    name: DataTypes.STRING,
    allowNull: false,
  }, {
    sequelize,
    modelName: 'Condition',
  });
  return Condition;
};