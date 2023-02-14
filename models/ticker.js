const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new Schema ({});
const tickerSchema = new Schema ({
        ticker: String,
        name: String,
        exchange: String,
        reviews : [reviewSchema]
});

module.exports = mongoose.model('Ticker', tickerSchema);