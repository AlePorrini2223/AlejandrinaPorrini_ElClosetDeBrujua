//const fs = require('fs');
//const path = require ('path');
//const categories = require('../db/categories.json');
//const { toThousand, paginator } = require('../utils/index');
//const { readJson } = require('../utils/fs');
const { Product, User } = require('../database/models');



const indexController = {

   index: async (req, res) => {

         try {
            const productosCloset = await Product.findAll({
               include : ['images']
            });
            res.render('home', { 
               productosCloset 
            });
            //res.send(products);

         } catch (error) {
            console.error('Error fetching:', error);
            return res.status(500).send('Error in database');
         }
   },

   admin: (req, res) => {
      return res.render('admin', {
         title: 'Panel de Administración'
      });
   },

   usersAdmin: (req,res) => {
      return res.render( 'users/usersAdmin', {
         title: 'Panel de Administración de Usuarios'
      });
},

   productsAdmin : async (req,res) => {
      
      try {
         const productosCloset = await Product.findAll({
            include : ['images']
         });
         return res.render('products/productsAdmin' , {
            productosCloset,
            Product
         });
      } catch (error) {
         console.error('Error al listar los productos:', error);
         res.status(500).send('Error in database');
      }

   //const productosCloset = readJson('../db/products.json');
   //const product = productosCloset.find(product => product.id == req.params.id);
   },

   /*
   faq: function (req, res, next) {
      res.send("Preguntas Frecuentes");
   }, 


   about: function (req, res, next) {
      res.send("vista sobre info About Us");
   },

   info: function (req, res, next) {
      res.send("vista info sobre Moda Circular")
    */

}

module.exports = indexController;