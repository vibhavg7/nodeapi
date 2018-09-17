var express = require('express');
var router = express.Router();
var vouchersController = require('../controllers/vouchersController');
var authController = require('../controllers/authController');

router.get('/allCoupon',function(req, res, next) {   
    vouchersController.AllUserCoupons(req, res, next);  
});

router.get('/user/mycoupon/:tokenId',authController.checkAuthentication, function(req, res, next) {   
    vouchersController.getAllVouchers(req, res, next);  
});

router.post('/user/applycoupon', function(req, res, next) {
    vouchersController.applyCoupon(req,res,next);
});

// router.get('/:id', function(req, res, next) {
//     vouchersController.getVoucherById(req,res,next);    
// });

// router.post('/mycoupon', authController.checkAuthentication,function(req, res, next) { 
//     console.log("my coupons");  
//     vouchersController.getAllUserVouchers(req, res, next);  
// });


router.post('/:code', function(req, res, next) {
    vouchersController.PostVouchers(req,res,next);
});
  
module.exports = router;
