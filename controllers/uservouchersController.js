var db = require('../models/db');
var UserVouchers = require('../models/uservouchers');
var jwt = require('jsonwebtoken');
exports.getAllUserVouchers = function(req, res, next) {
    UserVouchers.find({},function(err,vouchers){
        if (err) return res.status(500).send("There was a problem finding the user vouchers.");            
            res.json(vouchers);
    });    
};

exports.getUserVoucherById = function(req,res,next){
    UserVouchers.findOne({"_id":req.params.id},function(err,voucher){
        if (err) return res.status(500).send("There was a problem finding the user voucher.");                        
            res.json(voucher);
    }); 
}

exports.PostUserVouchers = function(req,res,next){
    var token = req.body.tokenId;
    var payload = jwt.decode(token,"123");
    var voucherPercentage = req.body.voucherPercentage;
    var uservouchersData = new UserVouchers(req.body);
    uservouchersData.tokenId = payload;
    uservouchersData.save()
    .then(item => {
        res.json({ statusCode: 200, status :"User voucher successfully applied" ,voucher:item});        
        //res.status(200).send("user voucher successfully saved to database");
    })
    .catch(err => {    
    res.json(item);
    });
}