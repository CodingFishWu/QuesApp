var express = require('express');
var path = require('path');
var AV = require('leanengine')


var app = express();

app.use(express.static(path.join(__dirname, './www')));

AV.init({
  appId: 'tzT7Dtaokwu7gk8j38X8ttKc-gzGzoHsz',
  appKey: 'eJJ18UYMbpM1jmeeaBk83R8v',
  masterKey: 'K6kmsr07GJTMp5DAQCdzodrP'
});

app.use(AV.express());

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
