var express = require('express');
var router = express.Router();
var productsController = require('../controllers/productsController');
var path = require('path');
var multer = require('multer');


var storage = multer.diskStorage({
    // destination
    destination: function (req, file, cb) {
      cb(null, './public/images/')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    }
  });
    
  var upload = multer({
    storage: storage}).single('file');
router.get('/category/:categoryid', function(req, res, next) {       
    productsController.getProductsByCategory(req, res, next);  
});

router.get('/productcategories', function(req, res, next) {       
    productsController.getAllMainCategory(req, res, next); 
});


router.get('/image',function(req,res,next){
    console.log('image');
})

router.get('/image/:name',function(req,res,next){
    res.sendFile(path.join(__dirname, '../public/images', req.params.name));    
})

router.get('/searchkey/:key', function(req, res, next) {
    productsController.searchProductByKey(req,res,next);    
});


router.get('/productForAdmin', function(req, res, next) {   
    productsController.getAllProductsForAdmin(req, res, next);  
});

router.get('/:id', function(req, res, next) {
    productsController.getProductById(req,res,next);
});

router.get('/', function(req, res, next) {   
    productsController.getAllProducts(req, res, next);  
});


router.post('/', function(req, res, next) {
    productsController.PostProducts(req,res,next);
});
  
router.post('/update/:id', function(req, res, next) {
    productsController.UpdateProductsById(req,res,next);
});

router.post('/delete/:id', function(req, res, next) {
    productsController.DeleteProducts(req,res,next);
});

router.post('/upload', function(req, res, next) {
    
    // upload(req, res, function(err) {
        
    //     console.log("File uploaded" + JSON.stringify(req.file));
    //     res.end('File is uploaded')
    // })   
    upload(req,res,function(err){
        if(err){
            res.status(501).json({error:err});
        }
        // console.log('FIRST TEST: ' + JSON.stringify(req.file));
        res.json({orignal_name:req.file.originalname,upload_name:req.file.filename});
    })
});


module.exports = router;
