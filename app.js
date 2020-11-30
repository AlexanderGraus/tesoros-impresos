var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
dotenv.config();

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const registroRouter = require('./routes/registro');
const loginRouter = require('./routes/login');
const contactoRouter = require('./routes/contacto');
const citasRouter = require('./routes/citas');
const adminCitasRouter = require('./routes/admin/adminCitas');
const adminIndexRouter = require('./routes/admin/adminIndex');
var app = express();

app.set('secretKey',process.env.SECRET_KEY);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// este coidgo es para poder comunicarme desde el localhost de angular al localhost de express
/** HEADER INICIO */
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin','*');
  res.setHeader('Access-Control-Allow-Methods','GET,POST,DELETE,PUT');
  next();
});
app.options("/*", function(req, res, next){
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With,x-access-token');
  res.sendStatus(200);
});
/** HEADER FIN */

// paginas habilitadas al usuario

app.use(session({secret: 'cita_', resave: true, saveUninitialized: false, cookie:{maxAge: null}}));
//cookie: cuanto dura una sesion
// secret: la forma de encriptar el dato.

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/registro',registroRouter);
app.use('/login',loginRouter);
app.use('/contacto',contactoRouter);
app.use('/citas',citasRouter);

/* Admin*/
app.use('/admin',validateUser,adminIndexRouter);
app.use('/admin/citas',validateUser,adminCitasRouter);

// en cada request privado me tiene que enviar el token
// lo vamos a recibir en header.
function validateUser(req,res,next){
  jwt.verify(req.headers['x-access-token'],req.app.get('secretKey'), function(err,decoded){
    if(err){
      res.json({message:err.message});
    }else{
      console.log('el decoded es '+decoded);
      // decoded esta la info que asocie al token
      // en cualquier servicio puedo acceer a tokenData
      req.body.tokenData = decoded;
      console.log(decoded);
      // continua con la soguiente funcion
      next();
    }
  });
}
app.validateUser = validateUser;
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
  res.json({code:err.code, mesg:err.message});
});

module.exports = app;
