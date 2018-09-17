// var ObjectID = require('mongodb').ObjectID;
var mongoose = require('mongoose');
var BannersSchema = new mongoose.Schema({    
    name: String,
    image: String,
    city :String, 
    category : String,
    text : String,   
    status: String    
});
mongoose.model('Banners',BannersSchema);
module.exports = mongoose.model('Banners');