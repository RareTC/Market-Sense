const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new Schema ({
        outlook: {
                type: String,
                enum: ['Long', 'Short']
        },
        timeframe: {
                type: String,
                enum: ['Weeks', 'Months', 'Years']
        },
        user: {
                type: Schema.Types.ObjectId,
                ref: 'User',
                required: true
        },
        userName: String,
        userAvatar: String
}, {
        timestamps: true
});
const tickerSchema = new Schema ({
        ticker: String,
        name: String,
        exchange: String,
        reviews : [reviewSchema]
});

module.exports = mongoose.model('Ticker', tickerSchema);