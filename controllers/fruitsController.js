var db = require('../models/db');
//var Fruits = require('../models/fruits');
var counter = require('../models/counter');
var mongoose = require('mongoose');

exports.PostFruits = function(req,res,next){
    
    var FruitsSchema = new mongoose.Schema({
        //key:Number,
        name: String,
        stock: Number,
        our_price : Number,
        market_price : Number,
        details: String,
        type: Boolean,
        //product_img : String,
        fruit_imgs: String,
        //reviews :  String,
        //rating : Number   
    });    
    
    FruitsSchema.pre('save', function(next) {
        console.log(this)
        var doc = this;
        counter.findByIdAndUpdate({_id: 'entityId'}, {$inc: { seq: 1} }, function(error, counter)   {
            if(error)
                return next(error);
            doc.testvalue = counter.seq;
            next();
        });
    });    
    var Fruits1;    
    try {
        Fruits1 = mongoose.model('Fruits1')
      } catch (error) {
        Fruits1 = mongoose.model('Fruits1', FruitsSchema)
    }    
    var fruitsData = new Fruits1(req.body);   
    fruitsData.save(function(error, animals) { 
        res.json({ statusCode: 200, status :"User voucher successfully applied" ,voucher:animals._id});        
    });
    
}
