var express = require('express');
var router = express.Router();
const {index, admin, productsAdmin, usersAdmin, faq, about} = require('../controllers/indexControllers');
const adminSessionCheck = require('../middlewares/adminSessionCheck.js');


/* Routes */

router
   .get('/', index) //home 
   .get('/admin', admin) //admin ...agregar adminSessionCheck
   .get('/admin/products', productsAdmin) //admin products
   .get('/admin/users', usersAdmin) //admin users ...agregar adminSessionCheck
//.get('/faq', faq);
//.get('/about', about);


module.exports = router;


