var db = require('../models/db');
var Veggies = require('../models/veggies');

exports.getAllVeggies = function(req, res, next) {
    Veggies.find({},function(err,veggies){
        if (err) return res.status(500).send("There was a problem finding the veggies.");            
            //res.status(200).send(veggies);
            res.json(veggies);
    });    
};
exports.getVeggiesById = function(req, res, next) {    
    Veggies.findOne({"_id":req.params.id},function(err,veggies){
        if (err) return res.status(500).send("There was a problem finding the veggies.");            
            //res.status(200).send(veggies);
            res.json(veggies);
    }); 
};


exports.PostVeggies = function(req,res,next){
    var veggiesData = new Veggies(req.body);
    veggiesData.save()
    .then(item => {
        res.status(200).send("veggies data saved to database");
    })
    .catch(err => {
    //res.status(400).send("unable to save fruits data to database");
    res.json(item);
    });
}


exports.UpdateVeggiesById = function(req,res,next){
    var veggiesData = new Veggies(req.body);
    Veggies.findOneAndUpdate({"_id": req.params.id},req.body, {new: true},function(err,veggies){
        if (err) return res.status(500).send("There was a problem updating the veggies.");            
        res.json(veggies);        
    }); 
}

exports.DeleteVeggies = function(req,res,next){
    Veggies.findOneAndRemove({"_id":req.params.id},function(err,veggies){
        if (err) throw err;
        res.json({ message: 'Product successfully deleted',statusCode:'4' });
    })
}