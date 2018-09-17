var db = require('../models/db');
var User = require('../models/user');
var Contactus = require('../models/contactus');
var ForgetPassword = require('../models/forgetPassword');
var jwt = require('jsonwebtoken');
var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');

var helper = require('sendgrid').mail;
var sg = require('sendgrid')(process.env.SENDGRID_API_KEY);

exports.getUserProfile = function(req, res, next) {
    User.findOne({"_id":req.user},function(err,userData){
        if (err) return res.status(500).send("There was a problem finding the user data.");
            userData.avatar_img = "";
            res.json(userData);
    }); 
};

exports.getUserdetail = function(req, res, next) {
    console.log(req.params.id)
    User.findOne({"_id":req.params.id},function(err,userData){
        if (err) return res.status(500).send("There was a problem finding the user data.");
            userData.avatar_img = "";
            res.json(userData);
    }); 
};

exports.editProfile = function(req,res,next){
    
    User.findOneAndUpdate({"_id": req.user},req.body, {new: true},function(err,userData){
        if (err) return res.status(500).send("There was a problem updating the user data.");            
        res.json(userData);        
    }); 
}

exports.contactus = function(req,res,next)
{
    var contactus = new Contactus(req.body);
    contactus.save()
    .then(item => {
        res.json({ success:true, message : 'Contact Info saved successfully' });                              
    })
    .catch(err => {            
        res.json(item);
    });     
}

exports.getAllUser = function(req, res, next) {
    User.find({},function(err,users){
        if (err) return res.status(500).send("There was a problem finding the users.");            
            res.json(users);
    });    
}

exports.register = function(req, res, next) {
    var userData = new User(req.body);
    
     if(userData.loginMethod == "2" || userData.loginMethod == "3")
     {
        User.findOne({"email":userData.email},function(err,userdata){
            if (!userdata) 
            {      
                console.log(userData);  
                userData.save()
                .then(item => {
                    sendToken(item,res);                               
                })
                .catch(err => {            
                    res.json(item);
                });                      
            }
            else
            {                              
               User.findOneAndUpdate({"email": userData.email},{loginMethod :userData.loginMethod}, { upsert: true },
                function(err,userData){                    
                    if (err) return res.status(500).send("There was a problem registering the user.");     
                    else sendToken(userData,res);               
                 });
            }
        });        
     }
     else
     {
        User.findOne({"email":userData.email},function(err,userdata){
            if (!userdata) 
            {
                userData.save()
                .then(item => {
                    sendToken(item,res);                               
                })
                .catch(err => {            
                    res.json(item);
                });              
            }
            else
            {
                res.json({success:false,message:'user already exits.'});
            }
        });   
     }
   
     
};


exports.login = function(req, res, next) {
    User.findOne({"email":req.body.email},function(err,userdata){
        if (!userdata) 
        {            
            sendAuthError(res);
        }
        else
        {            
            User.findOne({"email":req.body.email,"password":req.body.password},function(err,userinfo){
                console.log(userinfo);
                if (!userinfo) sendAuthError(res);
                else sendToken(userinfo,res);
            })   
        }
    });
};

exports.changeForgetPwd = function(req,res,next)
{
    User.findOne({"email":req.body.email},function(err,userdata){
        if (!userdata) 
        {                        
            return res.json({success:false,message:'user invalid'});
        }
        else
        {                                     
            User.findOneAndUpdate({"email": req.body.email},{password :req.body.npwd}, { upsert: true },
                function(err,userData){
                if (err) return res.status(500).send("There was a problem updating the user password.");            
                res.json({success:true,statusMessage:"Password successfully updated",statusCode : "400"});
            });
        
        
        }
    });
}

exports.changePwd = function(req,res,next){
    var token = req.header('authorization').split(' ')[1];
    //var opwd = req.header('authorization').split(' ')[3];
    var npwd = req.header('authorization').split(' ')[3];
    
    var payload = jwt.decode(token,"123");
    console.log(payload);
    
    User.findOne({"_id":payload},function(err,userdata){
         if (!userdata) 
         {                   
             return res.json({success:false,message:'user invalid'});
         }
         else
         {     
            User.findOneAndUpdate({_id: payload},{password :npwd}, { upsert: true },
                function(err,userData){
                if (err) 
                    return res.json({success:false,message:'There was a problem updating the user password.'});
                    //return res.status(500).send("There was a problem updating the user password.");            
                res.json({status:true,statusMessage:"Password changed successfully",statusCode : "400"});
            });                  
         }
     });
}



exports.sendpassword = function(req, res, next){
    
    User.findOne({"email":req.body.email},function(err,userdata){
        if (!userdata) 
        {            
            return res.json({success:false,message:'Invalid email'});
        }
        else
        {            
             var oTP = Math.floor(100000 + Math.random() * 900000);
    
            var from_email = new helper.Email('team@grostep.com');
            var to_email = new helper.Email(req.body.email);
            var subject = 'Grostep Account Password Reset Request';
            var content = new helper.Content('text/plain', 'Your generated OTP: ' + oTP);
            var mail = new helper.Mail(from_email, subject, to_email, content);
            var request = sg.emptyRequest({
                method: 'POST',
                path: '/v3/mail/send',
                body: mail.toJSON(),
            });
            sg.API(request, function(error, response) {
                
                 if(response.statusCode != null || response.statusCode != '')
                 {
                    //sres.json({'statusCode':response.statusCode,'body':response.body,'headers':response.headers});
                     var ForgetPasswordData = new ForgetPassword();
                     ForgetPasswordData.email = req.body.email;
                     ForgetPasswordData.otp = oTP;
                     ForgetPasswordData.createddate = new Date().toLocaleString();
                     ForgetPasswordData.save()
                     .then(item => {
                         res.json({ success:true,statusCode: 200, status :"OTP saved successfully saved" ,
                                    forgetpwdid:item._id,oTP : item.otp,createddate:item.createddate});        
                     })
                 }
            });
              
        }
    });

    
}

exports.verifypassword = function(req,res,next)
{
    console.log('verify password');
}

function sendToken(item,res)
{
    var token = jwt.sign(item.id,"123");
    res.json({ success:true, name: item.name, phoneNumber : item.phoneNumber,location : item.location, token:token,email :item.email });
}

function sendAuthError(res)
{
    return res.json({success:false,message:'email or password incorrect'});
}

exports.checkAuthentication = function checkAuthentication(req,res,next)
{
    if(!req.header('authorization'))
        return res.status(401).send({message:'Unauthorized requested.Missing authentication header'});

    var token = req.header('authorization').split(' ')[1];
    console.log(token);
    var payload = jwt.decode(token,"123");
    console.log(payload);
    if(!payload)
        return res.status(401).send({message:'Unauthorized requested.Authentication header invalid'});
      req.user  = payload; 
      next();
}
