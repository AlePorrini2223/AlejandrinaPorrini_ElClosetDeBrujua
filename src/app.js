var createError = require('http-errors'); // modulos
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session'); 
const userCookie = require('./middlewares/usersCookie');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var productsRouter = require('./routes/products');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));

// middleware session
app.use(session({
  secret: 'hacelocircular',
  resave: false,
  saveUninitialized: true,  //guarda la sesión aunque no se haya inicializado
}));

// middleware de cookie
app.use(userCookie);

// middleware de locals
app.use((req, res, next) => {
  if(req.session.userLogin){
    res.locals.userLogin = req.session.userLogin;
  }
  next();
})

// rutas
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/products', productsRouter);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

console.log('***** pagina corriendo en: http://localhost:3000 *****');

module.exports = app;
