var db = require('../models/db');
var aboutus = require('../models/aboutus');



exports.getaboutusInfo = function(req, res, next) {
    aboutus.find({},function(err,aboutusinfo){
        if (err) return res.status(500).send("There was a problem finding the about is information.");            
            res.json(aboutusinfo);
    });    
};

exports.postaboutusInfo = function(req,res,next){
    var aboutusData = new aboutus(req.body);
    aboutusData.save()
    .then(item => {
        res.status(200).send("about us info successfully saved to database");
    })
    .catch(err => {    
        res.json(item);
    });
}
