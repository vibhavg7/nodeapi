var db = require('../models/db');
var Vouchers = require('../models/vouchers');
var jwt = require('jsonwebtoken');
var moment = require('moment');

exports.AllUserCoupons = function(req, res, next) 
{
    Vouchers.find({},function(err,vouchers){
        if (err) return res.status(500).send("There was a problem finding the vouchers data.");            
            //res.status(200).send(fruits);
            res.json(vouchers);
    });     
}

exports.getAllVouchers = function(req, res, next) {

    var token = req.params.tokenId;
    var payload = jwt.decode(token,"123");  
    var date1 = moment().utcOffset("+05:30").add(0, 'days').format();        
    Vouchers.find({
         $and: [
             {
                 "status":1
             },
             {
                expiry_date : { $gte : date1 }
             },
             {
                $or:[
                        {
                            "applicableForAll":1
                        },
                        {
                            $and: [{"applicableForAll":0},{"token":payload}]
                        }   
                    ]
             }
            ]}       
    , function (err, vouchers) {
        if (err) return res.status(500).send("There was a problem finding the vouchers.");       
        res.json(vouchers);
    });    
};

exports.applyCoupon = function(req,res,next)
{
    var token = req.body.tokenId;
    var payload = jwt.decode(token,"123"); 
    var couponApplyingDate = moment().utcOffset("+05:30").add(0, 'days').format();
    var couponCode = req.body.couponCode;
    var orderAmount = req.body.orderAmount;    
    Vouchers.find({
        $and: [
            {
                "status":1
            },
            {
               "expiry_date" : { $gte : couponApplyingDate }
            },
            {
                "codeName": couponCode
            },
            {
              "minimumorder" :{ $lte : orderAmount }
            }
           ]}       
   , function (err, voucherinfo) {
       if (err) return res.status(500).send("There was a problem finding the vouchers.");       
       console.log(voucherinfo);
        if(voucherinfo !=[] && voucherinfo != null && voucherinfo != '' && voucherinfo[0] != null && voucherinfo[0] != '')
        {
            if(voucherinfo[0].applicableForAll == 0)
            {
                if(voucherinfo[0].token != "" && voucherinfo[0].token == payload 
                    && voucherinfo[0].codeName == couponCode)
                {
                    res.json({"voucherinfo" : voucherinfo,"statusCode":200,"message":"voucher successfully applied"});
                }
                else
                {
                    res.json({"voucherinfo" : [{}],"statusCode":400,"message":"voucher code not applicable"});
                } 
            }
            else if(voucherinfo[0].applicableForAll == 1)
            {
                if(voucherinfo[0].codeName == couponCode)
                {
                    res.json({"voucherinfo" : voucherinfo,"statusCode":200,"message":"voucher successfully applied"});
                }
            }
            else
            {
                res.json({"voucherinfo" : [{}],"statusCode":500,"message":"voucher code not applicable123"});
            }
        }
        else
            res.json({"voucherinfo" : [{}],"statusCode":500,"message":"voucher code not applicable123"});
   });    

}

// exports.getAllUserVouchers = function(req,res,next){
//     console.log("getAllUserVouchers");   
// }

// exports.getVoucherById = function(req,res,next){
//     Vouchers.findOne({"_id":req.params.id},function(err,voucher){
//         if (err) return res.status(500).send("There was a problem finding the voucher.");            
//             //res.status(200).send(fruits);
//             res.json(voucher);
//     }); 
// }

exports.PostVouchers = function(req,res,next){
    Vouchers.findOne({"code":req.params.code},function(err,voucherdata){
        if (voucherdata) 
        {
            res.json({ success:true, voucherdata: voucherdata });
        }
        else
        {
            res.json({success:false,message:'voucher not valid'});
        }
    });
    // var vouchersData = new Vouchers(req.body);
    // vouchersData.save()
    // .then(item => {
    //     res.status(200).send("voucher successfully saved to database");
    // })
    // .catch(err => {    
    // res.json(item);
    // });
}