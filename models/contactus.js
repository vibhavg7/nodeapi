// var ObjectID = require('mongodb').ObjectID;
var mongoose = require('mongoose');
var ContactusSchema = new mongoose.Schema({   
    name: String,
    email:String,
    phone : [{
        type: String
    }],
    timing : String,
    address : String,
    fax : String,
    message : String
});
mongoose.model('Contactus',ContactusSchema);
module.exports = mongoose.model('Contactus');