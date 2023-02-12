var express = require('express');
var router = express.Router();

const token =process.env.STOCKDATA_TOKEN;
const ROOT_URL= 'https://api.stockdata.org/v1/data/quote';

/* GET users listing. */
router.get('/', function(req, res, next) {
  const ticker = req.query.ticker;
   if (!ticker) return res.render('tickers', {ticker : null })
   fetch(`${ROOT_URL}?symbols=${ticker}api_token=${token}`)
   .then(res => res.json())
   .then(userData => {
     res.render('tickers', {data});
   })
});

module.exports = router;
