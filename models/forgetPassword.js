// var ObjectID = require('mongodb').ObjectID;
var mongoose = require('mongoose');
var ForgetPasswordSchema = new mongoose.Schema({    
    email: String,
    otp: Number,
    createddate : String    
});
mongoose.model('Forgetpasswords',ForgetPasswordSchema);
module.exports = mongoose.model('Forgetpasswords');