var express = require('express');
var router = express.Router();
const passport = require('passport');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('user', {User : 'user'});
});

router.get('/auth/google', passport.authenticate(
    // Which passport strategy is being used?
    'google',
    {
      scope: ['profile', 'email'],
      // Optional
      prompt: 'select_account'
    }
  ));

  router.get('/oauth2callback', function (req, res, next) {
    const redirectTo = req.session.redirectTo;
    delete req.session.redirectTo;
    passport.authenticate(
      'google',
      {
        successRedirect: redirectTo || '/', //-> replace '/' as desired
        failureRedirect: '/'
      }
    )(req, res, next);  // Call the middleware returned by passport
  });
  

module.exports = router;