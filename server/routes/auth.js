var passport = require('./../config/passport');
var authMiddleware = require('./../config/authMiddleware');

module.exports = function(app) {
  app.post('/login', function(req, res){
    res.send('Hello');
  });

  // GET /auth/facebook
  // Use passport.authenticate() as route middleware to
  // authenticate the request. The first step in Facebook
  // authentication will involve redirecting the user to
  // facebook.com.  After authorization, Facebook will redirect
  // the user back to this application at /auth/facebook/callback
  app.get('/facebook',
    passport.authenticate('facebook', { scope: 'email' }),
    function(req, res){
      // The request will be redirected to Facebook for authentication, so this
      // function will not be called.
    });

  // GET /auth/facebook/callback
  // Use passport.authenticate() as route middleware to
  // authenticate the request. If authentication fails,
  // the user will be redirected back to the login page.
  // Otherwise, the primary route function function will be called,
  // which, will redirect the user to the profile page.
  app.get('/facebook/callback',
    passport.authenticate('facebook', { failureRedirect: '/' }), function (req, res) {
      res.redirect('/');
    });

  app.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
  });

  app.get('/checkAuth', function(req, res) {
    if (req.isAuthenticated()) {
      res.json({"message":"success", "email": req.user[0].email });
    } else {
      res.status(404).json({ error: 'message' });
    }
  });
};
