// *** main dependencies *** //
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var http = require('http');
var passport = require('passport');
var session = require('express-session');
var flash = require('connect-flash');
var LocalStrategy = require('passport-local').Strategy;


// *** routes *** //
var routes = require('./routes/index.js');
var userInfo = require('./routes/userInfo.js');
var userActivity = require('./routes/userActivity.js');
var activityProperty = require('./routes/activityProperty.js');
var friends = require('./routes/friends.js');
var userChatRooms = require('./routes/userChatRooms.js');
var partners = require('./routes/findPartner.js');
var authRoutes = require('./routes/auth.js');


// *** express instance *** //
var app = express();


// *** static directory *** //
app.set('views', path.join(__dirname, 'views'));


// *** config middleware *** //
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../client')));
app.use(flash());
app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true
}));
app.use(function(req, res, next) {
  res.locals.sessionFlash = req.session.flash;
  delete req.session.flash;
  next();
});
app.use(passport.initialize());
app.use(passport.session());


// *** main routes *** //
app.use('/', routes);
app.use('/api/', userInfo);
app.use('/api/', userActivity);
app.use('/api/', activityProperty);
app.use('/api/', friends);
app.use('/api/', userChatRooms);
app.use('/api/', partners);
app.use('/auth/', authRoutes);
// app.use('/', function(req, res){
//   res.sendFile(path.join(__dirname, '../client/views', 'index.html'));
// console.log('after send to client');
// });


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


// *** error handlers *** //

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.send('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.send('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
