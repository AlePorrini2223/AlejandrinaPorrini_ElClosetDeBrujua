const express = require('express');
const router = express.Router();
const productValidator = require('../validations/productValidator');
const userSessionCheck = require('../middlewares/userSessionCheck');
const upload = require('../middlewares/uploadFiles');

const {list, detail, cart, add, create, edit, update, remove} = require('../controllers/productsControllers');


/* Routes */

router
   .get('/', list) // Lista de productos
   .get('/:id/productDetail', detail) // Detalle de producto
   .get('/:id/productDetail', userSessionCheck, cart) // Muestra el carrito de compras
   .get('/productAdd', userSessionCheck, add) // Renderiza el formulario de creación del producto
   .post('/productAdd', upload.single('img'), productValidator, create) // Recibe los datos del fomulario luego de la validación
   .get('/productEdit/:id', edit) // Renderiza el formulario de edición del producto
   .put('/productEdit/:id', update) // Guarda edición del producto
   .delete('/remove/:id', remove) // Elimina el producto
   

// Categoría del productos???
//router.get('/:categoria', list);   

// Busca el producto???
//router.get('/search', search) 

module.exports = router;


