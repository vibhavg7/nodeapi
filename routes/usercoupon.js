var express = require('express');
var router = express.Router();
var uservouchersController = require('../controllers/uservouchersController');

router.get('/', function(req, res, next) {   
    uservouchersController.getAllUserVouchers(req, res, next);  
});

router.get('/:id', function(req, res, next) {
    uservouchersController.getUserVoucherById(req,res,next);    
});
  
router.post('/', function(req, res, next) {
    uservouchersController.PostUserVouchers(req,res,next);
});
  
// router.put('/:id', function(req, res, next) {
//     fruitsController.UpdateFruitsById(req,res,next);
// });

// router.delete('/:id', function(req, res, next) {
//     fruitsController.DeleteFruits(req,res,next);
// });

module.exports = router;
