var express = require('express');
var router = express.Router();
const {index, admin, adminUsers, faq} = require('../controllers/indexControllers');
const adminSessionCheck = require('../middlewares/adminSessionCheck.js');

/* GET index page. */

router.get('/', index);;

router.get('/admin', admin);
router.get('/admin/users', adminUsers);


router.get('/faq', faq);

//router.get('/about', about);


module.exports = router;


