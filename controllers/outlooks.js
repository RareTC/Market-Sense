const Ticker = require('../models/ticker');

module.exports = {
    create, 
    delete: deleteOutlook
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

function deleteOutlook(req, res, next) {
    Ticker.findOne({'outlooks._id': req.params.id, 'outlooks.user': req.user._id}).then(function(ticker) {
        if(!ticker) return res.redirect('/tickers');
        ticker.outlooks.remove(req.params.id);
        ticker.save().then(function() {
            res.redirect(`/tickers/${ticker.ticker}`);
        }).catch(function(err) {
            return next(err);
        });
    });
}