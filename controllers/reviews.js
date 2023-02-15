const Ticker = require('../models/ticker');

module.exports = {
    create, 
    // delete: deleteReview
};

function create(req,res) {
    Ticker.findById(req.params.id, function(err, ticker) {
        req.body.user = req.user._id;
        req.body.userName = req.user.name;
        req.body.userAvatar = req.user.avatar;
        ticker.reviews.push(req.params);
        ticker.save(function(err) {
            res.redirect(`/tickers/${ticker._id}`);
        });
    });
}