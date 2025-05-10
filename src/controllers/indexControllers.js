//const fs = require('fs');
//const path = require ('path');
//const categories = require('../db/categories.json');
//const { toThousand, paginator } = require('../utils/index');
//const { readJson } = require('../utils/fs');
const db = require('../database/models');



const indexController = {

   index: async (req, res) => {

         try {
            const productosCloset = await db.Product.findAll({
               include : ['images']
            });

            res.render('home', { 
               productosCloset 
            });
            //res.send(products);

         } catch (error) {
            return res.status(500).render('error', {
               message: error.message,
         })
         }
      },

   admin: async (req, res) => {
      try {
         return res.render('admin', {
            title: 'Panel de Administración'
         });
      } catch (error) {
         return res.status(500).render('/error', {
            message: error.message,
      })
      }
   },

   usersAdmin: (req,res) => {
      return res.render( 'users/usersAdmin', {
         title: 'Panel de Administración de Usuarios'
      });
},

   productsAdmin : async (req,res) => {
      
      try {
         const productosCloset = await db.Product.findAll({
            include: [ 'images' ]
         });

         return res.render('products/productsAdmin' , {
            productosCloset
         });
      } catch (error) {
         return res.status(500).render('error', {
            message: error.message,
      })
      }

   //const productosCloset = readJson('../db/products.json');
   //const product = productosCloset.find(product => product.id == req.params.id);
   },


   faq: (req, res) => {
      return res.render('others/faq');
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