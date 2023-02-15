const Ticker = require('../models/ticker');

module.exports = {
    create, 
    // delete: deleteReview
};

function create(req,res) {
    Ticker.findOne(req.params.ticker, function(err, ticker) {
        console.log(req.params.ticker)
        req.body.user = req.user._id;
        req.body.userName = req.user.name;
        req.body.userAvatar = req.user.avatar;
        ticker.reviews.push(req.body);
        console.log(req.body)
        console.log(ticker.reviews)
        ticker.save(function(err) {
            res.redirect(`/tickers/${ticker.ticker}`);
        });
    });
}