var db = require('../models/db');
var UserLocations = require('../models/userlocations');
var jwt = require('jsonwebtoken');
var moment = require('moment');
exports.getAllAddresses = function(req, res, next) {
    // console.log("156165456");
    // console.log("123"+req.user);
    // DeliveryAddress.find({},function(err,addresses){
    //     if (err) return res.status(500).send("There was a problem finding the addresses.");                        
    //         res.json(addresses);
    // });    
};

exports.getAddressById = function(req, res, next) {
    UserLocations.findOne({"_id":req.params.id},function(err,address){
        if (err) return res.status(500).send("There was a problem finding the address.");            
            res.json(address);
    }); 
};

exports.getMyDelievryAddress = function(req, res, next) {
    var token = req.params.tokenId;
    var payload = jwt.decode(token,"123");
    UserLocations.findOne({"tokenId":payload,"status":"1"},function(err,address){
        if (err) return res.status(500).send("There was a problem finding the address.");            
            res.json(address);
    }); 
};

exports.getDeliverydatetime = function(req,res,next)
{
    const monthNames = ["January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December"];  
    var slots=[];    
        
    var todaysdate = new Date();
    var tomorrowdate = new Date();    
    var currenttimehour = todaysdate.getHours();
    
   
    for (var i = 0; i < 5; i++) {       
        var deliverydate = moment().utcOffset("+05:30").add(i, 'days').format();
        var deliverytimeslots = [];
        var todaystimehr = moment().utcOffset("+05:30").format("hh");
        var todaystimemm = moment().utcOffset("+05:30").format("mm");
        var todaystimess = moment().utcOffset("+05:30").format("sss");
        var todaystimeam = moment().utcOffset("+05:30").format("a");

        if(todaystimeam =='pm')
            todaystimehr =  Number(todaystimehr) + 12;
        else
            todaystimehr =  Number(todaystimehr);    

        //json1 = { "hr = " : todaystimehr , "mm=" : todaystimemm , "ss=" : todaystimess , "amorpm" : todaystimeam};
        if(i==0 && (todaystimehr >= 16 && todaystimemm >00  && todaystimess>00)) 
            continue; 
        else if(i==0 && todaystimeam =='pm' && (todaystimehr >= 12 && todaystimehr < 16)  && todaystimemm >=00  && todaystimess>=00) 
        {
            deliverytimeslots[0]="5:00 PM - 6:00 PM";   
        }
        else if(i==0 && (todaystimehr >= 08 && todaystimehr < 12) && todaystimemm >=00  && todaystimess>=00) 
        {
            deliverytimeslots[0]="1:00 PM - 2:00 PM";
            deliverytimeslots[1]="5:00 PM - 6:00 PM";
        }
        else if(i==0 && todaystimehr < 08 && todaystimemm >=00  && todaystimess>=00)
        {
            deliverytimeslots[0]="09:00 AM - 10:00 AM";
            deliverytimeslots[1]="1:00 PM - 2:00 PM";
            deliverytimeslots[2]="5:00 PM - 6:00 PM";
        }
        else
        {
            deliverytimeslots[0]="09:00 AM - 10:00 AM";
            deliverytimeslots[1]="1:00 PM - 2:00 PM";
            deliverytimeslots[2]="5:00 PM - 6:00 PM";
        }                   

        slots.push({
            // json1 : json1,
            deliverydate: deliverydate,
            deliverytime: deliverytimeslots           
        });
    }

    res.json({deliverydlots:slots});
}

exports.getAllAddressesByUserId = function(req, res, next) {
    
    UserLocations.find({"tokenId":req.user},function(err,addresses){
        if (err) return res.status(500).send("There was a problem finding the addresses.");
        res.json(addresses);
    }); 
};

exports.editStatus = function(req,res,next){
         
    var token = req.body.tokenId;
    var payload = jwt.decode(token,"123");
    UserLocations.update({ "tokenId": payload }, { $set: { status: 0 }},{"multi": true}, 
        function callback (err, numAffected) {        
        if(numAffected != null && numAffected.nModified == 1) 
        {
            UserLocations.findOneAndUpdate({"_id": req.body._id},{$set:{status:req.body.status}}, {new: true},
                function(err,address)
                {
                    if (err) 
                    {
                        return res.status(500).send("There was a problem updating the address.");
                    }
                    res.json({ statusCode: 200, status :"Delievry Address successfully updated" ,
                            addressid:address._id});                
                }
            ); 
        }
        });            
}

exports.PostAddress = function(req,res,next){
    
    var userlocationsData = new UserLocations(req.body);
    var token = req.body.tokenId;
    var payload = jwt.decode(token,"123");
    userlocationsData.tokenId= payload;
    
    if(req.body.status != "1")
        userlocationsData.status = '0';
    
    UserLocations.update({ "tokenId": payload }, { $set: { status: 0 }},{"multi": true}, 
    function callback (err, numAffected) {
    });

    userlocationsData.save()
    .then(item => {
        res.json({ statusCode: 200, status :"Delievry Address successfully saved" ,addressid:item._id});        
    })
    .catch(err => {
        res.json(item);
    });
}

exports.UpdateAddressById = function(req,res,next){
    var AddressData = new UserLocations(req.body);    
    req.body.tokenId = jwt.decode(req.body.tokenId,"123");
    UserLocations.findOneAndUpdate({"_id": req.params.id},req.body, {new: true},function(err,address){
        if (err) return res.json({success:false,message:'There was a problem updating the address.'})                  
        res.json({ success : true ,message : 'Delievry Address successfully updated' ,address : address });        
    }); 
}

exports.DeleteAddressById = function(req,res,next){
    UserLocations.findOneAndRemove({"_id":req.params.id},function(err,address){
        console.log(address);
        if (err || address == null) return res.json({success:false,message:'Delievry Address not deleted' , statusCode :'0' });
        else return res.json({ success:true, message: 'Delievry Address successfully deleted',statusCode:'4' });
    })
}