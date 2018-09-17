var express = require('express');
var router = express.Router();
var categoryController = require('../controllers/categoryController');

router.get('/parentcategories', function(req, res, next) {  
    console.log('showll');
    categoryController.getAllParentCategories(req, res, next);
});

router.get('/', function(req, res, next) {   
    // console.log('get category');
    categoryController.getAllCategory(req, res, next);  
});

router.get('/:id', function(req, res, next) {   
    // console.log('get category');
    categoryController.getCategoryDetailsById(req, res, next);  
});


router.get('/categoryname/:categoryid', function(req, res, next) {   
    // console.log('get category');
    categoryController.getCategoryNameById(req, res, next);  
});

router.post('/', function(req, res, next) {
    categoryController.addNewCategory(req,res,next);
});

router.post('/edit/:id', function(req, res, next) {
    categoryController.editCategory(req,res,next);
});


router.post('/delete/:id', function(req, res, next) {    
    categoryController.deletecategorybyId(req,res,next);
});

module.exports = router;
