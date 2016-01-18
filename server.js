var webpack = require('webpack');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');
var config = require('./webpack.config');
var path = require('path');
var express = require('express');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var expressSession = require('express-session');
var app = express();
var port = 8888;

var compiler = webpack(config);

app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }));
app.use(webpackHotMiddleware(compiler));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(function(req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// app.get('/stylesheets/lib/bootstrap.min.css', function (req, res) {
//   res.setHeader('text/css');
//   console.log('got here');
//   res.sendFile(path.join(__dirname, 'stylesheets/lib/bootstrap.min.css'));
// });
//
// app.get('/stylesheets/main.css', function (req, res) {
//   res.setHeader('text/css');
//   console.log('got here');
//   res.sendFile(path.join(__dirname, 'stylesheets/main.css'));
// });

app.listen(port, function(error) {
  if (error) {
    console.error(error)
  } else {
    console.info("==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.", port, port)
  }
});
