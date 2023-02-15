const express = require('express');
const router = express.Router();
const outlooksCtrl = require('../controllers/outlooks');
const ensureLoggedIn = require('../config/ensureLoggedIn');

// POST 
router.post('/tickers/:id/outlooks', ensureLoggedIn, outlooksCtrl.create);
//DELETE 
router.delete('/outlooks/:id', ensureLoggedIn, outlooksCtrl.delete);

module.exports = router;