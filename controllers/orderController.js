var db = require('../models/db');
var Orders = require('../models/order');
var jwt = require('jsonwebtoken');
var moment = require('moment');
var helper = require('sendgrid').mail;
var sg = require('sendgrid')(process.env.SENDGRID_API_KEY);

// exports.getAllOrdersDetails = function(req, res, next) {
//     var token = req.header('authorization').split(' ')[1];
//     var payload = jwt.decode(token,"123");
//     Orders.find({"token":payload},function(err,orders){
//         if (err) return res.status(500).send("There was a problem finding the order data.");            
//             //res.status(200).send(fruits);
//             res.json(orders);
//     });    
// };

exports.getOrdersDetailsById = function(req, res, next) {
    Orders.findOne({"_id":req.params.id},function(err,orders){
        if (err) return res.status(500).send("There was a problem finding the order data.");            
            //res.status(200).send(fruits);
            res.json(orders);
    }); 
};

exports.getAllUsersOrders = function(req, res, next) {
    Orders.find({},function(err,orders){
        if (err) return res.status(500).send("There was a problem finding the order data.");            
            //res.status(200).send(fruits);
            res.json(orders);
    }); 
};

exports.getAllOrdersDetailsByUserId  = function(req,res,next){
    var id = req.params.token;    
    //var token = req.header('authorization').split(' ')[1];
    var token = jwt.decode(id,"123");    
    Orders.find({"token":token},function(err,orders){
        if (err) return res.status(500).send("There was a problem finding the Orders.");            
            res.json(orders);
    }); 
}

exports.postOrder = function(req,res,next){            
    var orderData = new Orders();
    var paymenttext = '';
    var emailarray = [];
    orderData.token = jwt.decode(req.body.token,"123");
    orderData.purchased_item = req.body.purchased_item;
    orderData.total_purchased_item = req.body.total_purchased_item;    
    orderData.couponCode = req.body.couponCode;
    orderData.delivery_address = JSON.stringify(req.body.delivery_address);
    orderData.delivery_date = req.body.delivery_date;
    orderData.delivery_time = req.body.delivery_time;
    orderData.amount_to_pay = req.body.amount_to_pay;
    orderData.payableAmount = req.body.payableAmount;    
    orderData.savingAmount = req.body.savingAmount;
    orderData.shipping_charge = req.body.shipping_charge;
    orderData.paid = req.body.paid;
    orderData.placingdatetime = moment().utcOffset("+05:30").add(0, 'days').format();
    orderData.cancelleddatetime = "";
    orderData.payment_mode = req.body.payment_mode;    
    if(req.body.email != null && req.body.email != '')
    {
        orderData.email = req.body.email;
        emailarray.push(orderData.email);
        emailarray.push("gscustomercare018@gmail.com");
    }
    
    orderData.razorpay_payment_id = req.body.razorpay_payment_id
    
    orderData.razorpay_order_id = req.body.razorpay_order_id
        
    orderData.razorpay_signature = req.body.razorpay_signature
        
    
    var purchased_item_table = '<table style="background-color:#F8F8F8;width: 100%;font-family: arial, sans-serif;border: 1px solid black;border-collapse: collapse;">';
    var purchased_item_table_header =  '<tr>' + '<th style="padding: 15px;text-align: left;border: 1px solid black;border-collapse: collapse;">' + 'Product Name' 
                                              + '</th>' + '<th style="padding: 15px;text-align: left;border: 1px solid black;border-collapse: collapse;">' + 'Product Weight' + '</th>' 
                                              + '<th style="padding: 15px;text-align: left;border: 1px solid black;border-collapse: collapse;">' + 'Product Price' + '</th>' 
                                              + '<th style="padding: 15px;text-align: left;border: 1px solid black;border-collapse: collapse;">' + 'Product Quantity' + '</th>'                                               
                                              + '<th style="padding: 15px;text-align: left;border: 1px solid black;border-collapse: collapse;">' + 'Total Price' + '</th>' 
                                              + '<th style="padding: 15px;text-align: left;border: 1px solid black;border-collapse: collapse;">' + 'Product Category' + '</th>' + '</tr>';
    purchased_item_table += purchased_item_table_header;
    var intString = '';
    JSON.parse(orderData.purchased_item).forEach(item => {
        intString = '<tr>' + '<td style="padding: 15px;text-align: left;border: 1px solid black;border-collapse: collapse;">' + item.title + '</td>' 
                           + '<td style="padding: 15px;text-align: left;border: 1px solid black;border-collapse: collapse;">' + item.weight + item.available_quantity_type + '</td>' 
                           +  '<td style="padding: 15px;text-align: left;border: 1px solid black;border-collapse: collapse;">' + 'Rs' + item.price + '</td>' 
                           + '<td style="padding: 15px;text-align: left;border: 1px solid black;border-collapse: collapse;">' + item.quantity + '</td>'                            
                           +  '<td style="padding: 15px;text-align: left;border: 1px solid black;border-collapse: collapse;">' + 'Rs' + item.price * item.quantity + '</td>' 
                           + '<td style="padding: 15px;text-align: left;border: 1px solid black;border-collapse: collapse;">' + item.main_category_name + '</td>' + '</tr>';
        purchased_item_table += intString;
     });
    purchased_item_table += '</table>';

    var delivery_address_table = '<table style="background-color:#F8F8F8;width: 100%;font-family: arial, sans-serif;border: 1px solid black;border-collapse: collapse;">';
    var delivery_address_table_header =  '<tr>' + '<th style="padding: 15px;text-align: left;border: 1px solid black;border-collapse: collapse;">' + 'Full Name' 
                                              + '</th>' + '<th style="padding: 15px;text-align: left;border: 1px solid black;border-collapse: collapse;">' + 'Location' + '</th>' 
                                              + '<th style="padding: 15px;text-align: left;border: 1px solid black;border-collapse: collapse;">' + 'Address Type' + '</th>' 
                                              + '<th style="padding: 15px;text-align: left;border: 1px solid black;border-collapse: collapse;">' + 'FlatNumber/HouseNumber' + '</th>' 
                                              + '<th style="padding: 15px;text-align: left;border: 1px solid black;border-collapse: collapse;">' + 'Address' + '</th>'
                                              + '<th style="padding: 15px;text-align: left;border: 1px solid black;border-collapse: collapse;">' + 'Pincode' + '</th>' 
                                              + '<th style="padding: 15px;text-align: left;border: 1px solid black;border-collapse: collapse;">' + 'Phone' + '</th>' + '</tr>';
    delivery_address_table += delivery_address_table_header;
    var deliveryAddressString = '';
    var addressType = '';
    if(req.body.delivery_address.addresstype == 0) addressType = 'Home'; else addressType = 'Work' ;
    deliveryAddressString = '<tr>' + '<td style="padding: 15px;text-align: left;border: 1px solid black;border-collapse: collapse;">' + req.body.delivery_address.firstname + req.body.delivery_address.lastname + '</td>' 
                           + '<td style="padding: 15px;text-align: left;border: 1px solid black;border-collapse: collapse;">' + req.body.delivery_address.location + '</td>' 
                           + '<td style="padding: 15px;text-align: left;border: 1px solid black;border-collapse: collapse;">' + addressType + '</td>' 
                           +  '<td style="padding: 15px;text-align: left;border: 1px solid black;border-collapse: collapse;">'+ req.body.delivery_address.flatNumber + '</td>' 
                           + '<td style="padding: 15px;text-align: left;border: 1px solid black;border-collapse: collapse;">' + req.body.delivery_address.address + '</td>'
                           + '<td style="padding: 15px;text-align: left;border: 1px solid black;border-collapse: collapse;">' + req.body.delivery_address.pincode + '</td>'
                           + '<td style="padding: 15px;text-align: left;border: 1px solid black;border-collapse: collapse;">' + req.body.delivery_address.phone + '</td>' + '</tr>';
        delivery_address_table += deliveryAddressString;

    delivery_address_table += '</table>';




    if(orderData.payment_mode == 0) 
        paymenttext = 'Cash On Delivery'
    else if(orderData.payment_mode == 1) 
        paymenttext = 'Card On Delivery'
    else if(orderData.payment_mode == 2)
        paymenttext = 'Paytm on Delivery'
    else if(orderData.payment_mode == 3)
        paymenttext = 'Sodexo'
    else if(orderData.payment_mode == 4)
        paymenttext = 'Online Payment'    
    
    if(orderData.couponCode != '' &&  orderData.couponCode != null)
    {
        couponCodeApplied = "(" + orderData.couponCode + ")"
    }
    else
    {
        couponCodeApplied = '';
    }

    orderData.status = "1";
    // console.log(orderData);
    orderData.save()
    .then(order => {
        var htmlcontent = 'Hi,' + '<br/><br/>' + 'Order #' + ' ' + order._id  + ' ' + 'placed sucessfully'
             + '<br/><br/>' + '<strong>Total Items Purchased:</strong>' + ' ' +orderData.total_purchased_item 
             + '<br/><br/>' + '<strong>Purchased Items are: </strong>' + '<br/><br/>' + 
             purchased_item_table      
             
             + '<br/><br/>' + '<strong>Amount to be Paid  : </strong>' +  'Rs' + orderData.amount_to_pay
             + '<br/><br/>' + '<strong>Saving Amount : </strong>' +  'Rs' + orderData.savingAmount + couponCodeApplied
             + '<br/><br/>' + '<strong>Delivery Charge  : </strong>' +  'Rs' + orderData.shipping_charge
             + '<br/><br/>' + '<strong>Total Amount to be Paid  : </strong>' +  'Rs' + orderData.payableAmount
             
             + '<br/><br/>' + '<strong>Coupon Code Applied : </strong>' + couponCodeApplied

             + '<br/><br/>' + '<strong>Payment Mode : </strong>' + paymenttext
             + '<br/><br/>' + '<strong>Delivery Address: </strong>' + '<br/><br/>' + delivery_address_table
             + '<br/><br/>' + '<strong>Delivery Date : </strong>' + formatDate(orderData.delivery_date)             
             + '<br/><br/>' + '<strong>Delivery Time SLOT: </strong>' + orderData.delivery_time             
             + '<br/><br/>' + 'Regards,' 
             + '<br/><br/>' + 'Grostep Team';
                
        emailarray.forEach(toEmail => {            
            var from_email = new helper.Email('alerts@grostep.com');     
            var subject =  'Your Grostep order confirmation ' +  ( order._id ) 
            var content = new helper.Content('text/html', htmlcontent);
            count = 0;    
            var to_email = new helper.Email(toEmail);    
            var mail = new helper.Mail(from_email, subject, to_email, content);
            var request = sg.emptyRequest({
                method: 'POST',
                path: '/v3/mail/send',
                body: mail.toJSON(),
            });
            sg.API(request, function(error, response) {                
                 if(response.statusCode != null || response.statusCode != '')
                 {
                    count = count + 1;               
                    console.log(toEmail);
                    console.log(response.statusCode);
                    console.log(count);
                    if(count == 2)
                    {
                        res.json({ statusCode: "200",orderId:order._id, status:"Order sucessfully placed"});
                    }
                 }
            });
        });        
    })
    .catch(err => {
        if (err) return res.status(500).send("There was a problem in saving the order details.");
    });
}

function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [day,month,year].join('-');
}

exports.orderStatus = function(req,res,next){
    Orders.findOne({"_id":req.params.id},function(err,orders){
        if (err) return res.status(500).send("There was a problem finding the order data.");            
            //res.status(200).send(fruits);
            res.json(orders);
    });
}

exports.cancelOrder = function(req,res,next){

    Orders.find({"_id": req.params.id},function(err,orderData){
        if (err) return res.status(500).send("There was a problem finding the order.");
        if(orderData[0] != null && orderData[0] != '')
        {
            var purchased_item_table = '<table style="background-color:#F8F8F8;width: 100%;font-family: arial, sans-serif;border: 1px solid black;border-collapse: collapse;">';
            var purchased_item_table_header =  '<tr>' + '<th style="padding: 15px;text-align: left;border: 1px solid black;border-collapse: collapse;">' + 'Product Name' 
                                                      + '</th>' + '<th style="padding: 15px;text-align: left;border: 1px solid black;border-collapse: collapse;">' + 'Product Weight' + '</th>' 
                                                      + '<th style="padding: 15px;text-align: left;border: 1px solid black;border-collapse: collapse;">' + 'Product Price' + '</th>' 
                                                      + '<th style="padding: 15px;text-align: left;border: 1px solid black;border-collapse: collapse;">' + 'Product Quantity' + '</th>'                                               
                                                      + '<th style="padding: 15px;text-align: left;border: 1px solid black;border-collapse: collapse;">' + 'Total Price' + '</th>' 
                                                      + '<th style="padding: 15px;text-align: left;border: 1px solid black;border-collapse: collapse;">' + 'Product Category' + '</th>' + '</tr>';
            purchased_item_table += purchased_item_table_header;
            var intString = '';
            JSON.parse(orderData[0].purchased_item).forEach(item => {
                intString = '<tr>' + '<td style="padding: 15px;text-align: left;border: 1px solid black;border-collapse: collapse;">' + item.title + '</td>' 
                                   + '<td style="padding: 15px;text-align: left;border: 1px solid black;border-collapse: collapse;">' + item.weight + item.available_quantity_type + '</td>' 
                                   +  '<td style="padding: 15px;text-align: left;border: 1px solid black;border-collapse: collapse;">' + 'Rs' + item.price + '</td>' 
                                   + '<td style="padding: 15px;text-align: left;border: 1px solid black;border-collapse: collapse;">' + item.quantity + '</td>'                            
                                   +  '<td style="padding: 15px;text-align: left;border: 1px solid black;border-collapse: collapse;">' + 'Rs' + item.price * item.quantity + '</td>' 
                                   + '<td style="padding: 15px;text-align: left;border: 1px solid black;border-collapse: collapse;">' + item.main_category_name + '</td>' + '</tr>';
                purchased_item_table += intString;
             });
            purchased_item_table += '</table>';
        
            var delivery_address_table = '<table style="background-color:#F8F8F8;width: 100%;font-family: arial, sans-serif;border: 1px solid black;border-collapse: collapse;">';
            var delivery_address_table_header =  '<tr>' + '<th style="padding: 15px;text-align: left;border: 1px solid black;border-collapse: collapse;">' + 'Full Name' 
                                                      + '</th>' + '<th style="padding: 15px;text-align: left;border: 1px solid black;border-collapse: collapse;">' + 'Location' + '</th>' 
                                                      + '<th style="padding: 15px;text-align: left;border: 1px solid black;border-collapse: collapse;">' + 'Address Type' + '</th>' 
                                                      + '<th style="padding: 15px;text-align: left;border: 1px solid black;border-collapse: collapse;">' + 'FlatNumber/HouseNumber' + '</th>' 
                                                      + '<th style="padding: 15px;text-align: left;border: 1px solid black;border-collapse: collapse;">' + 'Address' + '</th>'
                                                      + '<th style="padding: 15px;text-align: left;border: 1px solid black;border-collapse: collapse;">' + 'Pincode' + '</th>' 
                                                      + '<th style="padding: 15px;text-align: left;border: 1px solid black;border-collapse: collapse;">' + 'Phone' + '</th>' + '</tr>';
            delivery_address_table += delivery_address_table_header;
            var deliveryAddressString = '';
            var addressType = '';
            if(orderData[0].delivery_address.addresstype == 0) addressType = 'Home'; else addressType = 'Work' ;
            deliveryAddressString = '<tr>' + '<td style="padding: 15px;text-align: left;border: 1px solid black;border-collapse: collapse;">' + JSON.parse(orderData[0].delivery_address).firstname + JSON.parse(orderData[0].delivery_address).lastname + '</td>' 
                                   + '<td style="padding: 15px;text-align: left;border: 1px solid black;border-collapse: collapse;">' + JSON.parse(orderData[0].delivery_address).location + '</td>' 
                                   + '<td style="padding: 15px;text-align: left;border: 1px solid black;border-collapse: collapse;">' + addressType + '</td>' 
                                   +  '<td style="padding: 15px;text-align: left;border: 1px solid black;border-collapse: collapse;">'+ JSON.parse(orderData[0].delivery_address).flatNumber + '</td>' 
                                   + '<td style="padding: 15px;text-align: left;border: 1px solid black;border-collapse: collapse;">' + JSON.parse(orderData[0].delivery_address).address + '</td>'
                                   + '<td style="padding: 15px;text-align: left;border: 1px solid black;border-collapse: collapse;">' + JSON.parse(orderData[0].delivery_address).pincode + '</td>'
                                   + '<td style="padding: 15px;text-align: left;border: 1px solid black;border-collapse: collapse;">' + JSON.parse(orderData[0].delivery_address).phone + '</td>' + '</tr>';
                delivery_address_table += deliveryAddressString;
        
            delivery_address_table += '</table>';
        
            if(orderData[0].payment_mode == 0) 
                paymenttext = 'Cash On Delivery'
            else if(orderData[0].payment_mode == 1) 
                paymenttext = 'Card On Delivery'
            else if(orderData[0].payment_mode = 2)
                paymenttext = 'Paytm on Delivery'
            else if(orderData[0].payment_mode = 3)
                paymenttext = 'Sodexo'
            else
                paymenttext = 'Online Payment'    
            if(orderData[0].couponCode != '' &&  orderData[0].couponCode != null)
            {
                couponCodeApplied = "(" + orderData[0].couponCode + ")"
            }
            else
            {
                couponCodeApplied = '';
            }
            if(orderData[0].shipping_charge) 
            {
                shipping_charge  = orderData[0].shipping_charge
            }
            else
            {
                shipping_charge = 0
            }
            Orders.findOneAndUpdate({"_id": req.params.id},
            {status :"0",cancelleddatetime:moment().utcOffset("+05:30").add(0, 'days').format()},
            { upsert: true },
            function(err,cancelledorderData){
            if (err) return res.status(500).send("There was a problem cancelling the order."); 
            if(cancelledorderData)
            {
                var htmlcontent = 'Hi,' + '<br/><br/>' + 'Order #' + ' ' + req.params.id  + ' ' + 'cancelled sucessfully'
                + '<br/><br/>' + '<strong>Total Items Purchased:</strong>' + ' ' +orderData[0].total_purchased_item 
                + '<br/><br/>' + '<strong>Total Items Purchased:</strong>' + ' ' +orderData[0].total_purchased_item 
                + '<br/><br/>' + '<strong>Purchased Items are: </strong>' + '<br/><br/>' + 
                purchased_item_table      
                
                + '<br/><br/>' + '<strong>Amount to be Paid  : </strong>' +  'Rs' + orderData[0].amount_to_pay
                + '<br/><br/>' + '<strong>Saving Amount : </strong>' +  'Rs' + orderData[0].savingAmount + couponCodeApplied
                + '<br/><br/>' + '<strong>Delivery Charge  : </strong>' +  'Rs' + shipping_charge
                + '<br/><br/>' + '<strong>Total Amount to be Paid  : </strong>' +  'Rs' + orderData[0].payableAmount
                
                + '<br/><br/>' + '<strong>Coupon Code Applied : </strong>' + couponCodeApplied

                + '<br/><br/>' + '<strong>Payment Mode : </strong>' + paymenttext
                + '<br/><br/>' + '<strong>Delivery Address: </strong>' + '<br/><br/>' + delivery_address_table
                + '<br/><br/>' + '<strong>Delivery Date : </strong>' + formatDate(orderData[0].delivery_date)             
                + '<br/><br/>' + '<strong>Delivery Time SLOT: </strong>' + orderData[0].delivery_time             
                + '<br/><br/>' + 'Regards,' 
                + '<br/><br/>' + 'Grostep Team';
                var from_email = new helper.Email('alerts@grostep.com');
                var to_email = new helper.Email('gscustomercare018@gmail.com');
                var subject =  'Cancellation of your Order No:' +  req.params.id  + ' ' + 'at Grostep'
                var content = new helper.Content('text/html', htmlcontent);
                var mail = new helper.Mail(from_email, subject, to_email, content);
                var request = sg.emptyRequest({
                    method: 'POST',
                    path: '/v3/mail/send',
                    body: mail.toJSON(),
                });
                sg.API(request, function(error, response) {
                    
                        if(response.statusCode != null || response.statusCode != '')
                        {
                            res.json({success:true,statusMessage:"Order Successfully cancelled",statusCode : "200",orderId:req.params.id});
                        }
                });        
            }
        })
        }
    });

    // Orders.findOneAndUpdate({"_id": req.params.id},
    //     {status :"0",cancelleddatetime:moment().utcOffset("+05:30").add(0, 'days').format()},
    //     { upsert: true },
    //     function(err,orderData){
    //     if (err) return res.status(500).send("There was a problem cancelling the order.");            
    //     res.json({success:true,statusMessage:"Order Successfully updated",statusCode : "200"});
    // });   
}