const fs = require('fs');
const path = require ('path');

//const categories = require('../db/categories.json');
//const { toThousand, paginator } = require('../utils/index');
const db = require('../database/models');
const { readJson} = require('../utils/fs');


const indexController = {

   index: async (req,res) => {

      try {
         const productosCloset = await db.Product.findAll({
            include : ['images']
         });
         //res.send(products);
         res.render('home', 
         {
            productosCloset
         });
      } catch (error) {
         console.error('Error fetching:', error);
         return res.status(500).send('Error in database');
      }
   
   /* 
   !!!!!!!!!!
   NO HE PODIDO CREAR LA BASE DE DATOS CON SEQUELIZE, NI CONECTARLO CON WORKBENCH
   LUEGO DE INSTALAR TODAS LAS DEPENDENCIAS E INTENTAR CREAR LA BASE DE DATOS, 
   ME SALE EL ERROR: "ERROR: Please install mysql2 package manually"
   !!!!!!!!!
   */

   /*

   */



   },

   admin: (req,res,next) => {

      const productosCloset = readJson('../db/products.json');
      const product = productosCloset.find(product => product.id == req.params.id);

      return res.render('admin' , {
         title: "Listado de Productos",
         product,
         productosCloset,
      });
   },

   adminUsers : (req,res) => {
      //const users = readJson('../db/users.json');
      return res.render('users/usersAdmin')
   },

   faq: function (req, res, next) {
      res.send("Preguntas Frecuentes");
   }, 

      /*
   about: function (req, res, next) {
      res.send("vista sobre info About Us");
   },

   info: function (req, res, next) {
      res.send("vista info sobre Moda Circular")
    */

}

module.exports = indexController;