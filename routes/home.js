var express = require('express');
var router = express.Router();
const passport = require('passport');
const token =process.env.STOCKDATA_TOKEN;
const ROOT_URL= 'https://api.stockdata.org/v1/data/quote';

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('home', { title: 'Market Sense' });
});

router.get('/auth/google', passport.authenticate(
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
    successRedirect: '/',
    failureRedirect: '/'
  }
));

router.get('/logout', function(req, res) {
  req.logout(function() {
    res.redirect('/');
  });
});

module.exports = router;
