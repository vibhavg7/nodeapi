// var ObjectID = require('mongodb').ObjectID;
var mongoose = require('mongoose');
var CategorySchema = new mongoose.Schema({    
    main_category_name : String,
    sub_category_name : String,
    product_type: Number
});
mongoose.model('Category',CategorySchema);
module.exports = mongoose.model('Category');