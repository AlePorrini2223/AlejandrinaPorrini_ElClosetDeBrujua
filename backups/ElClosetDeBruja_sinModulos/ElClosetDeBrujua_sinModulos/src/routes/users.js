var express = require('express');
var router = express.Router();
const {register, processRegister, login, processLogin, profile, userAdmin} = require('../controllers/usersControllers');
const userSessionCheck = require('../middlewares/userSessionCheck');
//const registerValidator = require('../validations/registerValidator');


/* GET users listing. */

router.get('/register', register);
router.post('/register', processRegister);
//router.post('/register', registerValidator);

router.get('/login', login);
router.post('/login', processLogin);

router.get('/profile', userSessionCheck, profile);

router.get('/userAdmin', userAdmin);



module.exports = router;
