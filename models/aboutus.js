// var ObjectID = require('mongodb').ObjectID;
var mongoose = require('mongoose');
var AboutusSchema = new mongoose.Schema({   
    image: String,
    title:String,   
    information: String
});
mongoose.model('Aboutus',AboutusSchema);
module.exports = mongoose.model('Aboutus');