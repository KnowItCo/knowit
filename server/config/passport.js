var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var session = require('express-session');
var secrets = require('./../secrets');
var db = require('./../db/config').db;
var sqlAddUser = require('./../db/queries').sqlAddUser;
var sqlFindUser = require('./../db/queries').sqlFindUser;

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
    callbackURL: secrets.CALLBACK_URL,
    profileFields: ['emails', 'name']
  },
  function(accessToken, refreshToken, profile, done) {
    console.log(profile);
    // asynchronous verification, for effect...
    process.nextTick(function () {
      return db.query(sqlFindUser, { email: profile.emails[0].value })
        .then(function(user) {
          console.log(user);
          if (user[0] !== undefined) {
            return user;
          } else {
            db.query(sqlAddUser, { firstname: profile.name.givenName, lastname: profile.name.familyName, email: profile.emails[0].value });

            return db.query(sqlFindUser, { email: profile.emails[0].value });
          }
        })
        .then(function(user) {
          return done(null, user);
        })
        .catch(function(error) {
            throw new Error('Welp, we had an error processing you.' + error);
        });

    });
  }
));

module.exports = passport;
