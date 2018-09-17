// var ObjectID = require('mongodb').ObjectID;
var mongoose = require('mongoose');
var CartSchema = new mongoose.Schema({
    key:Number,
    sessionId : String,
    tokenId : String,
    product:String,    
    status : String  
});
mongoose.model('Cart',CartSchema);
module.exports = mongoose.model('Cart');