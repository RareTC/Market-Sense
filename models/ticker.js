const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tickerSchema = new Schema ({
    data: {
        ticker: String,
        name: String,
        exchange: String,
        price: Number,
        yearHigh: Number,
        yearLow: Number,
        day_change: Number,
        volume: Number
    },
});

module.exports = mongoose.model('Ticker', tickerSchema);