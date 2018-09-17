var express = require('express');
var router = express.Router();
var cartController = require('../controllers/cartController');
var path = require('path');

router.post('/addtocart', function(req, res, next) {
    cartController.addtocart(req,res,next);    
});




module.exports = router;