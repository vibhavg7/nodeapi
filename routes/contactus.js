var express = require('express');
var router = express.Router();
var contactusController = require('../controllers/contactusController');
var path = require('path');

router.get('/', function(req, res, next) {   
    contactusController.getContactInfo(req, res, next);  
});

router.post('/', function(req, res, next) {
    contactusController.postContactInfo(req,res,next);
});
  

module.exports = router;