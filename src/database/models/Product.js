'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {

    static associate(models) {

      Product.belongsTo(models.Category, { // pertenece a una categoría
        as: 'category',
        foreignKey: 'categoryId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });

      Product.belongsTo(models.Section,{ // pertenece a una sección
        as: 'section',
        foreignKey: 'sectionId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });

      Product.belongsTo(models.Condition, { // pertenece a una condicion
        as: 'condition',
        foreignKey: 'conditionId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
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
    nameProduct: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: { 
          msg: 'La descripción es requerida' },
          len: {
            args: [0,200],
            msg: 'La descripción debe tener hasta 200 caracteres'
          }
        },
    },
    detailedDescription: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: { 
          msg: 'La descripción detallada del producto es requerida' },
          len: {
            args: [0, 500],
            msg: 'La descripción debe tener hasta 500 caracteres'
          }
        },
    },
    conditionId:{
      type: DataTypes.INTEGER,
      references: {
        model: 'Condition',
        key: 'id'
      }
    },
    stuff: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: { 
          msg: 'Debes seleccionar una opción' },
        }
    },
    categoryId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Category',
        key: 'id'
      },
      validate: {
        isInt: {
          msg: 'La categoría debe ser un número válido'
        }
      }
    },
    size: {
      type: DataTypes.STRING,
    },
    price: {
      type: DataTypes.INTEGER,
      validate: {
        isInt: {
          msg: 'El precio debe ser un número entero'
        },
        min: {
          args: [0],
          msg: 'El precio no puede ser negativo'
        }
      }
    },
    sectionId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Section',
        key: 'id'
      },
      validate: {
        isInt: {
          msg: 'La sección debe ser un número válido'
        }
      }
    } 

  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};