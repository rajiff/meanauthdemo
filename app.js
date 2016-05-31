var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var mongoose = require('mongoose');
var passport = require('passport');
var flash = require('connect-flash');
var expressSession = require('express-session');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cookieParser());

app.use(expressSession({
    secret: 'MEAN Auth Demo',
    cookie: {
        maxAge: 360000
    },
    resave: false,
    saveUninitialized: false
    /*,
  store: new mongoStore({
      url: config.db,
      collection : 'sessions'
    })*/
}));

//==== Static Folders =====
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'bower_components')));

//====== Auth ======
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

require('./config/appconfig');
require('./config/appauth')(app, passport);
require('./config/routes')(app, passport);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

app.onStart = function(addr) {
    //Connect to DB
    // mongoose.connect(config.db, function(err) {
    //   if(err) {
    //     console.log(err);
    //     throw err;
    //   }
    // });

    console.log('MEAN Auth Demo app is now running @ port ' + addr.port);
}


module.exports = app;