const Ticker = require('../models/ticker');

module.exports = {
    create, 
    // delete: deleteReview
};

function create(req,res) {
    //findByOne returns review to first ticker in database
    //find gets me down to the const obj and errors at ticker.reviews.push bc it is undefined
    //findById does not run. 
    Ticker.findById(req.params.id, function(err, ticker) {
        req.body.user = req.user._id;
        req.body.userName = req.user.name;
        req.body.userAvatar = req.user.avatar;
        ticker.outlooks.push(req.body);
        ticker.save(function(err) {
            res.redirect(`/tickers/${ticker.ticker}`);
        });
    });
}