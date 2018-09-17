// var ObjectID = require('mongodb').ObjectID;
var mongoose = require('mongoose');
var VouchersSchema = new mongoose.Schema({    
    codeName: String,
    available_count: Number,
    minimumorder : Number,
    expiry_date : String,
    location : String,
    description: String,
    savingPercentage: Number,
    couponValue: Number,
    couponValue : Number,
    CalculateByPercentage : Boolean,
    applied_using : Number,
    token: String,
    applicableForAll : Number,
    status: Number
});
mongoose.model('Vouchers',VouchersSchema);
module.exports = mongoose.model('Vouchers');