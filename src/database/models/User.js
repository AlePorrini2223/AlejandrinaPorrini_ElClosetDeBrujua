'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {

    static associate(models) {

      User.belongsTo(models.Role, {
        as: 'role',
        foreignKey: 'roleId'
      });
    }
  }
  
  User.init({
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: DataTypes.STRING,
    email: DataTypes.STRING,
    avatar: DataTypes.STRING,
    token: DataTypes.STRING,
    validated: DataTypes.BOOLEAN,
    lock: DataTypes.BOOLEAN,
    roleId: {
      type:DataTypes.INTEGER,
      references: {
        model: 'Role',
        key: 'id'
      }
    } 
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};