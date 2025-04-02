var express = require('express');
var router = express.Router();
const {register, login, profile} = require('../controllers/usersControllers');
//const registerValidator = require('../validations/registerValidator');


/* GET users listing. */

router.get('/register', register);
//router.post('/register', registerValidator);

router.get('/login', login);

router.get('/profile', profile);



module.exports = router;
