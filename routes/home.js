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
    successRedirect: '/',
    // Change to what's best for YOUR app
    failureRedirect: '/'
  }
));

router.get('/logout', function(req, res) {
  req.logout(function() {
    // Change path for your "landing" page
    res.redirect('/');
  });
});


router.get('/', function(req, res, next) {
  const ticker = req.query.ticker;
   if (!ticker) return res.render('tickers', {ticker : null })
   fetch(`${ROOT_URL}?symbols=${ticker}api_token=${token}`)
   .then(res => res.json())
   .then(userData => {
     res.render('tickers', {data});
   })
});

// router.get('/ticker', function(req, res, next) {
//   const ticker = req.query.ticker;
//   console.log(`ticker: ${ticker}`)
//   res.render('resource');
// });
module.exports = router;
