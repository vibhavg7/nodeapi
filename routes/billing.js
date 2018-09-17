var express = require('express');
var router = express.Router();
var billingController = require('../controllers/billingController');

router.get('/', function(req, res, next) {   
    billingController.getBillingAddresses(req, res, next);  
});

router.get('/:id', function(req, res, next) {
    billingController.getBillingAddressesById(req,res,next);    
});

router.get('/user/:userid', function(req, res, next) {    
    billingController.getBillingAddressesByUserId(req,res,next);    
});

router.post('/', function(req, res, next) {
    billingController.PostBillingAddress(req,res,next);
});
  
router.put('/:id', function(req, res, next) {
    billingController.UpdateBillingAddressById(req,res,next);
});

router.delete('/:id', function(req, res, next) {
    billingController.DeleteBillingAddress(req,res,next);
});

module.exports = router;
