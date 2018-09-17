var express = require('express');
var router = express.Router();
var deliveryAddressController = require('../controllers/deliveryAddressController');
var authController = require('../controllers/authController');

router.get('/user/me',authController.checkAuthentication,function(req, res, next) {
        
    deliveryAddressController.getAllAddressesByUserId(req,res,next);    
});

router.get('/user/:tokenId', function(req, res, next) {
    deliveryAddressController.getMyDelievryAddress(req,res,next);    
});

router.get('/deliverydate',function(req, res, next) {
    //console.log("aaaa");
   deliveryAddressController.getDeliverydatetime(req, res, next);  
});

router.get('/:id', function(req, res, next) {
    deliveryAddressController.getAddressById(req,res,next);    
});



router.get('/', authController.checkAuthentication,function(req, res, next) {
    deliveryAddressController.getAllAddresses(req, res, next);  
});



router.post('/editStatus', function(req, res, next) {    
    deliveryAddressController.editStatus(req,res,next);
});

router.post('/delete/:id', function(req, res, next) {    
    deliveryAddressController.DeleteAddressById(req,res,next);
});

router.post('/update/:id', function(req, res, next) {    
    deliveryAddressController.UpdateAddressById(req,res,next);
});

router.post('/', function(req, res, next) {
    deliveryAddressController.PostAddress(req,res,next);
});
  
// router.put('/:id', function(req, res, next) {
//     deliveryAddressController.UpdateAddressById(req,res,next);
// });

// router.put('/user/:id', function(req, res, next) {
//     deliveryAddressController.UpdateAddressByUserId(req,res,next);
// });

// router.delete('/:id', function(req, res, next) {
//     //console.log(req.params.id);
//     deliveryAddressController.DeleteAddressById(req,res,next);
// });

module.exports = router;
