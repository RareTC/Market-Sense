const express = require('express');
const router = express.Router();
const newsfeedCtrl = require('../controllers/newsfeed');
const newsfeed = require('../models/newsfeed');

const token =process.env.STOCKDATA_TOKEN;
const ROOT_URL='https://api.stockdata.org/v1/news/all'

//GET request from API for news
router.get('/', newsfeedCtrl.index); 


module.exports = router;
