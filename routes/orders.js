var express = require('express');
var router = express.Router();
var authController = require('../controllers/authController');
var orderController = require('../controllers/orderController');

var path = require('path');

router.get('/alluserorders',function(req, res, next) {
    //console.log('all user orders');
   orderController.getAllUsersOrders(req,res,next);    
});


router.get('/:id', authController.checkAuthentication,function(req, res, next) {
    orderController.getOrdersDetailsById(req,res,next);    
});


router.get('/users/orders/:token',authController.checkAuthentication,function(req, res, next){    
    orderController.getAllOrdersDetailsByUserId(req,res,next);
})


router.post('/postorder', function(req, res, next) {  
    // console.log(req.body);
    // console.log('----------------------------------------------------------')
    orderController.postOrder(req,res,next);    
});

router.post('/users/orderstatus/:id',authController.checkAuthentication, function(req, res, next) {    
    orderController.orderStatus(req,res,next);    
});

router.post('/users/cancelOrder/:id',authController.checkAuthentication, function(req, res, next) {    
    orderController.cancelOrder(req,res,next);    
});

module.exports = router;