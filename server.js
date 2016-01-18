var webpack = require('webpack');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');
var config = require('./webpack.config');
var secrets = require('server/secrets');
var path = require('path');
var express = require('express');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var session = require('express-session');
var redis   = require("redis");
var RedisStore = require('connect-redis')(session);
var client  = redis.createClient();

// Passport session setup.
// To support persistent login sessions, Passport needs to be
// able to serialize users into and deserialize users out of
// the session. Typically, this will be as simple as storing
// the user ID when serializing, and finding the user by ID
//  when deserializing.
// TODO: pull from redis database
passport.serializeUser(function(user, done) {
  console.log('serializing user: ' + user);
  done(null, user);
});

// TODO: pull from redis database
passport.deserializeUser(function(obj, done) {
  done(null, obj);
});


// Use the FacebookStrategy within Passport.
// Strategies in Passport require a `verify` function,
// which accept credentials (in this case, an accessToken,
// refreshToken, and Facebook profile), and invoke a callback
// with a user object.
passport.use(new FacebookStrategy({
    clientID: secrets.FACEBOOK_APP_ID,
    clientSecret: secrets.FACEBOOK_APP_SECRET,
    callbackURL: "http://localhost:8888/auth/facebook/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    // asynchronous verification, for effect...
    process.nextTick(function () {

      // TODO: associate the Facebook account with a user
      // record in database, and return that user instead.
      return done(null, profile);
    });
  }
));

// configure Express
var app = express();
var port = 8888;

if (process.env.NODE_ENV === 'production') {
  var SESSION_SECRET = process.env.SESSION_SECRET;
} else {
  var SESSION_SECRET = secrets.SESSION_SECRET;
}

var redisOptions = {
  host: 'localhost',
  port: 6379,
  client: client,
  ttl: 260,
};

var compiler = webpack(config);
app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }));
app.use(webpackHotMiddleware(compiler));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(function(req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});
// Config express sessions
app.use(session({
  store: new RedisStore(redisOptions),
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { httpOnly: true, maxAge: 2419200000 }
}));

// Inits passport sessions.
// NOTE: Even though we configure express.session() and
// passport.session(), there is really only one session,
// which is managed by Express. Passport piggy backs off the
// ExpressJS session to store data for authenticated users.
app.use(passport.initialize());
app.use(passport.session());

app.get('/login', function(req, res){
  // send login page
});

// GET /auth/facebook
// Use passport.authenticate() as route middleware to
// authenticate the request. The first step in Facebook
// authentication will involve redirecting the user to
// facebook.com.  After authorization, Facebook will redirect
// the user back to this application at /auth/facebook/callback
app.get('/auth/facebook',
  passport.authenticate('facebook'),
  function(req, res){
    // The request will be redirected to Facebook for authentication, so this
    // function will not be called.
  });

// GET /auth/facebook/callback
// Use passport.authenticate() as route middleware to
// authenticate the request. If authentication fails,
// the user will be redirected back to the login page.
// Otherwise, the primary route function function will be called,
// which, in this example, will redirect the user to the profile page.
app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/profile');
  });

app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

// Set up routes
var authRoute = express.Router();
var apiRoute = express.Router();

app.use('/auth', authRoute);
require('../routes/auth')(authRoute);

app.use('/api', apiRoute);
require('../routes/api')(apiRoute);

app.listen(port, function(error) {
  if (error) {
    console.error(error)
  } else {
    console.info("==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.", port, port)
  }
});


// Simple route middleware to ensure user is authenticated.
//   Use this route middleware on any resource that needs to be protected.  If
//   the request is authenticated (typically via a persistent login session),
//   the request will proceed.  Otherwise, the user will be redirected to the
//   login page.
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login')
}

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
