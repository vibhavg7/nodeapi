var db = require('../models/db');
var Billing = require('../models/billing');

exports.getBillingAddresses = function(req, res, next) {
    Billing.find({},function(err,address){
        if (err) return res.status(500).send("There was a problem finding the billing address.");            
            //res.status(200).send(fruits);
            res.json(address);
    });    
};

exports.getBillingAddressesById = function(req, res, next) {
    Billing.findOne({"_id":req.params.id},function(err,address){
        if (err) return res.status(500).send("There was a problem finding the address.");            
            //res.status(200).send(fruits);
            res.json(address);
    }); 
};

exports.getBillingAddressesByUserId = function(req,res,next){
    
    Billing.find({"userid":req.params.userid},function(err,address){
        if (err) return res.status(500).send("There was a problem finding the address.");            
            //res.status(200).send(fruits);
            res.json(address);
    }); 
}

exports.PostBillingAddress = function(req,res,next){
    var addressData = new Billing(req.body);
    addressData.save()
    .then(item => {
        res.status(200).send("Billing address successfully saved");
    })
    .catch(err => {
    //res.status(400).send("unable to save fruits data to database");
    res.json(item);
    });
}

exports.UpdateBillingAddressById = function(req,res,next){
    var addressData = new Billing(req.body);
    Billing.findOneAndUpdate({"_id": req.params.id},req.body, {new: true},function(err,address){
        if (err) return res.status(500).send("There was a problem updating the address.");            
        res.json(address);        
    }); 
}

exports.DeleteBillingAddress = function(req,res,next){
    Billing.findOneAndRemove({"_id":req.params.id},function(err,address){
        if (err) throw err;        
        res.json({ message: 'successfully deleted',statusCode:'4' });
    })
}