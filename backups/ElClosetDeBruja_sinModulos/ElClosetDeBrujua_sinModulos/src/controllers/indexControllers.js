const fs = require('fs');
const path = require ('path');

const { toThousand } = require('../utils/toThousand');
//const categories = require('../db/categories.json');
const { readJson, saveJson } = require('../utils/fs');


const indexController = {

   index: (req,res) => {

      console.log({
         userLogin : req.session.userLogin,
      });

      const productosCloset = readJson('../db/products.json');
      res.render('home', {
         productosCloset
      });
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