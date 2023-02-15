const express = require('express');
const router = express.Router();
const outlooksCtrl = require('../controllers/outlooks');
const ensureLoggedIn = require('../config/ensureLoggedIn');

// POST 
router.post('/tickers/:id/outlooks', ensureLoggedIn, outlooksCtrl.create);

module.exports = router;