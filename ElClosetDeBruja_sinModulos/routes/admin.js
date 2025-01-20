var express = require('express');
var router = express.Router();
const {admin, productAdd, productEdit} = require('../controllers/adminControllers');


/* GET admin table. */

router.get('/', admin);

router.get('/productAdd', productAdd);

router.get('/productEdit', productEdit);


module.exports = router;