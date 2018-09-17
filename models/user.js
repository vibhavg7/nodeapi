// var ObjectID = require('mongodb').ObjectID;
var mongoose = require('mongoose');
var UserSchema = new mongoose.Schema({
    key:Number,
    name: String,
    email:String,
    username : String,
    password : String,
    referralCode : String,
    phoneNumber : Number,
    address : String,
    location : String,
    gender : String,
    loginMethod : String,
    picture : String
});
mongoose.model('User',UserSchema);
module.exports = mongoose.model('User');