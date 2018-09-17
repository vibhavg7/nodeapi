var db = require('../models/db');
var Cart = require('../models/cart');

exports.getCartDetailsById = function(req, res, next) {

    if(req.body.token != null && req.body.token !='')
    {
        Cart.findOne({"tokenId":req.params.token},function(err,product){
            if (err) return res.status(500).send("There was a problem finding the order data.");            
                //Logic to apply pricing and all at api level of basis of tokenid
                res.json(product);
        });
    }
    else
    {
        Cart.findOne({"sessionId":req.params.sessionId},function(err,product){
            if (err) return res.status(500).send("There was a problem finding the order data.");            
                //Logic to apply pricing and all at api level on basis of sessionId
                res.json(product);
        });
    }
 
};

exports.addtocart = function(req,res,next){            
    var cartData = new Cart();
    
    cartData.sessionId  = req.body.sessionid;
    if(req.body.token != null && req.body.token !='')
        cartData.tokenId = jwt.decode(req.body.token,"123");
    else
        cartData.tokenId = '';    
    
    cartData.product = req.body.productsIncart;
   
    cartData.save()
    .then(order => {        
        res.json({ statusCode: "200",orderId:order._id, status:"Items in cart sucessfully saved"});           
    })
    .catch(err => {    
        if (err) return res.status(500).send("There was a problem in saving the cart details.");
    });
}