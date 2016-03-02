// var webpack = require('webpack');
// var webpackDevMiddleware = require('webpack-dev-middleware');
// var webpackHotMiddleware = require('webpack-hot-middleware');
// var config = require('./webpack.dev.config');
var secrets = require('./server/secrets');
var path = require('path');
var express = require('express');
var session = require('express-session');
var passport = require('./server/config/passport');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var redis   = require("redis");
var RedisStore = require('connect-redis')(session);
var client  = redis.createClient();

// configure Express
var app = express();
var port = 8888;

var redisOptions = {
  host: 'localhost',
  port: 6379,
  client: client,
  ttl: 260,
};

// FOR DEV PURPOSES ONLY
// var compiler = webpack(config);
// app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }));
// app.use(webpackHotMiddleware(compiler));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());

// Config express sessions
app.use(session({
  secret: secrets.SESSION_SECRET,
  resave: true,
  saveUninitialized: false,
  cookie: { httpOnly: true, maxAge: 2419200000 },
  store: new RedisStore(redisOptions),
}));

// Inits passport sessions.
// NOTE: Even though we configure express.session() and
// passport.session(), there is really only one session,
// which is managed by Express. Passport piggy backs off the
// ExpressJS session to store data for authenticated users.
app.use(passport.initialize());
app.use(passport.session());

// Set up routes
var authRoute = express.Router();
var apiRoute = express.Router();

app.use('/auth', authRoute);
require('./server/routes/auth')(authRoute);

app.use('/api', apiRoute);
require('./server/routes/api')(apiRoute);

app.use(express.static(path.join(__dirname, 'public')));

// default catch all
app.use('*', function(req, res) {
  res.sendFile(path.join(__dirname + '/index.html'));
});

app.listen(port, function(error) {
  if (error) {
    console.error(error)
  } else {
    console.info("==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.", port, port)
  }
});
