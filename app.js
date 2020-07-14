var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session');
const dotenv = require('dotenv');
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

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// paginas habilitadas al usuario
app.use(session({secret: 'cita_', resave: true, saveUninitialized: false, cookie:{maxAge: null}}));
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/registro',registroRouter);
app.use('/login',loginRouter);
app.use('/contacto',contactoRouter);
app.use('/citas',citasRouter);

/* Admin*/
app.use('/admin',adminIndexRouter);
app.use('/admin/citas',adminCitasRouter);

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

module.exports = app;
