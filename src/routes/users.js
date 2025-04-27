const express = require('express');
const router = express.Router();
const registerValidator = require('../validations/registerValidator');
const loginValidator = require('../validations/loginValidator');
const userSessionCheck = require('../middlewares/userSessionCheck');
const upload = require('../middlewares/uploadFiles');

const {register, processRegister, login, processLogin, profile, update, logout, removeUser} = require('../controllers/usersControllers');


/* Routes */

router
   .get('/register', register) // formulario de registro
   .post('/register', upload.single('avatar'), registerValidator, processRegister) // validación y registro del usuario
   .get('/login', login) // formulario de login
   .post('/login', loginValidator, processLogin) // validación y login del usuario
   .get('/profile/:id', userSessionCheck, profile) // datos del usuario logueado
   .put('/update/:id', upload.single('avatar'), update) // editar datos del usuario
   .get('/logout', logout) // cerrar sesión
   .delete('/remove/:id', removeUser) // eliminar usuario

module.exports = router;
