const express = require('express');
const router = express.Router();
const tickersCtrl = require('../controllers/tickers');
const ensureLoggedIn = require('../config/ensureLoggedIn');
const ticker = require('../models/ticker');


// const token =process.env.STOCKDATA_TOKEN;
// const ROOT_URL= 'https://api.stockdata.org/v1/data/quote';


//all routes start with /movies
//GET
router.get('/:ticker', ensureLoggedIn, tickersCtrl.show);

//API Data get request
router.get('/', tickersCtrl.index); 


module.exports = router;
