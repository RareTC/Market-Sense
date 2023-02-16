const Ticker = require('../models/ticker');
const Home = require('../models/home');
const ticker = require('../models/ticker');

const token = process.env.STOCKDATA_TOKEN;
const ROOT_URL= 'https://api.stockdata.org/v1/data/quote';

module.exports = {
    show,
    new: newTicker,
    index,
};

async function index(req, res) {
    const symbol = req.query.symbol.replaceAll(' ', '');
    try {
        const tickerData = await fetch(`${ROOT_URL}?symbols=${symbol}&api_token=${token}`)
        .then(res => res.json()) 
        .then(data => data.data)
        const err = null
        const outlook = formatTickerData (tickerData) 
        Ticker.find({} , function(err, tickers) {
            outlook.forEach(o => {
                let document = Ticker.findOne({ 'ticker': o.ticker }, function(err, doc) {
                    if (!doc) {
                        const newTicker = new Ticker(o)
                        newTicker.save(function (err) {})
                    }
                })
            })
            res.render('tickers/index', { tickerData, title: 'Results Page', err});
        });
    } catch (err) {
        const tickerData = null
        res.render('tickers/index', { tickerData, title: 'Results Page' });
    }
};

function newTicker(req, res) {
    //used to be tickers/new
    res.render('tickers/show'), {title: 'Add Ticker'}
}

async function show(req, res) {
    const symbol = req.params.ticker;
    try {
        let tickerDoc = await Ticker.findOne({ticker: symbol});
        console.log('looking at this console for now', tickerDoc)
        if (tickerDoc) {
            if (tickerDoc.updatedAt.toDateString() !== new Date().toDateString()) {
                const tickerData = await fetch(`${ROOT_URL}?symbols=${symbol}&api_token=${token}`) .then(res => res.json());
                tickerDoc = await Ticker.findOneAndUpdate({ticker: symbol}, formatTickerData(tickerData.data));
            }
        } else {
            const tickerData = await fetch(`${ROOT_URL}?symbols=${symbol}&api_token=${token}`) .then(res => res.json());
            tickerDoc = await Ticker.create(formatTickerData(tickerData.data));
        }
        res.render('tickers/show', { ticker: tickerDoc, title: symbol });
    } catch (err) {
        console.log(err)
        res.redirect('/');
    }
};

//helper function
function formatTickerData(data) {
    return data.map(t => ({
        ticker : t.ticker,
        name : t.name,
        exchange: t.exchange_short,
        price : t.price,
        dayChange : t.day_change,
        yearHigh : t['52_week_high'],
        yearLow : t['52_week_low'],
        volume : t.volume
    }))
}