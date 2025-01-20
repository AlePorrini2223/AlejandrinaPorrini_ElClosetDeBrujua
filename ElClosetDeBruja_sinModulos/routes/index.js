var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('home', { title: 'El Closet de Brujua - Moda que circula' });
});

module.exports = router;
