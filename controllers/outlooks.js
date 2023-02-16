const Ticker = require('../models/ticker');

module.exports = {
    create, 
    delete: deleteOutlook,
    edit, 
    update,
};

function edit(req, res) {
    Ticker.findOne({'outlooks._id': req.params.id}, function(err, ticker) {
        const outlook = ticker.outlooks.id(req.params.id)
        res.render('outlooks/edit', {outlook, title: 'edit'})
        console.log(outlook)
    });
}

function update(req, res) {
    Ticker.findOne({'outlooks._id': req.params.id, 'outlooks.user': req.user._id}, function(err, ticker) {
        console.log(ticker, 'testing outlooks.id')
        let outlookSubDoc = ticker.outlooks.id(req.params.id)
        if(!outlookSubDoc.user.equals(req.user._id)) return res.redirect(`/tickers/${ticker._id}`);
        outlookSubDoc.strategy = req.body.strategy;
        ticker.save(function(err) {
            console.log(err)
            res.redirect(`/tickers/${ticker.ticker}`)
        });
    });
}


function create(req,res) {
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