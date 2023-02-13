const express = require('express');
const router = express.Router();
const tickersCtrl = require('../controllers/tickers');
const ensureLoggedIn = require('../config/ensureLoggedIn');
const ticker = require('../models/ticker');


const token =process.env.STOCKDATA_TOKEN;
const ROOT_URL= 'https://api.stockdata.org/v1/data/quote';

//GET /tickers/new
// router.get('/new', ensureLoggedIn, tickersCtrl.new);
// //POST
// router.post('/', ensureLoggedIn, tickersCtrl.create);

//API Data get request
router.get('/', tickersCtrl.index); 

//ttps://api.stockdata.org/v1/data/quote?symbols=AAPL&

module.exports = router;
