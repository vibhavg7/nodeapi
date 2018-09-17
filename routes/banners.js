var express = require('express');
var router = express.Router();
var bannerController = require('../controllers/bannerController');

router.get('/', function(req, res, next) {   
    bannerController.getAllBanners(req, res, next);  
});

router.get('/:city', function(req, res, next) {
    uservouchersController.getAllBannersByCity(req,res,next);    
});
  
router.post('/', function(req, res, next) {
    uservouchersController.PostBanners(req,res,next);
});
  

module.exports = router;
