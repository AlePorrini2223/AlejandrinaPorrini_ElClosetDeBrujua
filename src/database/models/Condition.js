'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Condition extends Model {

    static associate(models) {

      Condition.hasMany(models.Product, {
      as: 'product',
      foreignKey: 'conditionId'
    });
    }
  }
  Condition.init({
    name: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Condition',
  });
  return Condition;
};