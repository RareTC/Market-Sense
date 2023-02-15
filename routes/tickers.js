const express = require('express');
const router = express.Router();
const tickersCtrl = require('../controllers/tickers');
const ensureLoggedIn = require('../config/ensureLoggedIn');

//GET
router.get('/:ticker', ensureLoggedIn, tickersCtrl.show);

//API Data get request
router.get('/', tickersCtrl.index); 

module.exports = router;
