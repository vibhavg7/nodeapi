var express = require('express');
var router = express.Router();
var veggiesController = require('../controllers/veggiesController');
var path = require('path');

router.get('/', function(req, res, next) {   
  veggiesController.getAllVeggies(req, res, next);  
});

router.get('/image',function(req,res,next){
  console.log('image');
})

router.get('/image/:name',function(req,res,next){
  res.sendFile(path.join(__dirname, '../public/images', req.params.name));    
})

router.get('/:id', function(req, res, next) {
  veggiesController.getVeggiesById(req,res,next);    
});
  
router.post('/', function(req, res, next) {
  veggiesController.PostVeggies(req,res,next);
});
  
router.put('/:id', function(req, res, next) {
  veggiesController.UpdateVeggiesById(req,res,next);
});

router.delete('/:id', function(req, res, next) {
  veggiesController.DeleteVeggies(req,res,next);
});

module.exports = router;
