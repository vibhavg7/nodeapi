// var ObjectID = require('mongodb').ObjectID;
var mongoose = require('mongoose');
var UservouchersSchema = new mongoose.Schema({    
    tokenId: String,
    voucherId: String,
    voucherPercentage :Number,    
    status: String,
    processed : String,
});
mongoose.model('Uservouchers',UservouchersSchema);
module.exports = mongoose.model('Uservouchers');