// var ObjectID = require('mongodb').ObjectID;
var mongoose = require('mongoose');
var FruitsSchema = new mongoose.Schema({
    key:Number,
    name: String,
    stock: Number,
    our_price : Number,
    market_price : Number,
    details: String,
    type: Boolean,
    product_img : String,
    fruit_imgs: String,
    reviews :  String,
    rating : Number   
});
mongoose.model('Fruits',FruitsSchema);
module.exports = mongoose.model('Fruits');