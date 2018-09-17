// var ObjectID = require('mongodb').ObjectID;
var mongoose = require('mongoose');
var VeggiesSchema = new mongoose.Schema({
    key:Number,
    name: String,
    stock: Number,
    our_price : Number,
    market_price : Number,
    details: String,
    type: Boolean,
    product_img : String,
    veggies_imgs: String,
    reviews :  String,
    rating : Number     
});
mongoose.model('Veggies',VeggiesSchema);
module.exports = mongoose.model('Veggies');