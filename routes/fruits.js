var express = require('express');
var router = express.Router();
var fruitsController = require('../controllers/fruitsController');
var path = require('path');

router.get('/', function(req, res, next) {   
    fruitsController.getAllFruits(req, res, next);  
});

router.get('/image',function(req,res,next){
    console.log('image');
})

router.get('/image/:name',function(req,res,next){
    res.sendFile(path.join(__dirname, '../public/images', req.params.name));    
})

router.get('/:id', function(req, res, next) {
    fruitsController.getFruitsById(req,res,next);    
});
  
router.post('/', function(req, res, next) {
    fruitsController.PostFruits(req,res,next);
});
  
router.put('/:id', function(req, res, next) {
    fruitsController.UpdateFruitsById(req,res,next);
});

router.delete('/:id', function(req, res, next) {
    fruitsController.DeleteFruits(req,res,next);
});

module.exports = router;
