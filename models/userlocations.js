// var ObjectID = require('mongodb').ObjectID;
var mongoose = require('mongoose');
var UserlocationsSchema = new mongoose.Schema({
    key:Number,
    tokenId : String,
    firstname: String,
    lastname: String,
    location: String,    
    flatNumber: String,
    address: String,
    addresstype : String,    
    pincode : String,
    status : String,
    phone : String

});
mongoose.model('Userlocations',UserlocationsSchema);
module.exports = mongoose.model('Userlocations');