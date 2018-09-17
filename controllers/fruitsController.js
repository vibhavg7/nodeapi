var db = require('../models/db');
var Fruits = require('../models/fruits');

exports.getAllFruits = function(req, res, next) {
    Fruits.find({},function(err,fruits){
        if (err) return res.status(500).send("There was a problem finding the fruits.");            
            //res.status(200).send(fruits);
            res.json(fruits);
    });    
};

exports.getFruitsById = function(req, res, next) {
    Fruits.findOne({"_id":req.params.id},function(err,fruits){
        if (err) return res.status(500).send("There was a problem finding the fruits.");            
            //res.status(200).send(fruits);
            res.json(fruits);
    }); 
};

exports.PostFruits = function(req,res,next){
    var fruitsData = new Fruits(req.body);
    fruitsData.save()
    .then(item => {
        res.status(200).send("fruits data saved to database");
    })
    .catch(err => {
    //res.status(400).send("unable to save fruits data to database");
    res.json(item);
    });
}

exports.UpdateFruitsById = function(req,res,next){
    var fruitsData = new Fruits(req.body);
    Fruits.findOneAndUpdate({"_id": req.params.id},req.body, {new: true},function(err,fruits){
        if (err) return res.status(500).send("There was a problem updating the fruits.");            
        res.json(fruits);        
    }); 
}

exports.DeleteFruits = function(req,res,next){
    Fruits.findOneAndRemove({"_id":req.params.id},function(err,fruits){
        if (err) throw err;        
        res.json({ message: 'Product successfully deleted',statusCode:'4' });
    })
}