const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const outlookSchema = new Schema ({
        position: {
                type: String,
                enum: ['Long', 'Short']
        },
        timeframe: {
                type: String,
                enum: ['Weeks', 'Months', 'Years']
        },
        strategy: {
                type: String
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
        ticker: { 
                type: String,
                unique: true
        },
        type: String,
        name: String,
        exchange: String,
        price: String,
        dayChange: String,
        yearHigh: String,
        yearLow: String,
        volume: String,
        outlooks : [outlookSchema]
}, {
        timestamps: true
});

module.exports = mongoose.model('Ticker', tickerSchema);