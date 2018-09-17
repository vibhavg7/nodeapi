// var ObjectID = require('mongodb').ObjectID;
var mongoose = require('mongoose');
var ProductsSchema = new mongoose.Schema({
    key:Number,
    category_ids:[{
        type: Number
    }],
    combo : String,
    available_quantity_type : String,
    combo_description : String,
    main_category_name : String,
    // sub_category_name: String,
    product_name :  String,
    product_name_hindi : String,
    stock: Number,
    our_price : Number,
    market_price : Number,
    landing_price : Number,
    orignal_weight : Number,
    orignal_our_price : Number,
    orignal_market_price : Number,
    available_multiple_quantity : String,
    quantity_available: [{
        type: String
    }],
    details: String,
    //1->Fruits, 2-> Vegetable 3-> Daily Products 4 -> Spices 5 -> Dry Fruits 6 -> Gym Products
    product_type: Number,
    product_img : String,    
    reviews :  String,
    rating : Number,
    seller_id : String,
    status : Number   
});
mongoose.model('Products',ProductsSchema);
module.exports = mongoose.model('Products');