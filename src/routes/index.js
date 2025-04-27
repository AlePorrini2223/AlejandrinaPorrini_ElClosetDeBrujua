var express = require('express');
var router = express.Router();
const {index, admin, productsAdmin, usersAdmin, faq, about} = require('../controllers/indexControllers');
const adminSessionCheck = require('../middlewares/adminSessionCheck.js');


/* Routes */

router.get('/', index); //home 
router.get('/admin', admin); //admin
router.get('/admin/products'), productsAdmin; //admin products
router.get('/admin/users', usersAdmin); //admin users
//router.get('/faq', faq);
//router.get('/about', about);


module.exports = router;


