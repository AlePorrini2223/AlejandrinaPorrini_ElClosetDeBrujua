const express = require('express');
const router = express.Router();
const productValidator = require('../validations/productValidator');
const userSessionCheck = require('../middlewares/userSessionCheck');
const upload = require('../middlewares/uploadFiles');

const {list, detail, cart, add, create, edit, update, search, filter, remove} = require('../controllers/productsControllers');


/* Routes */

router
   .get('/', list) // Lista de productos
   .get('/:id/detail', detail) // Detalle de producto
   .get('/cart', cart) // Muestra el carrito de compras.....agregar userSessionCheck
   //.get('/cart/:id', cart) // Muestra el carrito de compras del usuario logueado.....agregar userSessionCheck
   .get('/add', add) // Renderiza el formulario de creación del producto.....agregar userSessionCheck
   .post('/add', upload.single('image'), productValidator, create) // Recibe los datos del fomulario luego de la validación
   .get('/edit/:id', edit) // Renderiza el formulario de edición del producto
   .put('/edit/:id', update) // Guarda edición del producto
   .get('/search/:id', search) // Busca un producto por términos
   .get('/category', filter) // Busca un producto por categoría
   .delete('/remove/:id', remove) // Elimina el producto
   

// Categoría del productos???
//router.get('/:categoria', list); 

module.exports = router;


