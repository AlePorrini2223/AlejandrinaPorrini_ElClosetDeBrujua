var express = require('express');
var router = express.Router();
const {index, admin, productsAdmin, usersAdmin, faq, about, send} = require('../controllers/indexControllers');
const adminSessionCheck = require('../middlewares/adminSessionCheck.js');


/* Routes */

router
   .get('/', index) //home 
   .get('/admin', admin) //admin ...agregar adminSessionCheck
   .get('/admin/products', productsAdmin) //admin products
   .get('/admin/users', usersAdmin) //admin users ...agregar adminSessionCheck
   .get('/faq', faq) //otras vistas: preguntas frecuentes
   .get('/about', about) //otras vistas: sobre nosotros 
   .get('/regret', send) //otras vistas: botón de arrepentimiento, envía una solicitud/reclamo
   //.post('/regret', receive) //otras vistas: botón de arrepentimiento, recibe una solicitud/reclamo


module.exports = router;

