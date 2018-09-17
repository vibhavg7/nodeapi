// var ObjectID = require('mongodb').ObjectID;
var mongoose = require('mongoose');
var BillingSchema = new mongoose.Schema({    
    userid : String,
    name: String,
    flatNumber: String,
    address :  String,
    status : Number,
});
mongoose.model('Billing',BillingSchema);
module.exports = mongoose.model('Billing');