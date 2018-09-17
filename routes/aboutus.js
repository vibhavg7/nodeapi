var express = require('express');
var router = express.Router();
var aboutusController = require('../controllers/aboutusController');
var path = require('path');

router.get('/', function(req, res, next) {   
    aboutusController.getaboutusInfo(req, res, next);  
});

router.get('/image',function(req,res,next){
    console.log('image');
})

router.get('/image/:name',function(req,res,next){
    res.sendFile(path.join(__dirname, '../public/images', req.params.name));    
})

router.post('/', function(req, res, next) {
    aboutusController.postaboutusInfo(req,res,next);
});
  

module.exports = router;