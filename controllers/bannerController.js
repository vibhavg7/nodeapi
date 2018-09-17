var db = require('../models/db');
var Banners = require('../models/banners');
var jwt = require('jsonwebtoken');

exports.getAllBanners = function(req, res, next) {
    Banners.find({"status":"1"},function(err,banners){
        if (err) return res.status(500).send("There was a problem finding the banners.");            
            res.json(banners);
    });    
};

exports.getAllBannersByCity = function(req,res,next){
    UserVouchers.findOne({"_id":req.params.city},function(err,banners){
        if (err) return res.status(500).send("There was a problem finding the banners.");                        
            res.json(banners);
    }); 
}

exports.PostBanners = function(req,res,next){
    
}