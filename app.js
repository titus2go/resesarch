var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');
var signin_api = require('./routes/api/signin');
var getsurveyresult_api = require('./routes/api/getsurveyresult');
var submitsurvey_api = require('./routes/api/submitsurvey');
var getallsymptoms_api = require('./routes/api/getallsymptoms');
var signup_api = require('./routes/api/signup');
var getsurveyids_api = require('./routes/api/getsurveyids');
var getquestions_api = require('./routes/api/getquestions');
var getoptions_api = require('./routes/api/getoptions');
var getactions_api = require('./routes/api/getactions');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);
app.use('/api/signin', signin_api);
app.use('/api/getsurveyresult', getsurveyresult_api);
app.use('/api/submitsurvey', submitsurvey_api);
app.use('/api/getallsymptoms', getallsymptoms_api);
app.use('/api/signup', signup_api);
app.use('/api/getsurveyids', getsurveyids_api);
app.use('/api/getquestions', getquestions_api);
app.use('/api/getactions', getactions_api);
app.use('/api/getoptions', getoptions_api);

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


module.exports = app;
