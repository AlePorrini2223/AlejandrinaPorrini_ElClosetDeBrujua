'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Stuff extends Model {

    static associate(models) {
    }
  }
  Stuff.init({
    name: DataTypes.STRING,
    allowNull: false,
  }, {
    sequelize,
    modelName: 'Stuff',
  });
  return Stuff;
};