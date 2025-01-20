const express = require('express');
const router = express.Router();
const {productCartl, productList, productDetail} = require('../controllers/productsControllers');


/* GET products listing. */

router.get('/', productList);

router.get('/:id/productDetail', productDetail);
router.get('/:nombre/productDetail', productDetail);

router.get('/productCartl', productCartl);


module.exports = router;