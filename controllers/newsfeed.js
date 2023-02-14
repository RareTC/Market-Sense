const Ticker = require('../models/ticker');
const Home = require('../models/home');
const Newsfeed = require('../models/newsfeed')

const token =process.env.STOCKDATA_TOKEN;
const ROOT_URL='https://api.stockdata.org/v1/news/all'

module.exports = {
    index
}; 

async function index(req, res) {
    const symbol = req.query.symbol;
    // if (!symbol) return res.render('tickers', { symbol: null })
    try {
        const newsData = await fetch(`${ROOT_URL}?symbols=${symbol}&filter_entities=true&api_token=${token}`)
        .then(res => res.json()) 
        .then(data => data.data)
        const err = null
        res.render('newsfeed/index', { newsData, title: 'Relevant News', err});
        console.log(newsData.title)
    } catch (err) {
        const newsData = null
        res.render('newsfeed/index', { newsData, title: 'Relevant News' });
    }
};



