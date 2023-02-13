const Ticker = require('../models/ticker');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = {
    create, 
    delete: deleteReview
}

// function create(req, res) {
//     Ticker.find(  , function(err, ticker) {
//         req.body.user = req.user._id;
//         req.body.uderName = req.user.name;
//         req.body.userAvatar = req.user.avatar;
//         ticker.reviews.push(req.body);
//         ticker.save(function(err) {
//             res.redirect(`/tickers/${}`);
//         });
//     });
// }

function deleteReview(req, res, next) {
    
}


module.exports = mongoose.model('Review', reviewSchema);