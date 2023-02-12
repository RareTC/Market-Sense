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
  
router.get('/oauth2callback', passport.authenticate(
    'google',
    {
        successRedirect: '/movies',
        // Change to what's best for YOUR app
        failureRedirect: '/movies'
    }
    ));

module.exports = router;