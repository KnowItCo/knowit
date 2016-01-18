var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var session = require('express-session');
var secrets = require('./../secrets');

// Setting API keys
if (process.env.NODE_ENV === 'production') {
  var FACEBOOK_APP_ID = process.env.FACEBOOK_APP_ID;
  var FACEBOOK_APP_SECRET = process.env.FACEBOOK_APP_ID;
  var CALLBACK_URL = 'https://ourKnowitapp.com/auth/facebook/callback'; // TODO
} else {
  // Using Dev Credentials
  var FACEBOOK_APP_ID = secrets.FACEBOOK_APP_ID;
  var FACEBOOK_APP_SECRET = secrets.FACEBOOK_APP_SECRET;
  var CALLBACK_URL = 'http://localhost:8888/auth/facebook/callback';
}

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
    clientID: FACEBOOK_APP_ID,
    clientSecret: FACEBOOK_APP_SECRET,
    callbackURL: CALLBACK_URL
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

module.exports = passport;
