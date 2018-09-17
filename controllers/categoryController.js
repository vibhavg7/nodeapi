var db = require('../models/db');
var categories1 = require('../models/categories');
var jwt = require('jsonwebtoken');

exports.getAllParentCategories = function(req,res,next) 
{
    console.log('hi');
    categories1.find({"parent_category_id":{ $in : [0] }},function (error, categorydata) {
        if (error) return res.status(500).send("There was a problem finding the categories.");         
        console.log(categorydata);
        res.json(categorydata);
    })   
    
}

exports.deletecategorybyId = function(req,res,next){
    console.log(req.params.id);
    categories1.findOneAndRemove({"_id":req.params.id},function(err,categorydata){
        console.log(categorydata);
        if (err || categorydata == null) return res.json({success:false,message:'category data not deleted' , statusCode :'0' });
        else return res.json({ success:true, message: 'category data successfully deleted',statusCode:'4' });
    })
}

exports.getAllCategory = function(req, res, next) {
    //console.log('get category');
    categories1.find({},function (error, categorydata) {
        if (error) return res.status(500).send("There was a problem finding the categories.");         
        console.log(categorydata);
        res.json(categorydata);
    })
};

exports.getCategoryDetailsById = function(req, res, next) {
    //console.log('get category');
    categories1.findOne({"_id":req.params.id},function (error, categorydata) {
        if (error) return res.status(500).send("There was a problem finding the data");         
        console.log(categorydata);
        res.json(categorydata);
    })
};

exports.getCategoryNameById = function(req, res, next) {
    //console.log('get category');
    categories1.findOne({"category_id":req.params.categoryid},function (error, categorydata) {
        if (error) return res.status(500).send("There was a problem finding the data");         
        console.log(categorydata);
        res.json(categorydata);
    })
};

exports.addNewCategory = function(req,res,next){        
    var categoriesdata = new categories1(req.body);   
     console.log(categoriesdata);
     categoriesdata.save()
    .then(item => {
        res.json({ statusCode: 200, status :"categories successfully added" ,category:item});
    })
    .catch(err => {    
    res.json(item);
    });
}



exports.editCategory = function(req,res,next) {
    // console.log(req.body);
    // console.log(req.params.id);
    var categories124 = new categories1(req.body);
    
    categories1.findOneAndUpdate({"_id": req.params.id},req.body, {new: true},function(err,category){
        if (err) return res.json({success:false,message:'There was a problem updating the category.'})                  
        res.json({ success : true ,message : 'Category successfully updated' ,category : category });        
    }); 
}


