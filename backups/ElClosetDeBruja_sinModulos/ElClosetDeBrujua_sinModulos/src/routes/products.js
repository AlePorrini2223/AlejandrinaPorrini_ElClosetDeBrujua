const express = require('express');
const router = express.Router();
const {list, detail, cartl, add, create, edit, update, remove} = require('../controllers/productsControllers');


/* GET products listing. */

// Read:
router.get('/', list);                      // lista de productos


//router.get('/:categoria', list);                       // categorías del productos
router.get('/:id/productDetail', detail);                // detalles de productos
//router.get('/:id/productDetail', cartl)                // compra del producto - carrito
//router.get('/search', search) 

// Create:
router.get('/productAdd', add);                    // formulario de creación del producto
router.post('/productAdd', create);                    // creación del producto luego de la validación

// Update:
router.get('/productEdit/:id', edit);                 // edición del producto
router.put('/productEdit/:id', update);               // guarda edición del producto

//Delete:
router.delete('/remove/:id', remove);                 // remover el producto


module.exports = router;


