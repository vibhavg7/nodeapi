var db = require('../models/db');
var contactus = require('../models/contactus');



exports.getContactInfo = function(req, res, next) {
    contactus.find({},function(err,contactinfo){
        if (err) return res.status(500).send("There was a problem finding the contacts.");            
            //res.status(200).send(fruits);
            res.json(contactinfo);
    });    
};


exports.postContactInfo = function(req,res,next){
    var contactusData = new contactus(req.body);
    contactusData.save()
    .then(item => {
        res.status(200).send("contactus info successfully saved to database");
    })
    .catch(err => {
    //res.status(400).send("unable to save fruits data to database");
    res.json(item);
    });
}
