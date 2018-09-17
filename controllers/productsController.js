var db = require('../models/db');
var Products = require('../models/products');
var categories = require('../models/categories');
var fruits = require('../models/fruits');


exports.getAllMainCategory = function(req,res,next)
{
    categories.find({"status":1,"parent_category_id":0},null,{sort:{priority:1}},function (error, categories) {
        if (error) return res.status(500).send("There was a problem finding the categories.");         
        // console.log(json.categories);
        res.json(categories);
    })    
}

exports.getAllProducts = function(req, res, next) {
    var json = {};
    Products.find({"status":1,"category_ids" : { $in : [1] } },null, {sort: {our_price: 1}},function(err,products){
        if (err) return res.status(500).send("There was a problem finding the products.");        
        json.products = products; 
        // console.log(products);
        if(products != null && products != '') { 
            categories.find({"status":1,"parent_category_id":{ $in : [0] }},null,{sort:{priority:1}},function (error, categories) {
                if (error) return res.status(500).send("There was a problem finding the categories."); 
                json.categories = categories;
                // console.log(json.categories);
                res.json(json);
            })
        }           
    });
};

exports.getAllProductsForAdmin = function(req, res, next) {
    var json = {};

    Products.find({},function(err,products){
        if (err) return res.status(500).send("There was a problem finding the product.");            
            res.json(products);
    }); 

    // Products.find({"category_ids" : { $in : [1] } },null, 
    //{sort: {main_category_name:1,our_price: 1}},function(err,products){
    //     if (err) return res.status(500).send("There was a problem finding the products.");        
    //     json.products = products; 
    //     // console.log(products);
    //     if(products != null && products != '') { 
    //         categories.find({},function (error, categories) {
    //             if (error) return res.status(500).send("There was a problem finding the categories."); 
    //             json.categories = categories;
    //             // console.log(json.categories);
    //             res.json(json);
    //         })
    //     }           
    // });
};

exports.getProductsByCategory =  function(req,res,next){
    var json = {};
    json.products = []
    json.categories = []
    Products.find({"status":1, "category_ids" : { $in : [req.params.categoryid] } },
                    null, {sort: {our_price: 1}},function(err,products){
        if (err) return res.status(500).send("There was a problem finding the products.");        
        json.products = products; 
        console.log(json);
        if(products != null && products != '' && products != []) { 
            categories.find({"status":1,"parent_category_id":{ $in : [req.params.categoryid] }},
            null,{sort:{priority:1}},
                function (error, categories) {
                    if (error) return res.status(500).send("There was a problem finding the categories."); 
                    json.categories = categories;
                    console.log(json.categories);
                    res.json(json);
            })
        }
        else
            res.json(json);
    });   
}

exports.getProductById = function(req, res, next) {
    Products.findOne({"_id":req.params.id},function(err,product){
        if (err) return res.status(500).send("There was a problem finding the product.");            
            res.json(product);
    }); 
};

exports.searchProductByKey = function(req,res,next){

    var nameRegex = {"$regex": new RegExp('.*' + req.params.key.toLowerCase() + '.*',  'i')};
    Products.find({ "status":1,"product_name": nameRegex } , null, {sort: {our_price: 1}},
    function(err,data){
        if (err) return res.status(500).send("There was a problem finding the search product.");            
        res.json(data);
   });

    // var nameRegex = {"$regex": new RegExp('.*' + req.params.key.toLowerCase() + '.*',  'i')};
    
    // Products.find({$or: [
    //     { main_category_name: nameRegex },
    //     { sub_category_name: nameRegex },
    //     { product_name: nameRegex }
    // ]}, function (err, searchproducts) {
    //     if (err) return res.status(500).send("There was a problem finding the search product.");            
    //     res.json(searchproducts);
    // });
}

exports.PostProducts = function(req,res,next){
    var productsData = new Products(req.body);
    productsData.save()
    .then(item => {
        res.status(200).send("Product successfully saved to database");
    })
    .catch(err => {    
        res.json(item);
    });
}

exports.UpdateProductsById = function(req,res,next){
    //var productData = new Products(req.body);
    Products.findOneAndUpdate({"_id": req.params.id},req.body, {new: true},function(err,product){
        if (err) return res.status(500).send("There was a problem updating the product.");            
        res.json({ success : true ,message : 'Product successfully updated' ,product : product });        
        //res.json(product);        
    }); 
}

exports.DeleteProducts = function(req,res,next){
    Products.findOneAndRemove({"_id":req.params.id},function(err,product){
        if (err) throw err;        
        res.json({ message: 'Product successfully deleted',statusCode:'4' });
    })
}
