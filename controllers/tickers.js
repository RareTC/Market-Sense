const Ticker = require('../models/ticker');
const Home = require('../models/home');

const token =process.env.STOCKDATA_TOKEN;
const ROOT_URL= 'https://api.stockdata.org/v1/data/quote';

module.exports = {
    show,
    new: newTicker,
    index
  
};

async function index(req, res) {
    const symbol = req.query.symbol;
    try {
        const tickerData = await fetch(`${ROOT_URL}?symbols=${symbol}&api_token=${token}`)
        .then(res => res.json()) 
        .then(data => data.data)
        const err = null
        const outlook = formatTickerData (tickerData) 
        console.log(outlook)
        Ticker.find({} , function(err, tickers) {
            console.log(tickers)
            outlook.forEach(o => {
                console.log(o.ticker)
                let document = Ticker.findOne({ 'ticker': o.ticker }, function(err, doc) {
                    if (!doc) {
                        console.log('working right')
                        const newTicker = new Ticker(o)
                        newTicker.save(function (err) {})
                    }
                })
            })
            res.render('tickers/index', { tickerData, title: 'ticker index page', err});
        });
    } catch (err) {
        const tickerData = null
        res.render('tickers/index', { tickerData, title: 'ticker index page' });
    }
};

function newTicker(req, res) {
    res.render('tickers/new'), {title: 'Add Ticker'}
}

function formatTickerData(data) {
    return data.map(t => ({
        ticker : t.ticker,
        name : t.name,
        exchange: t.exchange_short,
    
    }))
}

async function show(req, res) {
    const symbol = req.params.ticker;
    console.log('are we here?')
    try {
        const tickerData = await fetch(`${ROOT_URL}?symbols=${symbol}&api_token=${token}`)
        .then(res => res.json()) 
        .then(data => data.data)
        let ticker = tickerData[0];
        // console.log(tickerData)
        const outlook = Ticker.findOne({ticker:symbol}, function(err, doc){
            console.log(ticker, doc)
            res.render('tickers/show', { ticker, doc, title: symbol });
        });
    } catch (err) {
        console.log(err)
        const tickerData = null
        res.render('tickers/index', { tickerData, title: symbol });
    }
};
