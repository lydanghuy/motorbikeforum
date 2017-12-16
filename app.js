var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var FileStore = require('session-file-store')(session);
var passport = require('passport');
var bcrypt = require('bcrypt-nodejs');
var async = require('async');
var crypto = require('crypto');
var nodemailer = require('nodemailer');
//var flash = require('connect-flash');
var authenticate = require('./authenticate');
var config = require('./config');

var index = require('./routes/index');
var users = require('./routes/users');
var threadRouter = require('./routes/threadRouter');


const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

const Threads = require('./database/thread');


const url = config.mongoUrl;
const connect = mongoose.connect(url,{
  useMongoClient : true
});

connect.then((db) =>{
  console.log('Connected correctly to server');

}, (err) =>{
  console.log(err);
});


var app = express();
app.use(express.static(path.join(__dirname, 'client/build')));

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));



app.use(passport.initialize());



//app.use('/api', index);
app.use('/api/users', users);


//app.use(express.static(path.join(__dirname, 'public')));

//url thread
app.use('/api/threads', threadRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
