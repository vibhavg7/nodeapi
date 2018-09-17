var express = require('express');
var router = express.Router();
var authController = require('../controllers/authController');
// var orderController = require('../controllers/orderController');

router.get('/users/me',authController.checkAuthentication,function(req, res, next){
    authController.getUserProfile(req,res,next);
})

router.get('/userdetail/:id',function(req, res, next){
    authController.getUserdetail(req,res,next);
})

router.get('/listUser',function(req, res, next){
    authController.getAllUser(req,res,next);
})

router.post('/users/me',authController.checkAuthentication,function(req, res, next){
    authController.editProfile(req,res,next);
})

router.post('/login', function(req, res, next) {
    authController.login(req,res,next);    
});

router.post('/register', function(req, res, next) {
    authController.register(req,res,next);
});

router.post('/contactus', function(req, res, next) {
    authController.contactus(req,res,next);
});
  
router.post('/change-pass', authController.checkAuthentication,function(req, res, next) {
    authController.changePwd(req,res,next);    
});

router.post('/change-forget-pass',function(req, res, next) {
    console.log('change forget pwd');
    authController.changeForgetPwd(req,res,next);    
});

router.post('/send',function(req, res, next) {    
    authController.sendpassword(req,res,next);    
});

router.post('/verify',function(req, res, next) {
    authController.verifypassword(req,res,next);    
});

module.exports = router;
