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

   usersAdmin: async (req,res) => {

      try {
         const usersCloset = await db.User.findAll();

         return res.render( 'users/usersAdmin', {
            title: 'Panel de Administración de Usuarios',
            usersCloset,
         });
         
      } catch (error) {
         return res.status(500).render('error', {
            message: error.message,
      })
      }
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

   about: async (req, res, next) => {

      try {
         return res.render("others/aboutUs");

      } catch (error) {
         return res.status(500).render('error', {
            message: error.message,
      })
      }
   },

   send: async (req, res, next) => {

      try {
         return res.render("others/reclamo");

      } catch (error) {
         return res.status(500).render('error', {
            message: error.message,
      })
      }
   }
}

module.exports = indexController;