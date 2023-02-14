const Ticker = require('../models/ticker');
const Home = require('../models/home');

const token =process.env.STOCKDATA_TOKEN;
const ROOT_URL= 'https://api.stockdata.org/v1/data/quote';

module.exports ={
    // create,
    // new: newTicker,
    // show,
    index
  
};

async function index(req, res) {
    const symbol = req.query.symbol;
    // if (!symbol) return res.render('tickers', { symbol: null })
    try {
        const tickerData = await fetch(`${ROOT_URL}?symbols=${symbol}&api_token=${token}`)
        .then(res => res.json()) 
        .then(data => data.data)
        const err = null
        res.render('tickers/index', { tickerData, title: 'ticker index page', err});
        console.log(tickerData)
    } catch (err) {
        const tickerData = null
        res.render('tickers/index', { tickerData, title: 'ticker index page' });
    }
};

// function create(req, res) {

// }

// function newTicker() {
    
// }

// function show(req, res) {
    
// }

//tickerData for each int he array create a new ticker with those attributes defined in the ticketSchema 