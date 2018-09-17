// var ObjectID = require('mongodb').ObjectID;
var mongoose = require('mongoose');
var CategoriesSchema = new mongoose.Schema({
    category_id : Number,
    name : String,
    description : String,
    priority : Number,
    category_img : String,
    parent_category_id: [{
        type: Number
    }],
    status:Number
});
mongoose.model('Categories',CategoriesSchema);
module.exports = mongoose.model('Categories');