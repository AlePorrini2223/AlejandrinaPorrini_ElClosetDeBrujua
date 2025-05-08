const express = require('express');
const router = express.Router();
const productValidator = require('../validations/productValidator');
const userSessionCheck = require('../middlewares/userSessionCheck');
const upload = require('../middlewares/uploadFiles');

const {list, detail, cartl, add, create, edit, update, remove} = require('../controllers/productsControllers');


/* Routes */

router
   .get('/', list) // Lista de productos
   .get('/:id/detail', detail) // Detalle de producto
   .get('/cartl/:id', cartl) // Muestra el carrito de compras.....agregar userSessionCheck
   .get('/add', add) // Renderiza el formulario de creación del producto.....agregar userSessionCheck
   .post('/add', upload.single('img'), productValidator, create) // Recibe los datos del fomulario luego de la validación
   .get('/edit/:id', edit) // Renderiza el formulario de edición del producto
   .put('/edit/:id', update) // Guarda edición del producto
   .delete('/remove/:id', remove) // Elimina el producto
   

// Categoría del productos???
//router.get('/:categoria', list);   

// Busca el producto???
//router.get('/search', search) 

module.exports = router;


